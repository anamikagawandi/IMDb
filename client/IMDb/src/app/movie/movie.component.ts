import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../service/api.service'

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
  constructor(private _apiService: ApiService) {

  }

  onSearchChange($event: string){
    this.searchChanges = $event;
    console.log(this.searchChanges)
  }

  getMovies(type, filter, sort, sortType, limit, page, q) {
    this._apiService.getData(type, filter, sort, sortType, limit, page, q).subscribe(data => {
      console.log("in movies", data)
      this.cards = data["list"]
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
    this.getMovies("movie", null, null, null, 8, 1, this.q);
  }
}
