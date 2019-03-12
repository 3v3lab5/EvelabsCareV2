import { Component , OnInit} from '@angular/core';
import  { AuthService} from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, Observable } from "rxjs";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EvelabsCare';
  constructor(public authService:AuthService,private router:Router){
  }

  public jwtHelper = new JwtHelperService();
  public menuItems=[];

  ngOnInit() {
    if(this.authService.loggedIn()){
      const token = localStorage.getItem('token');
      const decodedToken = this.jwtHelper.decodeToken(token);
      if(decodedToken.permission == 'nurse' && decodedToken.stationName){
        this.router.navigate(['/nurse/home']);
      }
      else if(decodedToken.permission == 'nurse' && !decodedToken.stationName){
        this.router.navigate(['/nurse/selectstation']);
      }
      else if(decodedToken.permission == 'admin'){
        this.router.navigate(['/admin/home']);
      }
    }
    else{
      // this.router.navigate(['/login'])
    }
  }

  adminPermission():boolean{
  	if(this.authService.loggedIn()){
  		const token = localStorage.getItem('token');
  		const decodedToken = this.jwtHelper.decodeToken(token);
  		if(decodedToken.permission == 'admin'){
  			return true;
  		}
  		else{
  			return false;
  		}
  	}
  }


  nursePermission():boolean{
  	if(this.authService.loggedIn()){
  		const token = localStorage.getItem('token');
  		const decodedToken = this.jwtHelper.decodeToken(token);
  		if(decodedToken.permission == 'nurse'){
  			return true;
  		}
  		else{
  			return false;
  		}
  	}
  }

 
}
