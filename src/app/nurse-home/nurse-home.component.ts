import { Component, OnInit } from '@angular/core';
import { AddtaskDialogComponent } from '../addtask-dialog/addtask-dialog.component';
import {NurseService} from '../nurse.service';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { TaskactivityDialogComponent } from '../taskactivity-dialog/taskactivity-dialog.component';
import {SocketService} from '../socket.service';
import {Observable} from 'rxjs';
import {map,takeWhile,startWith} from "rxjs/internal/operators";
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { AddpatientDialogComponent } from '../addpatient-dialog/addpatient-dialog.component';
import { EditpatientDialogComponent } from '../editpatient-dialog/editpatient-dialog.component';
import { DischargepatientDialogComponent } from '../dischargepatient-dialog/dischargepatient-dialog.component';



@Component({
  selector: 'app-nurse-home',
  templateUrl: './nurse-home.component.html',
  styleUrls: ['./nurse-home.component.css']
})
export class NurseHomeComponent implements OnInit {
  messageText: string;
  activeTasks: Array<any>=[];
  iterates=[];
  upcomingTasks=[];
  upcomingTaskFlag = false;
  delayedTasks=[];
  delayedTaskFlag = false;
  interval: any;
  beds=[];
  doctors=[];
  patients=[];
  public cols;
  slideConfig = {
      "slidesToShow": 1,
      "slidesToScroll": 1,
      "dots": false,
      "infinite": true,
      "autoplay": true,
      "autoplaySpeed": 3500
  };    
  constructor(private observableMedia: ObservableMedia,private nurse: NurseService,public snackbar: MatSnackBar,private dialog: MatDialog,private socketService:SocketService) { 

    }

    onResize(event) {
      this.cols = (event.target.innerWidth <= 400) ? 2 : 5;
    }

    ngOnInit() {
      this.cols = (window.innerWidth <= 400) ? 2 : 2;
      //interval function to change task from upcoming to delayed
      this.interval = setInterval(() => {
        var currentMin=new Date().getMinutes();
        if(currentMin == 59)
         {
          this.nurse.readUpcomingTask()
            .subscribe(
              res => {
                  if(res.success){
                      this.upcomingTasks = res.data;
                      this.upcomingTaskFlag = true;
                  }
                  else{
                      console.log(res.message);
                  }
              },
              err => {
                  console.log(err);
              }
          )

          this.nurse.readDelayedTask()
            .subscribe(
              res => {
                  if(res.success){
                      this.delayedTasks = res.data;
                      this.delayedTaskFlag = true;
                  }
                  else{
                      console.log(res.message);
                  }
              },
              err => {
                  console.log(err);
              }
          ) 
         }
         }, 60000);
         
        

      this.nurse.readUpcomingTask()
        .subscribe(
          res => {
              if(res.success){
                  this.upcomingTasks = res.data;
                  this.upcomingTaskFlag = true;
              }
              else{
                  console.log(res.message);
              }
          },
          err => {
              console.log(err);
          }
      )

      this.nurse.readDelayedTask()
        .subscribe(
          res => {
              if(res.success){
                  this.delayedTasks = res.data;
                  this.delayedTaskFlag = true;
              }
              else{
                  console.log(res.message);
              }
          },
          err => {
              console.log(err);
          }
      )


      this.nurse.readActiveTask()
        .subscribe(
          res => {
              if(res.success){
                  this.activeTasks = res.data;
              }
              else{
                  console.log(res.message);
              }
          },
          err => {
              console.log(err);
          }
      )

      this.nurse.readPatient()
        .subscribe(
          res => {
              if(res.success){
                  this.patients = res.data;
              }
              else{
                   this.snackbar.open(res.message, 'close')
              }
          },
          err => {
              console.log(err);
          }
      )

          this.socketService.onMessage().subscribe(msg => {
              if(msg.infusionStatus == 'Start'){
                var indexValue = null;
                this.activeTasks.forEach(function (task,index) {
                    if(msg._id == task._id){
                      indexValue = index;
                    }
                });
                if(indexValue == null){
                  var length=this.activeTasks.push(msg);
                }
              }

              else if(msg.infusionStatus == 'Infusing'){
                this.activeTasks.forEach(function (task,index) {
                    if(msg._id == task._id){
                      task.rate=msg.rate;
                      task.status='ongoing';
                      task.infusionStatus='Infusing';
                      task.infusedVolume=msg.infusedVolume;
                      task.timeRemaining=msg.timeRemaining;
                      task.percentage=msg.percentage;
                      task.deviceCharge = msg.deviceCharge;
                      task.commonTopic = msg.commonTopic;
                    }
                });
              }

              else if(msg.infusionStatus == 'Block' || msg.infusionStatus == 'Rate Error'
                ||msg.infusionStatus == 'Almost Done' || msg.infusionStatus =='Done'){
                var indexValue;
                this.activeTasks.forEach(function (task,index) {
                    if(msg._id == task._id){
                      indexValue = index;
                    }
                });
                var removed = this.activeTasks.splice(indexValue,1);
                var length = this.activeTasks.unshift(msg);
              }

              else if(msg.infusionStatus == 'Stop'){
                var indexValue;
                this.activeTasks.forEach(function (task,index) {
                    if(msg._id == task._id){
                      indexValue = index;
                    }
                });
                var removed = this.activeTasks.splice(indexValue,1);
              }

              else if(msg.infusionStatus == 'Error_ACK'){
                this.activeTasks.forEach(function (task,index) {
                    if(msg._id == task._id){
                      task.status='ongoing';
                      task.infusionStatus='Infusing'
                      task.rate=msg.rate;
                      task.infusedVolume=msg.infusedVolume;
                      task.timeRemaining=msg.timeRemaining;
                      task.percentage=msg.percentage;
                      task.deviceCharge = msg.deviceCharge;
                      task.commonTopic = msg.commonTopic;
                    }
                });
              }

            });
    }


