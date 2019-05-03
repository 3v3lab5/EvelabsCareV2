import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

	// private manageUserUrl = 'http://74.207.227.41:4000/api/admin/user'
 //  private manageStationUrl = 'http://74.207.227.41:4000/api/admin/station'
 //  private manageBedUrl = 'http://74.207.227.41:4000/api/admin/bed'
 //  private manageIvsetUrl = 'http://74.207.227.41:4000/api/admin/ivset'
 //  private manageDripoUrl = 'http://74.207.227.41:4000/api/admin/dripo'

    private manageUserUrl = 'http://localhost:4000/api/admin/user'
    private manageStationUrl = 'http://localhost:4000/api/admin/station'
    private manageBedUrl = 'http://localhost:4000/api/admin/bed'
    private manageIvsetUrl = 'http://localhost:4000/api/admin/ivset'
    private manageDripoUrl = 'http://localhost:4000/api/admin/dripo'


  	constructor(private http:HttpClient,private router:Router) { }
  	createUser(userData){
  		return this.http.post<any>(this.manageUserUrl,userData)
  	}
  	readUser(){
  		return this.http.get<any>(this.manageUserUrl)
  	}
  	updateUser(editUserData){
  	  	return this.http.put<any>(this.manageUserUrl,editUserData)
  	}
  	deleteUser(deleteUserData){
  		let params = new HttpParams();
  		params = params.append("_id", deleteUserData.id);
  		return this.http.delete<any>(this.manageUserUrl,{params: params})
  	}
    createStation(stationData){
      return this.http.post<any>(this.manageStationUrl,stationData)
    }
    readStation(){
      return this.http.get<any>(this.manageStationUrl)
    }

    updateStation(stationData){
      return this.http.put<any>(this.manageStationUrl,stationData)
    }
    deleteStation(deleteStationData){
      let params = new HttpParams();
      params = params.append("_id", deleteStationData._id);
      return this.http.delete<any>(this.manageStationUrl,{params: params})
    }
    createBed(bedData){
      return this.http.post<any>(this.manageBedUrl,bedData)
    }
    readBed(){
      return this.http.get<any>(this.manageBedUrl)
    }
    updateBed(bedData){
      return this.http.put<any>(this.manageBedUrl,bedData)
    }
    deleteBed(deleteBedData){
      let params = new HttpParams();
      params = params.append("_id", deleteBedData._id);
      return this.http.delete<any>(this.manageBedUrl,{params: params})
    }
    createIvset(ivsetData){
      return this.http.post<any>(this.manageIvsetUrl,ivsetData)
    }
    readIvset(){
      return this.http.get<any>(this.manageIvsetUrl)
    }
    updateIvset(ivsetData){
      return this.http.put<any>(this.manageIvsetUrl,ivsetData)
    }
    deleteIvset(deleteIvsetData){
      let params = new HttpParams();
      params = params.append("_id", deleteIvsetData._id);
      return this.http.delete<any>(this.manageIvsetUrl,{params: params})
    }
    createDripo(dripoData){
      return this.http.post<any>(this.manageDripoUrl,dripoData)
    }
    readDripo(){
      return this.http.get<any>(this.manageDripoUrl)
    }
    updateDripo(dripoData){
      return this.http.put<any>(this.manageDripoUrl,dripoData)
    }
    deleteDripo(deleteDripoData){
      let params = new HttpParams();
      params = params.append("_id", deleteDripoData._id);
      return this.http.delete<any>(this.manageDripoUrl,{params: params})
    }


}


