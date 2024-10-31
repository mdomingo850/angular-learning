import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';
import { Course } from '../model/course';
import { CoursesStore } from '../services/courses.store';

@Component({
  selector: 'import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrl: './import-dialog.component.css'
})
export class ImportDialogComponent implements AfterViewInit {
  form: FormGroup;

  courses: Course[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ImportDialogComponent>,
    private coursesStore: CoursesStore,
    private messagesService: MessagesService
  ) {
  }

  ngAfterViewInit() {}

  ngOnInit() {
    this.form = this.fb.group({
        tableRows: this.fb.array([this.createTableRow()])
    });
    this.addTableRow();
  }

  createTableRow(): FormGroup {
      return this.fb.group({
          description: [''],
          category: ['']
      });
  }

  addTableRow() {
      const control = <FormArray>this.form.controls['tableRows'];
      control.push(this.createTableRow());
  }

  removeTableRow(index: number) {
      const control = <FormArray>this.form.controls['tableRows'];
      control.removeAt(index);
  }

  save() {
    const changes = this.form.value;

    // this.coursesStore
    //   .saveCourse(this.course.id, changes)
    //   .subscribe();

    this.dialogRef.close(changes);
  }

  close() {
    this.dialogRef.close();
  }
}
