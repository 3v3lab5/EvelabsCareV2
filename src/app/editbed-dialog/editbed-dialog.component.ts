import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-editbed-dialog',
  templateUrl: './editbed-dialog.component.html',
  styleUrls: ['./editbed-dialog.component.css']
})
export class EditbedDialogComponent implements OnInit {
	editBedForm:FormGroup;
	editBedId={'_id':''};
	editBedData={'_id':''};

  	constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<EditbedDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) { 
  		this.editBedId = data;
  		this.editBedForm = this.fb.group({
  			bedName:[data.bedName,Validators.required]
  		}) 
  	}

  	ngOnInit() {
  	}
  	validationMessages = {
  		'bedName':[
  			{type:'required',message:'Bed name is required'}
  		],
  	}
  	onSubmit(){
  		this.editBedData = this.editBedForm.value;
  		this.editBedData._id = this.editBedId._id;
  		this.admin.updateBed(this.editBedData)
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
