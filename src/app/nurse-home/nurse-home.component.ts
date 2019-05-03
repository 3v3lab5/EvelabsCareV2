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
    showFiller = false;

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
  histories=[];
  dripos=[];
  public cols;
  ovHeight=100;
  blockAckData={_id:''};   
  constructor(private observableMedia: ObservableMedia,private nurse: NurseService,public snackbar: MatSnackBar,private dialog: MatDialog,private socketService:SocketService) { 

    }

    onResize(event) {
      this.cols = (event.target.innerWidth <= 400) ? 1 : 4;
    }

    ngOnInit() {
      this.cols = (window.innerWidth <= 400) ? 1 : 4;
      //interval function to change task from upcoming to delayed
      // this.interval = setInterval(() => {
      //   var currentMin=new Date().getMinutes();
      //   if(currentMin == 59)
      //    {
      //     this.nurse.readUpcomingTask()
      //       .subscribe(
      //         res => {
      //             if(res.success){
      //                 this.upcomingTasks = res.data;
      //                 this.upcomingTaskFlag = true;
      //             }
      //             else{
      //                 console.log(res.message);
      //             }
      //         },
      //         err => {
      //             console.log(err);
      //         }
      //     )

      //     this.nurse.readDelayedTask()
      //       .subscribe(
      //         res => {
      //             if(res.success){
      //                 this.delayedTasks = res.data;
      //                 this.delayedTaskFlag = true;
      //             }
      //             else{
      //                 console.log(res.message);
      //             }
      //         },
      //         err => {
      //             console.log(err);
      //         }
      //     ) 
      //    }
      //    }, 60000);
         
        

      // this.nurse.readUpcomingTask()
      //   .subscribe(
      //     res => {
      //         if(res.success){
      //             this.upcomingTasks = res.data;
      //             this.upcomingTaskFlag = true;
      //         }
      //         else{
      //             console.log(res.message);
      //         }
      //     },
      //     err => {
      //         console.log(err);
      //     }
      // )

      // this.nurse.readDelayedTask()
      //   .subscribe(
      //     res => {
      //         if(res.success){
      //             this.delayedTasks = res.data;
      //             this.delayedTaskFlag = true;
      //         }
      //         else{
      //             console.log(res.message);
      //         }
      //     },
      //     err => {
      //         console.log(err);
      //     }
      // )


      // this.nurse.readActiveTask()
      //   .subscribe(
      //     res => {
      //         if(res.success){
      //             this.activeTasks = res.data;
      //         }
      //         else{
      //             console.log(res.message);
      //         }
      //     },
      //     err => {
      //         console.log(err);
      //     }
      // )

      this.nurse.readDripos()
        .subscribe(
          res => {
              if(res.success){
                  this.dripos = res.data;
              }
              else{
                   this.snackbar.open(res.message, 'close')
              }
          },
          err => {
              console.log(err);
          }
      )

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

          this.socketService.onMessage().subscribe(msg => {
              if(msg.infusionStatus == 'Start'){
                this.dripos.forEach(function (dripo,index) {
                    if(msg._id == dripo._id){
                      dripo.rate=msg.rate;
                      dripo.monitor=true;
                      dripo.bedName=msg.bedName;
                      dripo.status='ongoing';
                      dripo.infusionStatus='Started';
                      dripo.infusedVolume=msg.infusedVolume;
                      dripo.timeRemaining=msg.timeRemaining;
                      dripo.percentage=msg.percentage;
                      dripo.deviceCharge = msg.deviceCharge;
                      dripo.topic = msg.topic;
                    }
                });
              }

              else if(msg.infusionStatus == 'Infusing'){
                this.dripos.forEach(function (dripo,index) {
                    if(msg._id == dripo._id){
                      dripo.rate=msg.rate;
                      dripo.monitor=true;
                      dripo.status='ongoing';
                      dripo.bedName=msg.bedName;
                      dripo.infusionStatus='Started';
                      dripo.infusedVolume=msg.infusedVolume;
                      dripo.timeRemaining=msg.timeRemaining;
                      dripo.percentage=msg.percentage;
                      dripo.deviceCharge = msg.deviceCharge;
                      dripo.topic = msg.topic;
                    }
                });
              }

              else if(msg.infusionStatus == 'Blocked'){
                 this.dripos.forEach(function (dripo,index) {
                     if(msg._id == dripo._id){
                       dripo.rate=msg.rate;
                       dripo.monitor=true;
                       dripo.bedName=msg.bedName;
                       dripo.status='alerted';
                       dripo.infusionStatus='Blocked';
                       dripo.infusedVolume=msg.infusedVolume;
                       dripo.timeRemaining=msg.timeRemaining;
                       dripo.percentage=msg.percentage;
                       dripo.deviceCharge = msg.deviceCharge;
                       dripo.topic = msg.topic;
                     }
                 });
              }

              else if(msg.infusionStatus == 'Ended'){
                this.dripos.forEach(function (dripo,index) {
                    if(msg._id == dripo._id){
                      dripo.monitor=false;
                      dripo.status='" "';
                    }
                });
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

          

            });
    }

    acknowledge(id){
      this.blockAckData._id = id;
      this.nurse.blockAck(this.blockAckData)
        .subscribe(
          res => {
              if(res.success){
                this.dripos.forEach(function (dripo,index) {
                    if(dripo._id == id){
                      dripo.status='ongoing';
                    }
                });

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
    // openAddDialog() {
    //         const dialogConfig = new MatDialogConfig();
    //         dialogConfig.autoFocus = true;
    //         dialogConfig.height= '400px';
    //         dialogConfig.width='600px';

    //         let dialogRef = this.dialog.open(AddtaskDialogComponent, dialogConfig);
    //         dialogRef.afterClosed().subscribe(result => {
    //           if(result == 'success'){
    //             console.log("closed");
    //             this.nurse.readUpcomingTask()
    //             .subscribe(
    //               res => {
    //                     if(res.success){
    //                       this.upcomingTasks = res.data;
    //                       this.upcomingTaskFlag = true;
    //                       }
    //                     },
    //                 err => {
    //                       console.log(err);
    //                 }

    //             )
    //           }
    //         });
    // }

    // openTaskActivity(task){
    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.autoFocus = true;
    //   dialogConfig.height= '200px';
    //   dialogConfig.width='500px';
    //   dialogConfig.data = {
    //           _id: task._id,
    //       };
    //   let dialogRef = this.dialog.open(TaskactivityDialogComponent, dialogConfig);
    //             dialogRef.afterClosed().subscribe(result => {
    //               if(result == 'success'){
    //                 this.nurse.readUpcomingTask()
    //                 .subscribe(
    //                   res => {
    //                         if(res.success){
    //                           this.upcomingTasks = res.data;
    //                           this.upcomingTaskFlag = true;
    //                           }
    //                         },
    //                     err => {
    //                           console.log(err);
    //                     }

    //                 )
    //                 this.nurse.readDelayedTask()
    //                   .subscribe(
    //                     res => {
    //                         if(res.success){
    //                             this.delayedTasks = res.data;
    //                             this.delayedTaskFlag = true;
    //                         }
    //                         else{
    //                             console.log(res.message);
    //                         }
    //                     },
    //                     err => {
    //                         console.log(err);
    //                     }
    //                 )
    //                 this.nurse.readActiveTask()
    //                   .subscribe(
    //                     res => {
    //                         if(res.success){
    //                             this.activeTasks = res.data;
    //                         }
    //                         else{
    //                             console.log(res.message);
    //                         }
    //                     },
    //                     err => {
    //                         console.log(err);
    //                     }
    //                 )
    //               }
    //             });

    // }
    // acknowledge(task){
    //   this.socketService.sendMessage(task.topic+'mon',task._id+'-'+'Block_ACK'+'-'+task.rate+'-'+task.infusedVolume+'-'+task.timeRemaining+'-'+task.totalVolume+'-'+task.deviceCharge);
    //   this.socketService.sendMessage(task.topic+'staAck','STA_ACK');

    // }

    // openAddPatientDialog() {
    //         const dialogConfig = new MatDialogConfig();
    //         dialogConfig.autoFocus = true;
    //         dialogConfig.height= '400px';
    //         dialogConfig.width='600px';

    //         let dialogRef = this.dialog.open(AddpatientDialogComponent, dialogConfig);
    //         dialogRef.afterClosed().subscribe(result => {
    //           if(result == 'success'){
    //            this.nurse.readPatient()
    //              .subscribe(
    //                res => {
    //                    if(res.success){
    //                        this.patients = res.data;
    //                    }
    //                    else{
    //                         this.snackbar.open(res.message, 'close')
    //                    }
    //                },
    //                err => {
    //                    console.log(err);
    //                }
    //            )
    //           }
    //         });
    // }


    //   openEditDialog(patient) {
    //           const dialogConfig = new MatDialogConfig();
    //           dialogConfig.autoFocus = true;
    //           dialogConfig.height= '400px';
    //           dialogConfig.width='700px';
    //           dialogConfig.data = {
    //                   _id: patient._id,
    //                   patientName:patient.patientName,
    //                   bedId:patient._bed,
    //                   bedName:patient.bedName,
    //                   patientAge:patient.patientAge,
    //                   patientWeight:patient.patientWeight,
    //                   patientGender:patient.patientGender,
    //                   doctor:patient.doctor
    //               };

    //           let dialogRef = this.dialog.open(EditpatientDialogComponent, dialogConfig);
    //           dialogRef.afterClosed().subscribe(result => {
    //             if(result == 'success'){
    //               this.nurse.readPatient()
    //                 .subscribe(
    //                   res => {
    //                       if(res.success){
    //                           this.patients = res.data;
    //                       }
    //                       else{
    //                            this.snackbar.open(res.message, 'close')
    //                       }
    //                   },
    //                   err => {
    //                       console.log(err);
    //                   }
    //               )

    //                 this.nurse.readBed()
    //                       .subscribe(
    //                         res => {
    //                                if(res.success){
    //                                 this.beds = res.data;
    //                                 }
    //                                else{
    //                                  this.snackbar.open(res.message, 'close')
    //                                }
    //                                },
    //                            err => {
    //                                  console.log(err);
    //                            }

    //                       )

    //             }
    //           });
    //   }


    //   openDischargeDialog(patient) {
    //       const dialogConfig = new MatDialogConfig();
    //       dialogConfig.autoFocus = true;
    //       dialogConfig.height= '200px';
    //       dialogConfig.width='400px';
    //       dialogConfig.data = {
    //          _id: patient._id,
    //            patientName:patient.patientName,
    //            bedId:patient._bed,
    //            bedName:patient.bedName,
    //       };
    //       let dialogRef = this.dialog.open(DischargepatientDialogComponent, dialogConfig);
    //       dialogRef.afterClosed().subscribe(result => {
    //         if(result == 'success'){
    //           this.nurse.readPatient()
    //             .subscribe(
    //               res => {
    //                   if(res.success){
    //                       this.patients = res.data;
    //                   }
    //                   else{
    //                        this.snackbar.open(res.message, 'close')
    //                   }
    //               },
    //               err => {
    //                   console.log(err);
    //               }
    //           )
    //         }
    //       });
              
    //    }




}
