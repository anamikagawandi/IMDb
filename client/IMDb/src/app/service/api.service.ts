import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getData(type, filter, sort, sortType, limit, page, q) {
    filter = filter ? filter : ""
    sortType = sortType ? sortType : 1
    limit = limit ? limit : 8;
    page = page ? page : 1;
    return this._http.get(`${environment.baseUrl}/${type}?filter=${filter}&sort=${sort}&sortType=${sortType}&limit=${limit}&page=${page}&q=${q}`)
  }

  getMoviePoster(name) {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${environment.api}&query=${name}`;
    return this._http.get(url)
  }

  updateMovie(id, movie) {
    let headers = new HttpHeaders().set('user', localStorage.getItem("user"))
      .set('token', localStorage.getItem("token"));
    let url = `${environment.baseUrl}/movie/${id}`;
    return this._http.put(url, movie, { headers: headers });
  }

  addGenre(genre) {
    let headers = new HttpHeaders().set('user', localStorage.getItem("user"))
      .set('token', localStorage.getItem("token"));
    let url = `${environment.baseUrl}/genre`;
    return this._http.post(url, { name: genre }, { headers: headers });
  }

  deleteMovie(id){
    let headers = new HttpHeaders().set('user', localStorage.getItem("user"))
    .set('token', localStorage.getItem("token"));
    let url = `${environment.baseUrl}/movie/${id}`;
    return this._http.delete(url, { headers: headers })
  }
}
