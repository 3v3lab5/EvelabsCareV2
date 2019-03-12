  import { Component, OnInit } from '@angular/core';
  import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
  import {AuthService} from '../auth.service';
  import {passValidator} from '../validator';
  import { MatSnackBar } from '@angular/material';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm:FormGroup;
    userData = {};
  	constructor(private fb: FormBuilder,private auth: AuthService,public snackbar: MatSnackBar) {
        this.registerForm = this.fb.group({
        userName:['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        hospitalName:['',Validators.required],
        password:['',Validators.compose([Validators.required,Validators.minLength(5)])],
        confirmPassword:['',passValidator]
        })
    //Observable to update validator if password field changed again
    this.registerForm.controls.password.valueChanges
        .subscribe(x => this.registerForm.controls.confirmPassword.updateValueAndValidity())
    }

    ngOnInit() {
    }

    onSubmit() {
      this.userData = this.registerForm.value;
      this.auth.registerUser(this.userData)
      	.subscribe(
      		res => {
                  if(res.success){
                    this.snackbar.open(res.message, 'close')
                  }
              },
            err => {
                console.log(err);
            }

      	)
    }


    validationMessages = {
  	    'userName': [
      	    { type: 'required', message: 'Username is required' },
      	    { type: 'validUsername', message: 'Your username has already been taken' },
      	    { type: 'pattern', message: 'Enter a valid email' }
    	],
    	'hospitalName': [
      	    { type: 'required', message: 'Hospital name is required' },
    	],
    	'password': [
      	    { type: 'required', message: 'Password is required' },
      	    { type: 'minlength', message: 'Password must be at least 5 characters long' },
    	]
    }
}
