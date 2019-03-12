import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import {NurseService} from '../nurse.service';
import { MatSnackBar } from '@angular/material';
export interface patientGenders {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-editpatient-dialog',
  templateUrl: './editpatient-dialog.component.html',
  styleUrls: ['./editpatient-dialog.component.css']
})
export class EditpatientDialogComponent implements OnInit {
	editPatientForm:FormGroup;
	editPatientId={'_id':''};
	editPatientData={'_id':''};
	beds=[];
	doctors=[];
	patientGenders: patientGenders[] = [
		{value: 'male', viewValue: 'Male'},
	    {value: 'female', viewValue: 'Female'}
	  ];
	constructor(private fb: FormBuilder,private nurse: NurseService,public snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<EditpatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
		this.editPatientId = data;
		this.editPatientForm = this.fb.group({
			patientName:[data.patientName,Validators.required],
			bedId:[data.bedId,Validators.required],
			patientAge:[data.patientAge],
			patientWeight:[data.patientWeight],
			patientGender:[data.patientGender,Validators.required],
			doctor:[data.doctor]
		}) 
    }
    validationMessages = {
    	'patientName':[
    		{type:'required',message:'Patient name is required'}
    	],
    	'bedId':[
    		{type:'required',message:'Bed name is required'},
    	],
    	'patientGender':[
    		{type:'required',message:'Patient gender is required'}
    	]

    }

  	ngOnInit() {

  			this.nurse.readBed()
  			.subscribe(
  				res => {
  				       if(res.success){
  				        this.beds = res.data;
  				        }
  		           else{
  		             this.snackbar.open(res.message, 'close')
  		           }
  				       },
  				   err => {
  				         console.log(err);
  				   }

  			)

  			this.nurse.readDoctor()
  			.subscribe(
  				res => {
  						if(res.success){
  						      this.doctors = res.data;
  						}
  				        
  						},
  						 err => {
  						       console.log(err);
  						 }

  			)

  	}

  	onSubmit(){
  		this.editPatientData = this.editPatientForm.value;
  		this.editPatientData._id = this.editPatientId._id;
  		this.nurse.updatePatient(this.editPatientData)
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
