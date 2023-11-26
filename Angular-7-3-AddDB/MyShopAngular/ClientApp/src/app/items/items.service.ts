import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from './item'; // Import your item model

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = 'api/item/';

  constructor(private _http: HttpClient) { }

  getItems(): Observable<IItem[]> {
    return this._http.get<IItem[]>(this.baseUrl);
  }

  createItem(newItem: IItem): Observable<any> {
    const createUrl = 'api/item/create';
    return this._http.post<any>(createUrl, newItem);
  }
}
