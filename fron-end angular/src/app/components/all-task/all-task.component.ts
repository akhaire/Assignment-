import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateTaskComponent } from '../../dialog/add-update-task/add-update-task.component';
import { ToDoService } from '../../service/to-do.service';
import { DeleteComponent } from '../../dialog/delete/delete.component';
import { Task } from '../../models/task.model';
import { catchError, of } from 'rxjs';
import { ToasterService } from '../../service/toaster.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.css'
})
export class AllTaskComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dialog = inject(MatDialog);

  displayedColumns: string[] = ['select', 'assignedTo', 'status', 'DueDate', 'priority', 'description', 'action'];
  dataSource = new MatTableDataSource<Task>
  selection = new SelectionModel<Task>;

  numberOfTask: number = 0

  constructor(private toDoService: ToDoService, private toaster :ToasterService) { }
  ngOnInit() {
    this.getRecords()
  }

  getRecords() {
    this.toDoService.getData().subscribe((data: any) => {
      
      
       
      this.dataSource = new MatTableDataSource(data.data);
      this.selection = new SelectionModel<Task>(true, [])
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
      this.numberOfTask = this.dataSource.filteredData.length
      console.log(data, 'all data', this.dataSource);
      if(data.data.length > 0){
        this.toaster.success(data.message)
      }
    },
    (error) => {
      console.error('Error fetching data:', error);
      this.toaster.error(error.error.message)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Task): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id! + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog(element?: any): void {
    console.log(element)
    const dialogRef = this.dialog.open(AddUpdateTaskComponent, {
      data: element ? element : null,
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (!result) {
        this.getRecords()
      }

    });
  }


  deleteTask(task: any) {
    console.log('Delete task', task)
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: "70%",
      height: "30%",
      minHeight: "200px",
      data: { name: task.assignedTo, id: task.id },
      autoFocus: false,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result.confirmed) {
        this.toDoService.deleteData(task.id).subscribe({
          next: (data) => {
            console.log('Delete successful:', data);
            this.toaster.success('Record delete')
            this.getRecords()

          },
          error: (error) => {
            console.error('Delete failed:', error);
            this.toaster.error(error.error.message)
          }
        });

      }
    })
  }
}
