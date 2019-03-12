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
	history={patientName:'',patientAge:'',patientWeight:'',patientGender:'',patientStatus:'',
    admittedOn:'',dischargedOn:'',_medication:''
  };
  constructor(private route: ActivatedRoute,public snackbar: MatSnackBar,
  private router: Router,private nurse: NurseService) { }

  ngOnInit() {
  	let id = this.route.snapshot.paramMap.get('id');
  	this.nurse.readPatientHistory(id)
  	  .subscribe(
  	    res => {
  	        if(res.success){
  	        	this.history = res.data;
  	        	console.log(this.history);
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
