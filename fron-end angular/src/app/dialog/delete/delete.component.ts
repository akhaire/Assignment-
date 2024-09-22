import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  name!:string

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(){
    console.log(this.data,'Delete dialog')
    this.name = this.data.name
  }

  onConfirm() {
    this.dialogRef.close({ confirmed: true, name: this.name });
  }
  
  onCancel() {
    this.dialogRef.close({ confirmed: false });
  }

}
