import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute} from '@angular/router';
import {NurseService} from '../nurse.service';
import { MatSnackBar } from '@angular/material';




@Component({
  selector: 'app-nurse-phistory',
  templateUrl: './nurse-phistory.component.html',
  styleUrls: ['./nurse-phistory.component.css']
})
export class NursePhistoryComponent implements OnInit {
	histories=[];
  constructor(private route: ActivatedRoute,public snackbar: MatSnackBar,
  private router: Router,private nurse: NurseService) { }

  ngOnInit() {
  	this.nurse.readPatientHistory()
  	  .subscribe(
  	    res => {
  	        if(res.success){
  	        	this.histories = res.data;
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
