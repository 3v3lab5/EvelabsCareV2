import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {FormControl,FormBuilder,FormGroup,Validators,FormGroupDirective} from '@angular/forms';
import {NurseService} from '../nurse.service';
import { MatSnackBar } from '@angular/material';

export interface patientGenders {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-addpatient-dialog',
  templateUrl: './addpatient-dialog.component.html',
  styleUrls: ['./addpatient-dialog.component.css']
})
export class AddpatientDialogComponent implements OnInit {
	beds=[];
	doctors=[];
	addPatientForm:FormGroup;
  patientData={};
	patientGenders: patientGenders[] = [
		{value: 'male', viewValue: 'Male'},
	    {value: 'female', viewValue: 'Female'}
	  ];

  constructor(private fb: FormBuilder,private nurse: NurseService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<AddpatientDialogComponent>) { 
  	this.addPatientForm = this.fb.group({
  		patientName:['',Validators.required],
  		bedId:['',Validators.required],
  		patientAge:[''],
  		patientWeight:[''],
  		patientGender:['',Validators.required],
  		doctor:[''],
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

  	onSubmit(formData: any, formDirective: FormGroupDirective): void {
  		this.patientData = this.addPatientForm.value;
  		this.nurse.createPatient(this.patientData)
  		.subscribe(
  			res => {
  		        if(res.success){
  		            this.snackbar.open(res.message, 'close')
                  this.dialogRef.close('success');
  		            formDirective.resetForm();
  		            this.addPatientForm.reset();
  		        	}
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
  	   
  	}

}
