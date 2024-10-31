import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { CoursesService } from "./courses.service";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";

@Injectable({ providedIn: "root" })
export class CoursesStore {
  private subject = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[]> = this.subject.asObservable();

  course: Course | undefined;

  /**
   *
   */
  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messages: MessagesService
  ) {
  }

  public loadAllCourses(): void {
    const loadCourses$ = this.http.get<Course[]>("/api/courses").pipe(
      map((response: Course[]) => response["payload"]),
      catchError((err) => {
        const message = "Could not load courses";
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap((courses: Course[]) => {
        this.subject.next(courses)
      }
        )
    );

    this.loading.showLoaderUntilCompleted(loadCourses$).subscribe();
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    const courses = this.subject.getValue();

    const index = courses.findIndex((course) => course.id === courseId);
    const newCourse: Course = {
      ...courses[index],
      ...changes,
    };

    newCourse.description = "TEST";

    const newCourses: Course[] = courses.slice(0);
    newCourses[index] = newCourse;
    this.subject.next(newCourses);

    return this.http.put(`/api/courses/${courseId}`, changes)
        .pipe(
            catchError((err) => {
                const message = "Could not save course";
                this.messages.showErrors(message);
                console.log(message, err);
                return throwError(err);
            }),
            shareReplay()
        );
  }

  saveCourses(): void {

  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) =>
        courses
          .filter((course) => course.category === category)
          .sort(sortCoursesBySeqNo)
      )
    );
  }
}
