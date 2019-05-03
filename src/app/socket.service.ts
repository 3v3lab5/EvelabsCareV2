import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
	private socket: SocketIOClient.Socket;
  	constructor() {
  		//this.socket = io('http://74.207.227.41:4000');
      this.socket = io('http://localhost:4000');

  	}

  	// EMITTER
  	  sendMessage(topic:string,msg: string) {
  	    this.socket.emit('publish', {topic:topic ,message: msg});
  	  }

  	  // HANDLER
  	  onMessage() {
  	    return Observable.create(observer => {
  	      this.socket.on('dripo', msg => {
  	        observer.next(msg);
  	      });
  	    });
  	  }
}
