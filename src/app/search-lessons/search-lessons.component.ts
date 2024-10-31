import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import { CoursesStore } from '../services/courses.store';


@Component({
  selector: 'course',
  templateUrl: './search-lessons.component.html',
  styleUrls: ['./search-lessons.component.css']
})
export class SearchLessonsComponent implements OnInit {

  courses$: Observable<Course[]>;

  constructor(private coursesStore: CoursesStore) {}

  ngAfterViewInit() {}

  ngOnInit() {
    this.courses$ = this.coursesStore.courses$;
  }

  import()
  {
    this.coursesStore.loadAllCourses();
  }

  receiveSubmission(courses: Course[])
  {
    let foo = 1;
  }

}











