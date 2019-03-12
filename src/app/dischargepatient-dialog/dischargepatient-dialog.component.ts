import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import {NurseService} from '../nurse.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-dischargepatient-dialog',
  templateUrl: './dischargepatient-dialog.component.html',
  styleUrls: ['./dischargepatient-dialog.component.css']
})
export class DischargepatientDialogComponent implements OnInit {
	dischargePatientData={bedName:'',patientName:''};
  	constructor(private nurse: NurseService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<DischargepatientDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) { 
  		this.dischargePatientData = data;
  	}

  	ngOnInit() {
  	}
  	removePatient(){
  		this.nurse.dischargePatient(this.dischargePatientData)
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
