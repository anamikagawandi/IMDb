import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: any = null;
  isAdmin = false;
  genres = null;
  controller: FormGroup;

  constructor(private dialogRef: MatDialogRef<MovieDetailComponent>,
    @Inject(MAT_DIALOG_DATA) movie, private _apiService: ApiService, private fb: FormBuilder) {
    this.controller = fb.group({
      genreControl: new FormControl(),
      directorControl: new FormControl(),
      imdbControl: new FormControl(),
      popularityControl: new FormControl()
    });
    this.movie = movie;
    this.movie["popularity"] = movie["99popularity"];
  }

  setGenre() {
    this._apiService.getData("genre", null, null, null, null, null, null).subscribe(data => {
      this.genres = data["list"];
      this.controller.get('genreControl').setValue(this.movie["genre"]);
    }, err => {
    })
  }

  ngOnInit(): void {
    this.controller.get('popularityControl').setValue(this.movie["popularity"]);
    this.controller.get('directorControl').setValue(this.movie["director"]);
    this.controller.get('imdbControl').setValue(this.movie["imdb_score"]);
    this.isAdmin = localStorage.getItem('token') ? true : false;
    this.setGenre();
  }

  addGenre(genre) {
    console.log(genre)
    this._apiService.addGenre(genre).subscribe(res => {
      console.log(res);
      this.setGenre();
    }, err => {
      console.error(err)
    })
  }

  updateMovie() {
    let movie = {
      "99popularity": parseInt(this.controller.get('popularityControl').value),
      "director": this.controller.get('directorControl').value,
      "genre": this.controller.get('genreControl').value,
      "imdb_score": this.controller.get('imdbControl').value
    }
    this._apiService.updateMovie(this.movie["_id"],movie).subscribe(res=>{
      console.log(res);
    },err=>{
      console.error(err);
    })
  }

  deleteMovie() {
    this._apiService.deleteMovie(this.movie["_id"]).subscribe(res=>{
      console.log(res);
    },err=>{
      console.error(err);
    })
  }
}
