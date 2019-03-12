import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,private auth: AuthService,private router:Router,public snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  requestData = {};
  requestForm = this.fb.group({
  	userName:['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]
  })


  onSubmit() {
    this.requestData = this.requestForm.value;
    this.auth.forgotPassword(this.requestData)
    .subscribe(
    	res => {
            if(res.success){
            	this.snackbar.open(res.message, 'close')
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

}
