import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {FormControl,FormBuilder,FormGroup,Validators,FormGroupDirective} from '@angular/forms';
import {NurseService} from '../nurse.service';
import { MatSnackBar } from '@angular/material';

export interface Times {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-addtask-dialog',
  templateUrl: './addtask-dialog.component.html',
  styleUrls: ['./addtask-dialog.component.css']
})
export class AddtaskDialogComponent implements OnInit {
	addTaskForm:FormGroup;
	beds=[];
	taskData=[];
	Times: Times[] = [
		{value: '0', viewValue: '12 AM'},{value:'1', viewValue: '1 AM'},{value:'2', viewValue: '2 AM'},{value:'3', viewValue: '3 AM'},{value:'4', viewValue: '4 AM'},
		{value:'5', viewValue: '5 AM'},{value:'6', viewValue: '6 AM'},{value:'7', viewValue: '7 AM'},{value:'8', viewValue: '8 AM'},
		{value:'9', viewValue: '9 AM'},{value:'10', viewValue: '10 AM'},{value:'11', viewValue: '11 AM'},{value:'12', viewValue: '12 PM'},{value:'13', viewValue: '1 PM'},
		{value:'14', viewValue: '2 PM'},{value:'15', viewValue: '3 PM'},{value:'16', viewValue: '4 PM'},{value:'17', viewValue: '5 PM'},{value:'18', viewValue: '6 PM'}
		,{value:'19', viewValue: '7 PM'},{value:'20', viewValue: '8 PM'},{value:'21', viewValue: '9 PM'},{value:'22', viewValue: '10 PM'},{value:'23', viewValue: '11 PM'}


	  ];
  	constructor(private fb: FormBuilder,private nurse: NurseService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<AddtaskDialogComponent>) {
  			this.addTaskForm = this.fb.group({
  				time:['',Validators.required],
  				bedId:['',Validators.required],
  				medicineName:['',Validators.required],
  				medicineVolume:['',Validators.required],
  				medicineRate:['',Validators.required],
  				timeForInfusion:['']
  			}) 
  			const toi = this.addTaskForm.get('timeForInfusion');
  			const mr = this.addTaskForm.get('medicineRate');
  			const mv = this.addTaskForm.get('medicineVolume');
  			toi.valueChanges.subscribe(val => {
  				const valMv = this.addTaskForm.value.medicineVolume;
  			    	mr.setValue(Math.floor(valMv/val));
  			 });

        }
    validationMessages = {
    	'time':[
    		{type:'required',message:'time  is required'}
    	],
    	'bedId':[
    		{type:'required',message:'Bed name is required'}
    	],
    	'medicineName':[
    		{type:'required',message:'Medicine name is required'}
    	],
    	'medicineVolume':[
    		{type:'required',message:'Medicine Volume is required'}
    	],
    	'medicineRate':[
    		{type:'required',message:'Medicine rate is required'}
    	],
    }    
  	ngOnInit() {
  			this.nurse.readOccupiedBed()
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


  	onSubmit(formData: any, formDirective: FormGroupDirective): void {
  		this.taskData = this.addTaskForm.value;
  		this.nurse.createTask(this.taskData)
  		.subscribe(
  			res => {
  		        if(res.success){
  		            this.snackbar.open(res.message, 'close')
                  this.dialogRef.close('success');
  		            formDirective.resetForm();
  		            this.addTaskForm.reset();
  		        	}
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
  	   
  	}


}
