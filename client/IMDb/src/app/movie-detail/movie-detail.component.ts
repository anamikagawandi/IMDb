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
  type = null;
  hide = true;

  constructor(private dialogRef: MatDialogRef<MovieDetailComponent>,
    @Inject(MAT_DIALOG_DATA) data, private _apiService: ApiService, private fb: FormBuilder) {
    this.controller = fb.group({
      genreControl: new FormControl(),
      nameControl: new FormControl(),
      directorControl: new FormControl(),
      imdbControl: new FormControl(),
      popularityControl: new FormControl()
    });

    this.isAdmin = localStorage.getItem('token') ? true : false;

    if (data.type === 'detail') {
      this.movie = data.movie;
      this.movie["popularity"] = data.movie["99popularity"];
      this.type = 'detail';
      this.controller.get('popularityControl').setValue(this.movie["popularity"]);
      this.controller.get('directorControl').setValue(this.movie["director"]);
      this.controller.get('imdbControl').setValue(this.movie["imdb_score"]);
      this.setGenre();
      this.controller.get('genreControl').setValue(this.movie["genre"]);
    } else if (data.type === 'genre') {
      this.type = "genre"
    } else if (data.type === 'movie') {
      this.type = "movie";
      this._apiService.getData("genre", null, null, null, null, null, null).subscribe(data => {
        this.genres = data["list"];
      }, err => {
      })
    } else if (data.type === 'login') {
      this.type = "login"
    }

  }

  setGenre() {
    this._apiService.getData("genre", null, null, null, null, null, null).subscribe(data => {
      this.genres = data["list"];
    }, err => {
    })
  }

  ngOnInit(): void {

  }

  addGenre(genre) {
    // console.log(genre)
    this._apiService.addGenre(genre).subscribe(res => {
      // console.log(res);
      this.setGenre();
    }, err => {
      console.error(err)
    })
  }

  addMovie() {
    let movie = {
      "name": this.controller.get('nameControl').value,
      "99popularity": parseInt(this.controller.get('popularityControl').value),
      "director": this.controller.get('directorControl').value,
      "genre": this.controller.get('genreControl').value,
      "imdb_score": this.controller.get('imdbControl').value
    }
    // console.log(movie);
    this._apiService.addMovie(movie).subscribe(res => {
      // console.log(res);
    }, err => {
      console.error(err);
    })
  }

  updateMovie() {
    let movie = {
      "99popularity": parseInt(this.controller.get('popularityControl').value),
      "director": this.controller.get('directorControl').value,
      "genre": this.controller.get('genreControl').value,
      "imdb_score": this.controller.get('imdbControl').value
    }
    this._apiService.updateMovie(this.movie["_id"], movie).subscribe(res => {
      // console.log(res);
    }, err => {
      console.error(err);
    })
  }

  deleteMovie() {
    this._apiService.deleteMovie(this.movie["_id"]).subscribe(res => {
      // console.log(res);
    }, err => {
      console.error(err);
    })
  }

  login(user, pass) {
    // console.log(user, pass)
    this._apiService.getToken(user, pass).subscribe(res => {
      // console.log(res);
      localStorage.setItem("user", user);
      localStorage.setItem("token", res["token"]);
      window.location.reload();
    }, err => {
      console.error(err);
    })
  }
}
