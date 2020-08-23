import { Component, OnInit, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
// import { Observable, Subscription } from 'rxjs/Rx';
import { map, shareReplay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import { ApiService } from '../service/api.service';

export interface SortValue {
  sort: string;
  sortType: number;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sortValue: SortValue[]= [
    {
      sort: "name",
      sortType: 1,
      name: "Name: Asc"
    },
    {
      sort: "name",
      sortType: -1,
      name: "Name: Desc"
    },
    {
      sort: "director",
      sortType: 1,
      name: "Director: Asc"
    },
    {
      sort: "director",
      sortType: -1,
      name: "Director: Desc"
    },
    {
      sort: "99popularity",
      sortType: 1,
      name: "Popularity: Asc"
    },
    {
      sort: "99popularity",
      sortType: -1,
      name: "Popularity: Desc"
    },
  ]

  genres: any = null;
  filter: any = null;
  sort: any = null;
  q: any = null;

  // emitEventToChild() {
  //   this.q.next("Steven");
  // }
  // controller = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private _apiService: ApiService) {
    // this.controller = new FormGroup({
    //   search: new FormControl(null)
    // })
  }

  ngOnInit(){
    this.getGenre();
    // this.controller.get('search').valueChanges.pipe(
    //   debounceTime(500),
    //   distinctUntilChanged())
    //   .subscribe(val => {
    //     this.q.emit(val);;
    //   });
  }

  getGenre() {
    this._apiService.getData("genre",null,null,null,null,null,null).subscribe(data => {
      console.log("in genre", data)
      this.genres = data["list"]
    }, err => {
    })
  }

  setFilter(event){
    console.log("in setting filter", event.value)
    this.filter = event.value;
  }

  setSort(event){
    console.log("in setting filter", event.value);
    this.sort = event.value;
  }
}