    openAddDialog() {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.height= '400px';
            dialogConfig.width='600px';

            let dialogRef = this.dialog.open(AddtaskDialogComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
              if(result == 'success'){
                console.log("closed");
                this.nurse.readUpcomingTask()
                .subscribe(
                  res => {
                        if(res.success){
                          this.upcomingTasks = res.data;
                          this.upcomingTaskFlag = true;
                          }
                        },
                    err => {
                          console.log(err);
                    }

                )
              }
            });
    }

    openTaskActivity(task){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.height= '200px';
      dialogConfig.width='500px';
      dialogConfig.data = {
              _id: task._id,
          };
      let dialogRef = this.dialog.open(TaskactivityDialogComponent, dialogConfig);
                dialogRef.afterClosed().subscribe(result => {
                  if(result == 'success'){
                    this.nurse.readUpcomingTask()
                    .subscribe(
                      res => {
                            if(res.success){
                              this.upcomingTasks = res.data;
                              this.upcomingTaskFlag = true;
                              }
                            },
                        err => {
                              console.log(err);
                        }

                    )
                    this.nurse.readDelayedTask()
                      .subscribe(
                        res => {
                            if(res.success){
                                this.delayedTasks = res.data;
                                this.delayedTaskFlag = true;
                            }
                            else{
                                console.log(res.message);
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    )
                    this.nurse.readActiveTask()
                      .subscribe(
                        res => {
                            if(res.success){
                                this.activeTasks = res.data;
                            }
                            else{
                                console.log(res.message);
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    )
                  }
                });

    }
    acknowledge(task){
      this.socketService.sendMessage(task.topic+'mon',task._id+'-'+'Block_ACK'+'-'+task.rate+'-'+task.infusedVolume+'-'+task.timeRemaining+'-'+task.totalVolume+'-'+task.deviceCharge);
      this.socketService.sendMessage(task.topic+'staAck','STA_ACK');

    }

    openAddPatientDialog() {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.height= '400px';
            dialogConfig.width='600px';

            let dialogRef = this.dialog.open(AddpatientDialogComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
              if(result == 'success'){
               this.nurse.readPatient()
                 .subscribe(
                   res => {
                       if(res.success){
                           this.patients = res.data;
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
            });
    }


      openEditDialog(patient) {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.autoFocus = true;
              dialogConfig.height= '400px';
              dialogConfig.width='700px';
              dialogConfig.data = {
                      _id: patient._id,
                      patientName:patient.patientName,
                      bedId:patient._bed,
                      bedName:patient.bedName,
                      patientAge:patient.patientAge,
                      patientWeight:patient.patientWeight,
                      patientGender:patient.patientGender,
                      doctor:patient.doctor
                  };

              let dialogRef = this.dialog.open(EditpatientDialogComponent, dialogConfig);
              dialogRef.afterClosed().subscribe(result => {
                if(result == 'success'){
                  this.nurse.readPatient()
                    .subscribe(
                      res => {
                          if(res.success){
                              this.patients = res.data;
                          }
                          else{
                               this.snackbar.open(res.message, 'close')
                          }
                      },
                      err => {
                          console.log(err);
                      }
                  )

                    this.nurse.readBed()
                          .subscribe(
                            res => {
                                   if(res.success){
                                    this.beds = res.data;
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
              });
      }


      openDischargeDialog(patient) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.height= '200px';
          dialogConfig.width='400px';
          dialogConfig.data = {
             _id: patient._id,
               patientName:patient.patientName,
               bedId:patient._bed,
               bedName:patient.bedName,
          };
          let dialogRef = this.dialog.open(DischargepatientDialogComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(result => {
            if(result == 'success'){
              this.nurse.readPatient()
                .subscribe(
                  res => {
                      if(res.success){
                          this.patients = res.data;
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
          });
              
       }




}
