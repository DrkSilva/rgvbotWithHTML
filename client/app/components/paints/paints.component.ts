import { Component } from '@angular/core';
import {PaintService} from '../../services/paint.service';
import {Paint} from '../../../Paint';
import {User} from '../../../User';

@Component({
  moduleId: module.id,
  selector: 'paints',
  templateUrl: 'paints.component.html'

})

export class PaintsComponent { 
    paints: Paint[];
    users: User[];
    ip: string;
    name: string;
    navpaint: Paint;
    subname: string;
    newname: string;
    newsubname: string;
    selectedPaint: Paint;
    selected: boolean;
    

    constructor(private paintService:PaintService){
        
            this.paintService.getPaints()
                .subscribe(paints => {
                    this.paints = paints;
                });
            this.paintService.getUsers()
                .subscribe(users => {
                    this.users = users;
                    }); 
    }

    addPaint(event){
        event.preventDefault();
        var newPaint = {
            name: this.name,
            subname: this.subname,
            isWorking: false
        }
        console.log(this.name+' creado');
        this.paintService.addPaint(newPaint)
            .subscribe(paint => {
                this.paints.push(paint);
                this.name = '';
                this.subname = '';
            });
            console.log('El usuario '+this.name+' fué añadido a la base');
        

    }

    
    
    deletePaint(id){
        var paints = this.paints;
        
        this.paintService.deletePaint(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < paints.length;i++){
                    if(paints[i]._id == id){
                        paints.splice(i, 1);
                    }
                }
            }
        });
        console.log('El usuario fué eliminado');
        this.selected = false;
    }
    
    updateStatus(paint){
        var _paint = {
            _id:paint._id,
            name: paint.name,
            subname: paint.subname,
            isWorking: !paint.isWorking
        };
        
        this.paintService.updateStatus(_paint).subscribe(data => {
            paint.isWorking = !paint.isWorking;

            if(paint.isWorking !== undefined ) {
                console.log('El usuario '+paint.name+' esta trabajando');
            }
            else{
                console.log('El usuario '+paint.name+' dejó de trabajar');
            }
        });
    }

    Select(paint: Paint)
    {
        console.log('El usuario '+paint.name+' fué seleccionado');
        this.selectedPaint = paint; 
        this.selected = true;
    }

    OrdName(){
        this.paintService.getPaintsSortNam().subscribe(paints => {
                this.paints = paints;
        });
    }

    OrdNameDes(){
        this.paintService.getPaintsSortNamDes().subscribe(paints => {
                this.paints = paints;
        });
    }

    OrdSub(){
        this.paintService.getPaintsSortSub().subscribe(paints => {
                this.paints = paints;
        });
    }

    OrdSubDes(){
        this.paintService.getPaintsSortSubDes().subscribe(paints => {
                this.paints = paints;
        });
    }

    OrdIsW(){
        this.paintService.getPaintsSortIsW().subscribe(paints => {
                this.paints = paints;
        });
    }

    OrdIsWDes(){
        this.paintService.getPaintsSortIsWDes().subscribe(paints => {
                this.paints = paints;
        });
    }
    openNav(paint) {
        document.getElementById("myNav").style.width = "100%";
        this.navpaint= paint;
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
        var paint = this.navpaint;
        var _paint = {
            //_id:paint._id,
            name: this.newname,
            subname: this.newsubname,
            isWorking: paint.isWorking
        };
        //aqui encima estoy actualizando a la persona seleccionada
        //y debajo estoy actualizando lo que vemos

       this.paintService.updateStatus(_paint).subscribe(data => {
             paint.name = this.newname;
             paint.subname = this.newsubname;
 
             if(paint.isWorking !== undefined ) {
                 console.log('El usuario '+paint.name+' esta trabajando');
             }
             else{
                 console.log('El usuario '+paint.name+' dejó de trabajar');
             }
        });
    }
}