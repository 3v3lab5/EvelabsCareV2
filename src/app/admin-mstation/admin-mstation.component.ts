import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder,FormGroup,Validators,FormGroupDirective} from '@angular/forms';
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { EditstationDialogComponent } from '../editstation-dialog/editstation-dialog.component';
import { DeletestationDialogComponent } from '../deletestation-dialog/deletestation-dialog.component';




@Component({
  selector: 'app-admin-mstation',
  templateUrl: './admin-mstation.component.html',
  styleUrls: ['./admin-mstation.component.css']
})
export class AdminMstationComponent implements OnInit {
	createStationForm:FormGroup;
	stationData={};
	stations=[];
  term;
	constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,private dialog: MatDialog) { 
		this.createStationForm = this.fb.group({
			stationName:['',Validators.required]
		}) 


  	}

  	ngOnInit() {
  		this.admin.readStation()
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
  		this.stationData = this.createStationForm.value;
  		console.log(this.stationData);
  		this.admin.createStation(this.stationData)
  		.subscribe(
  			res => {
  		        if(res.success){
  		            this.snackbar.open(res.message, 'close')
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
  		            formDirective.resetForm();
  		            this.createStationForm.reset();
  		        	}
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
  	   
  	}

  	openEditDialog(station) {
  	        const dialogConfig = new MatDialogConfig();
  	        dialogConfig.autoFocus = true;
  	        dialogConfig.height= '200px';
  	        dialogConfig.width='500px';
  	        dialogConfig.data = {
  	                _id: station._id,
  	                stationName:station.stationName
  	            };

  	        let dialogRef = this.dialog.open(EditstationDialogComponent, dialogConfig);
  	        dialogRef.afterClosed().subscribe(result => {
  	          if(result == 'success'){
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
  	    let dialogRef = this.dialog.open(DeletestationDialogComponent, dialogConfig);
  	    dialogRef.afterClosed().subscribe(result => {
  	      if(result == 'success'){
  	      	this.admin.readStation()
  	      	.subscribe(
  	      		res => {
  	      	        if(res.success){
  	      	        	this.stations = res.data;
  	      	        	}
                    else{
                      this.stations = [];
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
    	'stationName':[
    		{type:'required',message:'Station name is required'}
    	],
    }

}
