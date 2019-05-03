import { Component , OnInit} from '@angular/core';
import  { AuthService} from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, Observable } from "rxjs";
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EvelabsCare';
  constructor(public authService:AuthService,private router:Router,private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer,){
      matIconRegistry.addSvgIcon('battery_90', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/battery_90.svg'));
      matIconRegistry.addSvgIcon('battery_20', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/battery_20.svg'));
      matIconRegistry.addSvgIcon('battery_30', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/battery_30.svg'));
      matIconRegistry.addSvgIcon('battery_50', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/battery_50.svg'));
      matIconRegistry.addSvgIcon('battery_60', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/battery_60.svg'));
      matIconRegistry.addSvgIcon('battery_80', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/battery_80.svg'));
      matIconRegistry.addSvgIcon('battery_full', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/battery_full.svg'));
      matIconRegistry.addSvgIcon('battery_alert', domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/battery_alert.svg'));


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
