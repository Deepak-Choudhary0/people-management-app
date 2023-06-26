import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = 'https://your-rest-api-url/';

  constructor(private http: HttpClient) { }

  getAllPeople(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'people');
  }

  getPerson(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'people/' + id);
  }

  updatePerson(id: number, person: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'people/' + id, person);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'people/' + id);
  }
}
