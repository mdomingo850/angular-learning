import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { CoursesStore } from "../services/courses.store";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { filter, tap } from "rxjs/operators";
import { ImportDialogComponent } from "../import-dialog/import-dialog.component";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private coursesStore: CoursesStore,
    private dialog: MatDialog) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    this.coursesStore.loadAllCourses();
    this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER");

    this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCED");
  }

  getCourse;

  importLegalEntity() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    const dialogRef = this.dialog.open(ImportDialogComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      filter(val => !!val)
    ).subscribe();
  }
}
