import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-editivset-dialog',
  templateUrl: './editivset-dialog.component.html',
  styleUrls: ['./editivset-dialog.component.css']
})
export class EditivsetDialogComponent implements OnInit {
	editIvsetForm:FormGroup;
	editIvsetId={'_id':''};
	editIvsetData={'_id':''};
  	constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<EditivsetDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) { 
  		this.editIvsetId = data;
  		this.editIvsetForm = this.fb.group({
  			ivsetModel:[data.ivsetModel,Validators.required],
  			ivsetDpf:[data.ivsetDpf,Validators.required]
  		}) 
  	}

  	ngOnInit() {
  	}

  	validationMessages = {
  		'ivsetModel':[
  			{type:'required',message:'ivset model name is required'}
  		],
  		'ivsetDpf':[
  			{type:'required',message:'ivset dpf  is required'}
  		],
  	}
  	  	onSubmit(){
  	  		this.editIvsetData = this.editIvsetForm.value;
  	  		this.editIvsetData._id = this.editIvsetId._id;
  	  		this.admin.updateIvset(this.editIvsetData)
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
