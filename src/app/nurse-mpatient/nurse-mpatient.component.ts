import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {FormControl,FormBuilder,FormGroup,Validators,FormGroupDirective} from '@angular/forms';
import {NurseService} from '../nurse.service';
import { EditpatientDialogComponent } from '../editpatient-dialog/editpatient-dialog.component';
import { DischargepatientDialogComponent } from '../dischargepatient-dialog/dischargepatient-dialog.component';


export interface patientGenders {
  value: string;
  viewValue: string;
}

export interface Statuses {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-nurse-mpatient',
  templateUrl: './nurse-mpatient.component.html',
  styleUrls: ['./nurse-mpatient.component.css']
})


export class NurseMpatientComponent implements OnInit {
	createPatientForm:FormGroup;
	patientData={};
	beds=[];
	doctors=[];
	patients=[];
  term;
	patientGenders: patientGenders[] = [
		{value: 'male', viewValue: 'Male'},
	    {value: 'female', viewValue: 'Female'}
	  ];

	Statuses: Statuses[] = [
	    {value: 'active', viewValue: 'Active'},
	    {value: 'discharged', viewValue: 'Discharged'}
	  ];
  	constructor(private fb: FormBuilder,public snackbar: MatSnackBar,private dialog: MatDialog,private nurse: NurseService) { 
  		this.createPatientForm = this.fb.group({
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
  		this.nurse.readPatient()
  			.subscribe(
  				res => {
  				    if(res.success){
  				        this.patients = res.data;
  				    }
  		        else{
  		             this.snackbar.open(res.message, 'close')
  		        }
  				},
  				err => {
  				    console.log(err);
  				}
  		)
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
  	  		this.patientData = this.createPatientForm.value;
  	  		this.nurse.createPatient(this.patientData)
  	  		.subscribe(
  	  			res => {
  	  		        if(res.success){
  	  		            this.snackbar.open(res.message, 'close')
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
  	  		            	this.nurse.readPatient()
  	  		            		.subscribe(
  	  		            			res => {
  	  		            			    if(res.success){
  	  		            			        this.patients = res.data;
  	  		            			    }
  	  		            	        else{
  	  		            	             this.snackbar.open(res.message, 'close')
  	  		            	        }
  	  		            			},
  	  		            			err => {
  	  		            			    console.log(err);
  	  		            			}
  	  		            	)
  	  		            formDirective.resetForm();
  	  		            this.createPatientForm.reset();
  	  		        	}
  	  		        },
  	  		    err => {
  	  		          console.log(err);
  	  		    }

  	  		)
  	  	   
  	  	}

  	openEditDialog(patient) {
  	        const dialogConfig = new MatDialogConfig();
  	        dialogConfig.autoFocus = true;
  	        dialogConfig.height= '400px';
  	        dialogConfig.width='700px';
  	        dialogConfig.data = {
  	                _id: patient._id,
  	                patientName:patient.patientName,
  	                bedId:patient._bed,
  	                bedName:patient.bedName,
  	                patientAge:patient.patientAge,
  	                patientWeight:patient.patientWeight,
  	                patientGender:patient.patientGender,
  	                doctor:patient.doctor
  	            };

  	        let dialogRef = this.dialog.open(EditpatientDialogComponent, dialogConfig);
  	        dialogRef.afterClosed().subscribe(result => {
  	          if(result == 'success'){
  	          	this.nurse.readPatient()
  	          		.subscribe(
  	          			res => {
  	          			    if(res.success){
  	          			        this.patients = res.data;
  	          			    }
  	          	        else{
  	          	             this.snackbar.open(res.message, 'close')
  	          	        }
  	          			},
  	          			err => {
  	          			    console.log(err);
  	          			}
  	          	)

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

  	          }
  	        });
  	}


  		openDischargeDialog(patient) {
  		    const dialogConfig = new MatDialogConfig();
  		    dialogConfig.autoFocus = true;
  		    dialogConfig.height= '200px';
  		    dialogConfig.width='400px';
  		    dialogConfig.data = {
  		       _id: patient._id,
  		       	patientName:patient.patientName,
  		       	bedId:patient._bed,
  		       	bedName:patient.bedName,
  		    };
  		    let dialogRef = this.dialog.open(DischargepatientDialogComponent, dialogConfig);
  		    dialogRef.afterClosed().subscribe(result => {
  		      if(result == 'success'){
  		      	this.nurse.readPatient()
  		      		.subscribe(
  		      			res => {
  		      			    if(res.success){
  		      			        this.patients = res.data;
  		      			    }
  		      	        else{
  		      	             this.snackbar.open(res.message, 'close')
  		      	        }
  		      			},
  		      			err => {
  		      			    console.log(err);
  		      			}
  		      	)
  		      }
  		    });
  		        
  		 }



}
