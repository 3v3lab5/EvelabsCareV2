import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import { Router } from '@angular/router';
import {FormControl,FormBuilder,FormGroup,Validators,FormGroupDirective} from '@angular/forms';
import {passValidator} from '../validator';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { EdituserDialogComponent } from '../edituser-dialog/edituser-dialog.component';
import { DeleteuserDialogComponent } from '../deleteuser-dialog/deleteuser-dialog.component';



export interface AccountTypes {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-admin-muser',
  templateUrl: './admin-muser.component.html',
  styleUrls: ['./admin-muser.component.css']
})
export class AdminMuserComponent implements OnInit {
	accountTypes: AccountTypes[] = [
		{value: 'nurse', viewValue: 'Nurse account'},
	    {value: 'doctor', viewValue: 'Doctor account'}
	  ];
	createUserForm:FormGroup;
	userData = {};
	users=[];
  term;
  	constructor(private fb: FormBuilder,private admin: AdminService,private router:Router,public snackbar: MatSnackBar,private dialog: MatDialog) {
  		this.createUserForm = this.fb.group({
  		userName:['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
  		password:['',Validators.compose([Validators.required,Validators.minLength(5)])],
  		confirmPassword:['',passValidator],
  		accountType:['',Validators.required]
  		}) 

  		//Observable to update validator if password field changed again
  		this.createUserForm.controls.password.valueChanges
  		    .subscribe(x => this.createUserForm.controls.confirmPassword.updateValueAndValidity())

  	}

  	ngOnInit() {
  		this.admin.readUser()
  		.subscribe(
  			res => {
  		        if(res.success){
  		        	this.users = res.data;
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
  		this.userData = this.createUserForm.value;
  		this.admin.createUser(this.userData)
  		.subscribe(
  			res => {
  		        if(res.success){
  		            this.snackbar.open(res.message, 'close')
  		            this.admin.readUser()
  		            .subscribe(
  		            	res => {
  		                    if(res.success){
  		                    	this.users = res.data;
  		                    	}
  		                    },
  		                err => {
  		                      console.log(err);
  		                }

  		            )

  		            formDirective.resetForm();
  		            this.createUserForm.reset();
  		        	}
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
  	   
  	}

  	openEditDialog(userid) {
  	        const dialogConfig = new MatDialogConfig();
  	        dialogConfig.autoFocus = true;
  	        dialogConfig.height= '300px';
  	        dialogConfig.width='500px';
  	        dialogConfig.data = {
  	                id: userid,
  	                title: 'Change password'
  	            };
  	        let dialogRef = this.dialog.open(EdituserDialogComponent, dialogConfig);
  	 }

  	 openDeleteDialog(user) {
  	         const dialogConfig = new MatDialogConfig();
  	         dialogConfig.autoFocus = true;
  	         dialogConfig.height= '200px';
  	         dialogConfig.width='400px';
  	         dialogConfig.data = {
  	                 id: user._id,
  	                 userName:user.userName,
  	                 title: 'Remove User'
  	             };
  	         let dialogRef = this.dialog.open(DeleteuserDialogComponent, dialogConfig);
  	         dialogRef.afterClosed().subscribe(result => {
  	           if(result == 'success'){
  	           	this.admin.readUser()
  	           	.subscribe(
  	           		res => {
  	           	        if(res.success){
  	           	        	console.log(res);
  	           	        	this.users = res.data;
  	           	        	}
                         else{
                           this.users = [];
                         }
  	           	        },
  	           	    err => {
  	           	          console.log(err);
  	           	    }

  	           	)
  	           }
  	         });

  	  }


    validationMessages = {
  	    'userName': [
      	    { type: 'required', message: 'Username is required' },
      	    { type: 'validUsername', message: 'Your username has already been taken' },
      	    { type: 'pattern', message: 'Enter a valid email' }
    	],
    	'password': [
      	    { type: 'required', message: 'Password is required' },
      	    { type: 'minlength', message: 'Password must be at least 5 characters long' },
    	],
    	'accountType':[
    		{type:'required',message:'Account type is required'}
    	]
    }

}
