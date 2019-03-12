import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import  { AuthService} from '../auth.service';
import { Router, ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
	message={};
  constructor(private authService:AuthService,private route: ActivatedRoute,public snackbar: MatSnackBar,
  private router: Router) { }

  ngOnInit() {
  	let token = this.route.snapshot.paramMap.get('token');
  	this.authService.activateAccount(token)
  	  .subscribe(
  	    res => {
  	        if(res.success){

  	        	this.snackbar.open(res.message, 'close')
  	        	this.message = res.message;
  	        	this.router.navigate(['/login'])

  	        }
  	        else{
  	        	this.snackbar.open(res.message, 'close')
  	        	this.message = res.message;
  	        	this.router.navigate(['/login'])

  	        }
  	    },
  	    err => {
  	        console.log(err);
  	    }
  	)

  }

}
