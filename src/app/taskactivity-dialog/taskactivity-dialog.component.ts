import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {NurseService} from '../nurse.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-taskactivity-dialog',
  templateUrl: './taskactivity-dialog.component.html',
  styleUrls: ['./taskactivity-dialog.component.css']
})
export class TaskactivityDialogComponent implements OnInit {
	deleteTaskData={};
  	constructor(private nurse: NurseService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<TaskactivityDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) { 
  		this.deleteTaskData = data;
  	}

  	ngOnInit() {
  	}

  	removeTask(){
  		this.nurse.deleteTask(this.deleteTaskData)
  			.subscribe(
  				res => {
  			        if(res.success){
  			            this.snackbar.open(res.message, 'close')
  			            this.dialogRef.close('success');
  			        	}
  			        },
  			    err => {
  			          console.log(err);
  			    }

  			)

  	}

}
