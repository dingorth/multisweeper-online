import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {CanActivate} from '@angular/router/index';

import { Router } from '@angular/router';

@Injectable()
export class SocketService implements CanActivate {
    
    constructor(private router:Router){}
    private socket : any;
    private userName: string;
    private url = 'https://multisweeper-online.herokuapp.com';

    canActivate(route ,state){
        if(state.url !== '/login' && !this.userName ){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
    

    login(username: string){
        if(!this.userName){
            this.socket.emit('login',username);
            this.userName = username;
            console.log(`logged with username ${this.userName}`);
        }  
    }
    connect(){
        if(!this.socket){
            this.socket = io(this.url);
            console.log('connected to ' + this.url);
        }
    }
    getLoginResponse() {
        let observable = new Observable(observer => {
            this.socket.on('login-response', (data) => {
                observer.next(data);
                console.log('getLoginResponse: ' + JSON.stringify(data)); 
            });
        })     
        return observable;
    }

    getRoomUsersUpdated(){
       let observable = new Observable(observer => {
            this.socket.on('room-users-updated', data => {
                observer.next(data);
                console.log('getRoomUsersUpdated: ' + JSON.stringify(data));
            });
        })
        return observable; 
    }

    createRoom(settings){
        console.log('joining created room');
        this.socket.emit('create',settings);
    }

    getRoomsUpdated(){
        let observable = new Observable(observer => {
            this.socket.on('rooms-updated', data => {
                observer.next(data);
                console.log('getRoomsUpdated: ' + JSON.stringify(data));
            });
        })
        return observable; 
    }

    getCreateResponse(){
        let observable = new Observable(observer => {
            this.socket.on('create-response', data => {
                observer.next(data);
                console.log('getCreateResponse: ' + JSON.stringify(data));
            });
        })
        return observable;
    }


    listRooms(){
        this.socket.emit('list-rooms');
        console.log('list rooms emited');
    }

    getListRooms(){
       let observable = new Observable(observer => {
            this.socket.on('list-rooms-response', data => {
                observer.next(data);
                console.log('getListRooms: ' + JSON.stringify(data));
            });
        })
        return observable; 
    }

    joinRoom(name:string){
        console.log('joining room');
        this.socket.emit('join',name);
    }

    getJoinResponse(){
        let observable = new Observable(observer => {
            this.socket.on('join-response', data => {
                observer.next(data);
                console.log('getJoinResponse: ' + JSON.stringify(data));
            });
        })
        return observable;
    }

    leaveRoom(){
        console.log('leaving room');
        this.socket.emit('leave');
    }

    sendMessage(message){
        console.log('emited message: ' + message);
        this.socket.emit('add-message',message);
    }

    click(x, y){
        console.log('clicked on '+ x + y);
        this.socket.emit('click', x, y);
    }

    flag(x, y){
        console.log('clicked on '+ x + y);
        this.socket.emit('flag', x, y);
    }

    getBoardUpdated(){
        let observable = new Observable(observer =>{
            this.socket.on('board-updated',data =>{
                observer.next(data);
                console.log('board updated: '+ JSON.stringify(data));
            })
        })
        return observable;
    }

    getMessages(){
        let observable = new Observable(observer =>{
            this.socket.on('message',data =>{
                observer.next(data);
                console.log('got message '+ JSON.stringify(data));
            })
        })
        return observable;
    }

}
