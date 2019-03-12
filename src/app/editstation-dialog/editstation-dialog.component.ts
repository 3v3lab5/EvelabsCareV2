import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-editstation-dialog',
  templateUrl: './editstation-dialog.component.html',
  styleUrls: ['./editstation-dialog.component.css']
})
export class EditstationDialogComponent implements OnInit {
	editStationForm:FormGroup;
	editStationId={'_id':''};
	editStationData={'_id':''};
  	constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<EditstationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) { 
  		this.editStationId = data;
  		this.editStationForm = this.fb.group({
  			stationName:[data.stationName,Validators.required]
  		}) 

  	}

  	ngOnInit() {
  	}

  	validationMessages = {
  		'stationName':[
  			{type:'required',message:'Station name is required'}
  		],
  	}
  	onSubmit(){
  		this.editStationData = this.editStationForm.value;
  		this.editStationData._id = this.editStationId._id;
  		this.admin.updateStation(this.editStationData)
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
