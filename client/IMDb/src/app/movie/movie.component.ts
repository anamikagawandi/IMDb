import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnChanges {
  cards = null;
  @Input() filter: string = null;
  @Input() sort: Object = null;
  @Input() q: string = null;
  searchChanges: string
  constructor(private _apiService: ApiService, private dialog: MatDialog) {

  }

  onSearchChange($event: string) {
    this.searchChanges = $event;
    console.log(this.searchChanges)
  }

  getMovies(type, filter, sort, sortType, limit, page, q) {
    this._apiService.getData(type, filter, sort, sortType, limit, page, q).subscribe(data => {
      console.log("in movies", data)
      this.cards = [];
      data["list"].forEach(element => {
        this._apiService.getMoviePoster(element["name"]).subscribe(poster => {
          // console.log(poster)
          if(poster["results"] && poster["results"][0] && poster["results"][0]["poster_path"]){
            element["poster"] = `http://image.tmdb.org/t/p/w500/${poster["results"][0]["poster_path"]}`;
          }else{
            element["poster"] = `https://via.placeholder.com/360/FFFFFF/FFFFFF?Text=Digital.com`
          }
          
          this.cards.push(element);
        })
      });


    }, err => {
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Filter", this.filter);
    console.log("Sort", this.sort);
    if (changes['filter'] || changes['sort'] || changes['q']) {
      if (this.sort)
        this.getMovies("movie", this.filter, this.sort["sort"], this.sort["sortType"], 8, 1, this.q);
      else
        this.getMovies("movie", this.filter, null, null, 8, 1, this.q);
    }
  }

  ngOnInit() {
    // this.getMovies("movie", null, null, null, 8, 1, this.q);
  }

  openDialog(movie) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "70%";
    dialogConfig.data = movie;

    this.dialog.open(MovieDetailComponent, dialogConfig);
  }
}
