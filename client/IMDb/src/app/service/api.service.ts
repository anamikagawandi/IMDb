import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  /**
   * Get operation details of a particular operation
   * @params OperationId {Object} Data for new operation - name,file,platforms
   * @returns {Observable}
   */
  getData(type,filter,sort,sortType,limit,page,q){
    filter = filter ? filter : ""
    sortType = sortType ? sortType : 1
    limit = limit ? limit : 8;
    page = page ? page : 1;
    console.log(`${environment.baseUrl}${type}?filter=${filter}&sort=${sort}&sortType=${sortType}&limit=${limit}&page=${page}&q=${q}`);
    return this._http.get(`${environment.baseUrl}/${type}?filter=${filter}&sort=${sort}&sortType=${sortType}&limit=${limit}&page=${page}&q=${q}`)
  }
}
