import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-deletebed-dialog',
  templateUrl: './deletebed-dialog.component.html',
  styleUrls: ['./deletebed-dialog.component.css']
})
export class DeletebedDialogComponent implements OnInit {
	deleteBedData={bedName:''};
  constructor(private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<DeletebedDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
  			this.deleteBedData = data;
         }

  	ngOnInit() {
  	}

  	removeBed(){
  		this.admin.deleteBed(this.deleteBedData)
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
