import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PaintService{
    constructor(private http:Http){
        console.log('Paint Service Initialized...');
    }

    getPaints(){
        return this.http.get('/api/paints')
            .map(res => res.json()); 
    }

    getUsers(){
        return this.http.get('/api/users')
            .map(res => res.json()); 
    }

    getPaintsSortNam(){
        return this.http.get('/api/paintsnam') 
            .map(res => res.json()); 
    }

    getPaintsSortSub(){
        return this.http.get('/api/paintssub')
            .map(res => res.json()); 
    }
    
    getPaintsSortIsW(){
        return this.http.get('/api/paintsisw')
            .map(res => res.json()); 
    }

    getPaintsSortNamDes(){
        return this.http.get('/api/paintsnamdes')
            .map(res => res.json()); 
    }

    getPaintsSortSubDes(){
        return this.http.get('/api/paintssubdes')
            .map(res => res.json()); 
    }
    
    getPaintsSortIsWDes(){
        return this.http.get('/api/paintsiswdes')
            .map(res => res.json()); 
    }

    addPaint(newPaint){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/paint', JSON.stringify(newPaint), {headers: headers})
            .map(res => res.json());
    }
    
    addUser(newUser){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/user', JSON.stringify(newUser), {headers: headers})
            .map(res => res.json());
    }

    deletePaint(id){
        return this.http.delete('/api/paint/'+id)
            .map(res => res.json());
    }
    
    updateStatus(paint){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/paint/'+paint._id, JSON.stringify(paint), {headers: headers})
            .map(res => res.json());
    }
}