import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder,FormGroup,Validators,FormGroupDirective} from '@angular/forms';
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { EditdripoDialogComponent } from '../editdripo-dialog/editdripo-dialog.component';
import { DeletedripoDialogComponent } from '../deletedripo-dialog/deletedripo-dialog.component';



@Component({
  selector: 'app-admin-mdripo',
  templateUrl: './admin-mdripo.component.html',
  styleUrls: ['./admin-mdripo.component.css']
})
export class AdminMdripoComponent implements OnInit {
	createDripoForm:FormGroup;
	dripoData={};
	stations=[];
	dripos=[];
  term;
  	constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,private dialog: MatDialog) { 
  		this.createDripoForm = this.fb.group({
  			stationId:['',Validators.required],
  			dripoId:['',Validators.required]

  		}) 

  	}

  	validationMessages = {
  		'stationId':[
  			{type:'required',message:'Station name is required'}
  		],
  		'dripoId':[
  			{type:'required',message:'dripo id is required'}
  		]
  	}

  	ngOnInit() {
  		this.admin.readDripo()
  		.subscribe(
  			res => {
  		        if(res.success){
  		        	this.dripos = res.data;
  		        	}
              else{
                this.snackbar.open(res.message, 'close')
              }
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
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

  	onSubmit(formData: any, formDirective: FormGroupDirective): void {
  		this.dripoData = this.createDripoForm.value;
  		this.admin.createDripo(this.dripoData)
  		.subscribe(
  			res => {
  		        if(res.success){
  		            this.snackbar.open(res.message, 'close')
  		            this.admin.readDripo()
  		            .subscribe(
  		            	res => {
  		                    if(res.success){
  		                    	this.dripos = res.data;
  		                    	}
  		                    },
  		                err => {
  		                      console.log(err);
  		                }

  		            )
  		            formDirective.resetForm();
  		            this.createDripoForm.reset();
  		        	}
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
  	   
  	}

  	openEditDialog(dripo) {
  	        const dialogConfig = new MatDialogConfig();
  	        dialogConfig.autoFocus = true;
  	        dialogConfig.height= '300px';
  	        dialogConfig.width='500px';
  	        dialogConfig.data = {
  	                stationId: dripo.stationId,
  	                stationName: dripo.stationName,
  	                dripoId:dripo.dripoId,
  	                _id:dripo._id
  	            };

  	        let dialogRef = this.dialog.open(EditdripoDialogComponent, dialogConfig);
  	        dialogRef.afterClosed().subscribe(result => {
  	          if(result == 'success'){
  	          	this.admin.readDripo()
  	          	.subscribe(
  	          		res => {
  	          	        if(res.success){
  	          	        	this.dripos = res.data;
  	          	        	}
  	          	        },
  	          	    err => {
  	          	          console.log(err);
  	          	    }

  	          	)
  	          }
  	        });
  	}

  	openDeleteDialog(dripo) {
  	    const dialogConfig = new MatDialogConfig();
  	    dialogConfig.autoFocus = true;
  	    dialogConfig.height= '200px';
  	    dialogConfig.width='400px';
  	    dialogConfig.data = {
  	       stationName: dripo.stationName,
  	       dripoId:dripo.dripoId,
  	       _id:dripo._id
  	    };
  	    let dialogRef = this.dialog.open(DeletedripoDialogComponent, dialogConfig);
  	    dialogRef.afterClosed().subscribe(result => {
  	      if(result == 'success'){
  	      	this.admin.readDripo()
  	      	.subscribe(
  	      		res => {
  	      	        if(res.success){
  	      	        	this.dripos = res.data;
  	      	        	}
                      else{
                        this.dripos = [];
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
