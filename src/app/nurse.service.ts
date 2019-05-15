import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
	private getStationsUrl = 'http://74.207.227.41:4000/api/nurse/station'
	private setStationUrl = 'http://74.207.227.41:4000/api/nurse/setstation'
	private getBedsUrl = 'http://74.207.227.41:4000/api/nurse/bed'
	private getDoctorsUrl = 'http://74.207.227.41:4000/api/nurse/doctor'
	private managePatientUrl = 'http://74.207.227.41:4000/api/nurse/patient'
	private getOccupiedBedsUrl = 'http://74.207.227.41:4000/api/nurse/occupiedbed'
	private manageTaskUrl = 'http://74.207.227.41:4000/api/nurse/task'
	private getUpcomingTaskUrl = 'http://74.207.227.41:4000/api/nurse/upcomingtask'
	private getDelayedTaskUrl = 'http://74.207.227.41:4000/api/nurse/delayedtask'
	private getActiveTaskUrl = 'http://74.207.227.41:4000/api/nurse/activetask'
	private getPhistoryUrl = 'http://74.207.227.41:4000/api/nurse/patienthistory'
	private getDriposUrl = 'http://74.207.227.41:4000/api/nurse/dripo'
	private blockAcknowledgeUrl = 'http://74.207.227.41:4000/api/nurse/blockack'


	// private getStationsUrl = 'http://localhost:4000/api/nurse/station'
	// private setStationUrl = 'http://localhost:4000/api/nurse/setstation'
	// private getBedsUrl = 'http://localhost:4000/api/nurse/bed'
	// private getDoctorsUrl = 'http://localhost:4000/api/nurse/doctor'
	// private managePatientUrl = 'http://localhost:4000/api/nurse/patient'
	// private getOccupiedBedsUrl = 'http://localhost:4000/api/nurse/occupiedbed'
	// private manageTaskUrl = 'http://localhost:4000/api/nurse/task'
	// private getUpcomingTaskUrl = 'http://localhost:4000/api/nurse/upcomingtask'
	// private getDelayedTaskUrl = 'http://localhost:4000/api/nurse/delayedtask'
	// private getActiveTaskUrl = 'http://localhost:4000/api/nurse/activetask'
	// private getPhistoryUrl = 'http://localhost:4000/api/nurse/patienthistory'
	// private getDriposUrl = 'http://localhost:4000/api/nurse/dripo'
	// private blockAcknowledgeUrl = 'http://localhost:4000/api/nurse/blockack'

	constructor(private http:HttpClient,private router:Router) { }
	readStation(){
	  return this.http.get<any>(this.getStationsUrl)
	}
	setStation(stationData){
		return this.http.post<any>(this.setStationUrl,stationData)
	}
	readBed(){
	  return this.http.get<any>(this.getBedsUrl)
	}
	readDoctor(){
	  return this.http.get<any>(this.getDoctorsUrl)
	}
	createPatient(patientData){
		return this.http.post<any>(this.managePatientUrl,patientData)
	}
	readPatient(){
	  return this.http.get<any>(this.managePatientUrl)
	}
	updatePatient(editPatientData){
		return this.http.put<any>(this.managePatientUrl,editPatientData)
	}

	dischargePatient(dischargePatientData){
	  let params = new HttpParams();
	  params = params.append("_id", dischargePatientData._id);
	  return this.http.delete<any>(this.managePatientUrl,{params: params})
	}
	readOccupiedBed(){
	  return this.http.get<any>(this.getOccupiedBedsUrl)
	}

	createTask(taskData){
		return this.http.post<any>(this.manageTaskUrl,taskData)
	}
	readUpcomingTask(){
		return this.http.get<any>(this.getUpcomingTaskUrl)
	}
	readDelayedTask(){
		return this.http.get<any>(this.getDelayedTaskUrl)
	}
	readActiveTask(){
		return this.http.get<any>(this.getActiveTaskUrl)
	}
	deleteTask(deleteTaskData){
	  let params = new HttpParams();
	  params = params.append("_id", deleteTaskData._id);
	  return this.http.delete<any>(this.manageTaskUrl,{params: params})
	}
	readPatientHistory(){
	  return this.http.get<any>(this.getPhistoryUrl)
	}

	readDripos(){
		return this.http.get<any>(this.getDriposUrl)
	}
	blockAck(blockAckData){
		return this.http.put<any>(this.blockAcknowledgeUrl,blockAckData)
	}

}
