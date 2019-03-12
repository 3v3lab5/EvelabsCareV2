import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material';

export interface patientGenders {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-editdripo-dialog',
  templateUrl: './editdripo-dialog.component.html',
  styleUrls: ['./editdripo-dialog.component.css']
})
export class EditdripoDialogComponent implements OnInit {
	editDripoForm:FormGroup;
	editDripoId={'_id':''};
	editDripoData={'_id':''};
  stations=[];
  	constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<EditdripoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) { 
  		this.editDripoId = data;
  		this.editDripoForm = this.fb.group({
  			stationId:[data.stationId,Validators.required],
  			dripoId:[data.dripoId,Validators.required]
  		}) 
  	}

  	validationMessages = {
  		'stationId':[
  			{type:'required',message:'Station name is required'}
  		],
  		'dripoId':[
  			{type:'required',message:'dripo id is required'}
  		]
  	}

  	ngOnInit() {
  		this.admin.readStation()
  		.subscribe(
  			res => {
  		        if(res.success){
  		        	this.stations = res.data;
  		        	}
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
  	}

  	onSubmit(){
  		this.editDripoData = this.editDripoForm.value;
  		this.editDripoData._id = this.editDripoId._id;
  		this.admin.updateDripo(this.editDripoData)
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
