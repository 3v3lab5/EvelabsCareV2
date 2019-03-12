import {Injectable, Injector} from '@angular/core';
import { HttpInterceptor,HttpErrorResponse } from '@angular/common/http';
import {AuthService} from './auth.service';
import {catchError} from "rxjs/internal/operators";
import {Observable, of} from 'rxjs';
import { MatSnackBar } from '@angular/material';




@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private injector: Injector,public snackbar: MatSnackBar) { }

   intercept(req,next){
   	let authService = this.injector.get(AuthService);
   	let tokenizedReq = req.clone({
   		setHeaders: {
   			Authorization:`Bearer ${authService.getToken()}`
   		}
   	})
   	return next.handle(tokenizedReq).pipe(catchError((err, caught) => {
        //intercept the respons error and displace it to the console
        this.handleAuthError(err);
        return of(err);
      }) as any);
   }



   private handleAuthError(err: HttpErrorResponse): Observable<any> {
       //handle your auth error or rethrow
       if (err.status === 422 || err.status === 404 ) {
         //navigate /delete cookies or whatever
        if(err.error.message){
            this.snackbar.open(err.error.message, 'close')
         }
         else if (err.error.errors){
            this.snackbar.open(err.error.errors[0].msg, 'close')
         }
         // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
         return of(err.message);
       }
       throw err;
     }

}