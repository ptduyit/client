import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as globals from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private http: HttpClient) { }
  getSlide(){
    return this.http.get(globals.server+'api/slideshows');
  }
  createSlide(data){
    return this.http.post(globals.server+'api/slideshows',data);
  }
  deleteSlide(id){
    return this.http.delete(globals.server+'api/slideshows/'+id);
  }
}
