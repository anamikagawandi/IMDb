import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
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
  @Input() limit: number = 8;
  @Input() page: number = 1;
  @Output() count = new EventEmitter();
  searchChanges: string
  constructor(private _apiService: ApiService, private dialog: MatDialog) {

  }

  onSearchChange($event: string) {
    this.searchChanges = $event;
    // console.log(this.searchChanges)
  }

  getMovies(type, filter, sort, sortType, limit, page, q) {
    this._apiService.getData(type, filter, sort, sortType, limit, page, q).subscribe(data => {
      // console.log("in movies", data)
      this.cards = [];
      data["list"].forEach(element => {
        this._apiService.getMoviePoster(element["name"]).subscribe(poster => {
          // console.log(poster)
          if (poster["results"] && poster["results"][0] && poster["results"][0]["poster_path"]) {
            element["poster"] = `http://image.tmdb.org/t/p/w500/${poster["results"][0]["poster_path"]}`;
          } else {
            element["poster"] = `https://via.placeholder.com/360/FFFFFF/FFFFFF?Text=Digital.com`
          }

          this.cards.push(element);
        })
      });
    }, err => {
      console.error(err);
    })
    this._apiService.getCount(filter, q).subscribe(data => {
      this.count.emit(data["count"]);
      // this.count = data["count"]
    }, err => {
      console.error(err);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("Filter", this.filter);
    // console.log("Sort", this.sort);

    if (changes['filter'] || changes['sort'] || changes['q'] || changes["limit"] || changes["page"]) {
      if (this.sort)
        this.getMovies("movie", this.filter, this.sort["sort"], this.sort["sortType"], this.limit, this.page, this.q);
      else
        this.getMovies("movie", this.filter, null, null, this.limit, this.page, this.q);
    }
  }

  ngOnInit() {
    // this.getMovies("movie", null, null, null, this.limit, this.page, this.q);
  }

  openDialog(movie) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "70%";
    dialogConfig.data = { movie: movie, type: "detail" };

    this.dialog.open(MovieDetailComponent, dialogConfig);
  }
}
