import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder,FormGroup,Validators,FormGroupDirective} from '@angular/forms';
import {AdminService} from '../admin.service';
import {NurseService} from '../nurse.service';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { Router } from '@angular/router';


@Component({
  selector: 'app-select-station',
  templateUrl: './select-station.component.html',
  styleUrls: ['./select-station.component.css']
})
export class SelectStationComponent implements OnInit {
	selectStationForm:FormGroup;
	stations=[];
	stationData={};
  	constructor(private router:Router,private fb: FormBuilder,private nurse: NurseService,private admin: AdminService,public snackbar: MatSnackBar,private dialog: MatDialog) { 
  		this.selectStationForm = this.fb.group({
  			stationId:['',Validators.required]
  		}) 
  	}

  	validationMessages = {
  		'stationId':[
  			{type:'required',message:'Station name is required'}
  		]
  	}
  	ngOnInit() {
  		this.nurse.readStation()
  		.subscribe(
  			res => {
  		        if(res.success){
  		        	this.stations = res.data;
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
  		this.stationData = this.selectStationForm.value;
  		this.nurse.setStation(this.stationData)
  		.subscribe(
  			res => {
  		        if(res.success){
  		            localStorage.setItem('token',res.token)
  		            this.router.navigate(['/nurse/home'])
  		            formDirective.resetForm();
  		            this.selectStationForm.reset();
  		        	}
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
  		
  	   
  	}

}
