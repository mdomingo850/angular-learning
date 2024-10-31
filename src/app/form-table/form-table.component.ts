import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Course } from '../model/course';

@Component({
  selector: 'form-table',
  templateUrl: './form-table.component.html',
  styleUrl: './form-table.component.css'
})
export class FormTableComponent implements OnInit, OnChanges {
  form: FormGroup;
  formArray: FormArray;

  @Input()
  courses: Course[] = [];

  @Output() submitEvent = new EventEmitter<Course[]>();

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
        tableRows: this.fb.array([])
    });

    this.formArray = this.form.get('tableRows') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courses'] && !changes['courses'].isFirstChange()) {
      // Call your method when the input value changes
      this.courses.forEach(course => {
        this.addTableRow(course);
      });
    }
  }

  createTableRow(course?: Course): FormGroup {
      return this.fb.group({
          description: new FormControl(course ? course.description : '', {validators: [Validators.required], updateOn: 'blur'}),
          category: new FormControl(course ? course.category: '', {validators: [Validators.required], updateOn: 'blur'}),
          price: course ? course.lessonsCount : 0
      });
  }

  addTableRow(course?: Course) {
      const control = <FormArray>this.form.controls['tableRows'];
      control.push(this.createTableRow(course));
  }

  removeTableRow(index: number) {
      const control = <FormArray>this.form.controls['tableRows'];
      control.removeAt(index);
  }

  getDescription(index: number): FormControl
  {
    return this.formArray.controls[index].get('description') as FormControl;
  }
  
  getCategory(index: number): FormControl
  {
    return this.formArray.controls[index].get('category') as FormControl;
  }

  getValidCount(): number {
    return this.formArray.controls.filter(c => c.valid).length;
  }

  getInvalidCount(): number {
    return this.formArray.controls.filter(c => !c.valid).length;
  }

  submit(tableForm: FormGroupDirective) {
    let validRows = this.formArray.controls.filter(c => c.valid).map<Course>(c => c.value);
    this.submitEvent.emit(validRows);
  }
}
