import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GuyService{
    constructor(private http:Http){
        console.log('Guy Service Initialized...');
    }

    getGuys(){
        return this.http.get('/api/guys')
            .map(res => res.json()); 
    }

    getUsers(){
        return this.http.get('/api/users')
            .map(res => res.json()); 
    }

    getGuysSortNam(){
        return this.http.get('/api/guysnam') 
            .map(res => res.json()); 
    }

    getGuysSortSub(){
        return this.http.get('/api/guyssub')
            .map(res => res.json()); 
    }
    
    getGuysSortIsW(){
        return this.http.get('/api/guysisw')
            .map(res => res.json()); 
    }

    getGuysSortNamDes(){
        return this.http.get('/api/guysnamdes')
            .map(res => res.json()); 
    }

    getGuysSortSubDes(){
        return this.http.get('/api/guyssubdes')
            .map(res => res.json()); 
    }
    
    getGuysSortIsWDes(){
        return this.http.get('/api/guysiswdes')
            .map(res => res.json()); 
    }

    addGuy(newGuy){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/guy', JSON.stringify(newGuy), {headers: headers})
            .map(res => res.json());
    }
    
    addUser(newUser){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/user', JSON.stringify(newUser), {headers: headers})
            .map(res => res.json());
    }

    deleteGuy(id){
        return this.http.delete('/api/guy/'+id)
            .map(res => res.json());
    }
    
    updateStatus(guy){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/guy/'+guy._id, JSON.stringify(guy), {headers: headers})
            .map(res => res.json());
    }
}