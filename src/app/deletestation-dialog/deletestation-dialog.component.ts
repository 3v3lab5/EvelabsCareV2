import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-deletestation-dialog',
  templateUrl: './deletestation-dialog.component.html',
  styleUrls: ['./deletestation-dialog.component.css']
})
export class DeletestationDialogComponent implements OnInit {
	deleteStationData={stationName:''};
  	constructor(private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<DeletestationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
  			this.deleteStationData = data;
         }

  	ngOnInit() {
  	}

  	removeStation(){
  		this.admin.deleteStation(this.deleteStationData)
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
