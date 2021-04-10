import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Hero} from './hero'

import { tap } from 'rxjs/operators';
import {Observable,of} from 'rxjs';
//import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class HeroService {

  private baseUrl='http://localhost:5000/api/v1/heroes';

  constructor(private http:HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    //this.messageService.add('HeroService:fetched heroes');
    return this.http.get<Hero[]>(this.baseUrl);
  }

  getHero(id:number):Observable<Hero>{
    return this.http.get<Hero>(`${this.baseUrl}/${id}`); 
    }

  updateHero(hero:Hero):Observable<any>{
    return this.http.put(`${this.baseUrl}/${hero.id}`,hero,httpOptions);
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.baseUrl,hero,httpOptions);
  }

  deleteHero(hero:Hero):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${hero.id}`,httpOptions);
  }
  
  searchHeroes(term:string):Observable<Hero[]>{
    if(!term.trim())
    {
      return of();
    }
    return this.http.get<Hero[]>(`${this.baseUrl}/?name=${term}`);
  }
}

