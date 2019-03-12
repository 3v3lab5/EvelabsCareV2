import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-deletedripo-dialog',
  templateUrl: './deletedripo-dialog.component.html',
  styleUrls: ['./deletedripo-dialog.component.css']
})
export class DeletedripoDialogComponent implements OnInit {
	deleteDripoData={dripoId:''};
  	constructor(private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<DeletedripoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
  			this.deleteDripoData = data;

         }

  	ngOnInit() {
  	}

  	removeDripo(){
  		this.admin.deleteDripo(this.deleteDripoData)
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
