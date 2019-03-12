import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder,FormGroup,Validators,FormGroupDirective} from '@angular/forms';
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { EditivsetDialogComponent } from '../editivset-dialog/editivset-dialog.component';
import { DeleteivsetDialogComponent } from '../deleteivset-dialog/deleteivset-dialog.component';

@Component({
  selector: 'app-admin-mivset',
  templateUrl: './admin-mivset.component.html',
  styleUrls: ['./admin-mivset.component.css']
})
export class AdminMivsetComponent implements OnInit {
	createIvsetForm:FormGroup;
	ivsetData={};
	ivsets=[];
  term;
  	constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,private dialog: MatDialog) {
  		this.createIvsetForm = this.fb.group({
  			ivsetModel:['',Validators.required],
  			ivsetDpf:['',Validators.required]

  		}) 
  	}
  	validationMessages = {
  		'ivsetModel':[
  			{type:'required',message:'Ivset model is required'}
  		],
  		'ivsetDpf':[
  			{type:'required',message:'Ivset drop factor is required'}
  		]
  	}

  	ngOnInit() {
  		this.admin.readIvset()
  		.subscribe(
  			res => {
  		        if(res.success){
  		        	this.ivsets = res.data;
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
  		this.ivsetData = this.createIvsetForm.value;
  		console.log(this.ivsetData);
  		this.admin.createIvset(this.ivsetData)
  		.subscribe(
  			res => {
  		        if(res.success){
  		            this.snackbar.open(res.message, 'close')
  		            this.admin.readIvset()
  		            .subscribe(
  		            	res => {
  		                    if(res.success){
  		                    	this.ivsets = res.data;
  		                    	}
  		                    },
  		                err => {
  		                      console.log(err);
  		                }

  		            )
  		            formDirective.resetForm();
  		            this.createIvsetForm.reset();
  		        	}
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
  	   
  	}

  	openEditDialog(ivset) {
  	        const dialogConfig = new MatDialogConfig();
  	        dialogConfig.autoFocus = true;
  	        dialogConfig.height= '300px';
  	        dialogConfig.width='500px';
  	        dialogConfig.data = {
  	                _id: ivset._id,
  	                ivsetModel:ivset.ivsetModel,
  	                ivsetDpf:ivset.ivsetDpf
  	            };

  	        let dialogRef = this.dialog.open(EditivsetDialogComponent, dialogConfig);
  	        dialogRef.afterClosed().subscribe(result => {
  	          if(result == 'success'){
  	          	this.admin.readIvset()
  	          	.subscribe(
  	          		res => {
  	          	        if(res.success){
  	          	        	this.ivsets = res.data;
  	          	        	}
  	          	        },
  	          	    err => {
  	          	          console.log(err);
  	          	    }

  	          	)
  	          }
  	        });
  	}

  	openDeleteDialog(ivset) {
  	    const dialogConfig = new MatDialogConfig();
  	    dialogConfig.autoFocus = true;
  	    dialogConfig.height= '200px';
  	    dialogConfig.width='400px';
  	    dialogConfig.data = {
  	        _id: ivset._id,
  	        ivsetModel:ivset.ivsetModel,
  	        ivsetDpf:ivset.ivsetDpf
  	    };
  	    let dialogRef = this.dialog.open(DeleteivsetDialogComponent, dialogConfig);
  	    dialogRef.afterClosed().subscribe(result => {
  	      if(result == 'success'){
  	      	this.admin.readIvset()
  	      	.subscribe(
  	      		res => {
  	      	        if(res.success){
  	      	        	this.ivsets = res.data;
  	      	        	}
                    else{
                      this.ivsets = [];
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
