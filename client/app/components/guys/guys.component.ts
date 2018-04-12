import { Component } from '@angular/core';
import {GuyService} from '../../services/guy.service';
import {Guy} from '../../../Guy';
import {User} from '../../../User';

@Component({
  moduleId: module.id,
  selector: 'guys',
  templateUrl: 'guys.component.html'

})

export class GuysComponent { 
    guys: Guy[];
    users: User[];
    ip: string;
    name: string;
    navguy: Guy;
    subname: string;
    newname: string;
    newsubname: string;
    selectedGuy: Guy;
    selected: boolean;
    

    constructor(private guyService:GuyService){
        usuario: string = window.prompt("usuario");
        pass: string = window.prompt("contraseña");
        if(usuario=='kvoruh'&&pass=='pass')
        {
            this.guyService.getGuys()
                .subscribe(guys => {
                    this.guys = guys;
                });
            this.guyService.getUsers()
                .subscribe(users => {
                    this.users = users;
                    }); 
        }
    }

    addGuy(event){
        event.preventDefault();
        var newGuy = {
            name: this.name,
            subname: this.subname,
            isWorking: false
        }
        console.log(this.name+' creado');
        this.guyService.addGuy(newGuy)
            .subscribe(guy => {
                this.guys.push(guy);
                this.name = '';
                this.subname = '';
            });
            console.log('El usuario '+this.name+' fué añadido a la base');
        this.addUser();

    }

    addUser(){
        var newUser = {
            ip: '192.168.1.1';
        }

        console.log(this.name+' creado');
        this.guyService.addUser(newUser)
            .subscribe(user => {
                this.users.push(user);
            });
            console.log('El usuario '+this.name+' fué añadido a la base');
    }
    
    deleteGuy(id){
        var guys = this.guys;
        
        this.guyService.deleteGuy(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < guys.length;i++){
                    if(guys[i]._id == id){
                        guys.splice(i, 1);
                    }
                }
            }
        });
        console.log('El usuario fué eliminado');
        this.selected = false;
    }
    
    updateStatus(guy){
        var _guy = {
            _id:guy._id,
            name: guy.name,
            subname: guy.subname,
            isWorking: !guy.isWorking
        };
        
        this.guyService.updateStatus(_guy).subscribe(data => {
            guy.isWorking = !guy.isWorking;

            if(guy.isWorking !== undefined ) {
                console.log('El usuario '+guy.name+' esta trabajando');
            }
            else{
                console.log('El usuario '+guy.name+' dejó de trabajar');
            }
        });
    }

    Select(guy: Guy)
    {
        console.log('El usuario '+guy.name+' fué seleccionado');
        this.selectedGuy = guy; 
        this.selected = true;
    }

    OrdName(){
        this.guyService.getGuysSortNam().subscribe(guys => {
                this.guys = guys;
        });
    }

    OrdNameDes(){
        this.guyService.getGuysSortNamDes().subscribe(guys => {
                this.guys = guys;
        });
    }

    OrdSub(){
        this.guyService.getGuysSortSub().subscribe(guys => {
                this.guys = guys;
        });
    }

    OrdSubDes(){
        this.guyService.getGuysSortSubDes().subscribe(guys => {
                this.guys = guys;
        });
    }

    OrdIsW(){
        this.guyService.getGuysSortIsW().subscribe(guys => {
                this.guys = guys;
        });
    }

    OrdIsWDes(){
        this.guyService.getGuysSortIsWDes().subscribe(guys => {
                this.guys = guys;
        });
    }
    openNav(guy) {
        document.getElementById("myNav").style.width = "100%";
        this.navguy= guy;
    }

    closeNav() {
        document.getElementById("myNav").style.width = "0%";
    }

    openAddNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeAddNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    update(){
        var guy = this.navguy;
        var _guy = {
            //_id:guy._id,
            name: this.newname,
            subname: this.newsubname,
            isWorking: guy.isWorking
        };
        //aqui encima estoy actualizando a la persona seleccionada
        //y debajo estoy actualizando lo que vemos

       this.guyService.updateStatus(_guy).subscribe(data => {
             guy.name = this.newname;
             guy.subname = this.newsubname;
 
             if(guy.isWorking !== undefined ) {
                 console.log('El usuario '+guy.name+' esta trabajando');
             }
             else{
                 console.log('El usuario '+guy.name+' dejó de trabajar');
             }
        });
    }
}