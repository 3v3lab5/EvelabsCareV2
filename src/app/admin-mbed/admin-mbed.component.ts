import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder,FormGroup,Validators,FormGroupDirective} from '@angular/forms';
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { EditbedDialogComponent } from '../editbed-dialog/editbed-dialog.component';
import { DeletebedDialogComponent } from '../deletebed-dialog/deletebed-dialog.component';



@Component({
  selector: 'app-admin-mbed',
  templateUrl: './admin-mbed.component.html',
  styleUrls: ['./admin-mbed.component.css']
})
export class AdminMbedComponent implements OnInit {
	createBedForm:FormGroup;
	bedData={};
	stations=[];
	beds=[];
  term;
  	constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,private dialog: MatDialog) {
  		this.createBedForm = this.fb.group({
  			stationId:['',Validators.required],
  			bedName:['',Validators.compose([Validators.required,Validators.pattern('^[A-Za-z0-9]+((,|-)[A-Za-z0-9]+)*[A-Za-z0-9]+$')])]

  		}) 
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
  		this.admin.readBed()
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
  		this.bedData = this.createBedForm.value;
  		this.admin.createBed(this.bedData)
  		.subscribe(
  			res => {
  		        if(res.success){
  		            this.snackbar.open(res.message, 'close')
  		            this.admin.readBed()
  		            .subscribe(
  		            	res => {
  		                    if(res.success){
  		                    	this.beds = res.data;
  		                    	}
  		                    },
  		                err => {
  		                      console.log(err);
  		                }

  		            )
  		            formDirective.resetForm();
  		            this.createBedForm.reset();
  		        	}
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
  	   
  	}

  	openEditDialog(bed) {
  	        const dialogConfig = new MatDialogConfig();
  	        dialogConfig.autoFocus = true;
  	        dialogConfig.height= '200px';
  	        dialogConfig.width='500px';
  	        dialogConfig.data = {
  	                _id: bed._id,
  	                bedName:bed.bedName
  	            };

  	        let dialogRef = this.dialog.open(EditbedDialogComponent, dialogConfig);
  	        dialogRef.afterClosed().subscribe(result => {
  	          if(result == 'success'){
  	          	this.admin.readBed()
  	          	.subscribe(
  	          		res => {
  	          	        if(res.success){
  	          	        	this.beds = res.data;
  	          	        	}
  	          	        },
  	          	    err => {
  	          	          console.log(err);
  	          	    }

  	          	)
  	          }
  	        });
  	}

  	openDeleteDialog(station) {
  	    const dialogConfig = new MatDialogConfig();
  	    dialogConfig.autoFocus = true;
  	    dialogConfig.height= '200px';
  	    dialogConfig.width='400px';
  	    dialogConfig.data = {
  	        _id: station._id,
  	        stationName:station.stationName,
  	        title: 'Remove User'
  	    };
  	    let dialogRef = this.dialog.open(DeletebedDialogComponent, dialogConfig);
  	    dialogRef.afterClosed().subscribe(result => {
  	      if(result == 'success'){
  	      	this.admin.readBed()
  	      	.subscribe(
  	      		res => {
  	      	        if(res.success){
  	      	        	this.beds = res.data;
  	      	        	}
                    else{
                      this.beds = [];
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
  		'stationId':[
  			{type:'required',message:'Station name is required'}
  		],
  		'bedName':[
  			{type:'required',message:'Bed name is required'},
  			{type:'pattern',message:'Eg: B101,B102,B103'}
  		]
  	}

}
