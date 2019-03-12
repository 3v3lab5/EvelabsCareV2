import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-deleteuser-dialog',
  templateUrl: './deleteuser-dialog.component.html',
  styleUrls: ['./deleteuser-dialog.component.css']
})
export class DeleteuserDialogComponent implements OnInit {

  deleteUserData={userName:''};
  constructor(private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<DeleteuserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) { 
  	this.deleteUserData = data;
  }

  ngOnInit() {
  }

  removeUser(){
  	this.admin.deleteUser(this.deleteUserData)
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
