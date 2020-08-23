import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
// import { Observable, Subscription } from 'rxjs/Rx';
import { map, shareReplay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { MatPaginator } from '@angular/material/paginator';

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

  sortValue: SortValue[] = [
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
  limit: any = 8;
  page: any = 1;
  q: any = null;
  isAdmin = false;
  toggleCard: boolean = false;
  controller: FormGroup;
  right = "0rem";
  resultsLength = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _apiService: ApiService, fb: FormBuilder, private dialog: MatDialog) {
    this.controller = fb.group({
      search: new FormControl()
    });
  }

  ngOnInit() {
    this.isAdmin = localStorage.getItem('token') ? true : false;
    this.getGenre();
    this.controller.get('search').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(val => {
        console.log("Values change", val)
        this.q = val;
      });
  }

  getGenre() {
    this._apiService.getData("genre", null, null, null, null, null, null).subscribe(data => {
      console.log("in genre", data)
      this.genres = data["list"]
    }, err => {
    })
  }

  setFilter(event) {
    console.log("in setting filter", event.value)
    this.filter = event.value;
  }

  setSort(event) {
    console.log("in setting filter", event.value);
    this.sort = event.value;
  }

  toggle(){
    this.toggleCard = !this.toggleCard;
    console.log(this.toggleCard)
    this.right = this.toggleCard ? "-10rem" :"0rem"
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }


  openDialog(type) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = type==='genre' ?"30%" :"50%";
    dialogConfig.height = type==='genre' ?"35%" :"70%";
    dialogConfig.data = {type:type};

    if(type==='login'){
      dialogConfig.width = "30%";
      dialogConfig.height = "50%";
    }

    this.dialog.open(MovieDetailComponent, dialogConfig);
  }

  updateCount(event){
    console.log("In update count",event);
    this.resultsLength = event;
  }

  goToPage(event){
    console.log(event)
    this.limit = event.pageSize;
    this.page = event.pageIndex+1;
    // this._apiService.getData("movie", this.filter, null, null, 500, 1, this.q).subscribe(data => {
    //   this.resultsLength = data["count"]
    // }, err => {
    // })
  }
}