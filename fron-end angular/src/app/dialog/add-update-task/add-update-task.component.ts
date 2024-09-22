import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDoService } from '../../service/to-do.service';
import { ToasterService } from '../../service/toaster.service';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrl: './add-update-task.component.css'
})
export class AddUpdateTaskComponent {
  users = ['User 1', 'User 2', 'User 3'];
  statuses = ['Active', 'Inactive', 'Pending'];
  priorities = ['Low', 'Normal', 'High'];

  taskForm!: FormGroup;
  isSubmitted: boolean = false
  isEdit: boolean = false

  constructor(
    public dialogRef: MatDialogRef<AddUpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toDoService: ToDoService,
    private toaster :ToasterService
  ) { 

    this.taskForm = this.fb.group({
      assignedTo: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: [''],
      priority: ['Normal', Validators.required],
      description: ['', Validators.maxLength(50)]
    });
  }


  ngOnInit() {
    if (this.data) {
      this.isEdit = true

      this.taskForm.patchValue({
        assignedTo:this.data.assignedTo,
        status: this.data.status,
        dueDate: this.data.dueDate,
        priority: this.data.priority,
        description: this.data.description
      }) 
    }
  }

  onSubmit(): void {
    console.log(this.taskForm)
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      
      const data = {
        assignedTo: this.taskForm.value.assignedTo,
        status: this.taskForm.value.status,
        dueDate: this.taskForm.value.dueDate,
        priority: this.taskForm.value.priority,
        description: this.taskForm.value.description
      }

      if(this.data){
        console.log('ture')
        this.toDoService.updateData(this.data.id,data).subscribe({
          next: (response) => {
            console.log('Data added successfully:', response);
            this.toaster.success('Record update')
            this.onNoClick()
          },
          error: (error) => {
            console.error('Error adding data:', error.error.message);
            this.toaster.error(error.error.message)
          }
        });
      }else{
        console.log('false')
        this.toDoService.addData(data).subscribe({
          next: (response) => {
            console.log('Data added successfully:', response);
            this.toaster.success('Record Add')
            this.onNoClick()
          },
          error: (error) => {
            console.error('Error adding data:', error);
            this.toaster.error(error.error.message)
          }
        });
      }
    } else {
      console.log('Form is invalid');
      this.isSubmitted = true
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
