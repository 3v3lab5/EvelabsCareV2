import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AdminService} from '../admin.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-deleteivset-dialog',
  templateUrl: './deleteivset-dialog.component.html',
  styleUrls: ['./deleteivset-dialog.component.css']
})
export class DeleteivsetDialogComponent implements OnInit {
	deleteIvsetData={ivsetModel:'',ivsetDpf:''};
  constructor(private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<DeleteivsetDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) { 
  		this.deleteIvsetData = data;
  	}

  ngOnInit() {
  }

  removeIvset(){
  	this.admin.deleteIvset(this.deleteIvsetData)
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
