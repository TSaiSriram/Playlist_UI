import { Component, OnInit } from '@angular/core';
import { PlayListService } from '../services/play-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  playList = [];
  songsForm: FormGroup;

  constructor(private playService: PlayListService) { }

  ngOnInit() {

    this.songsForm = new FormGroup({
      title: new FormControl('')
    });

    this.getSongs();
  }


  getSongs() {
    this.playService.getList().subscribe(res => {
      res[`data`].map(data => this.playList.push(data));
    });
  }

  addSong(songsForm) {
    const body = songsForm.value;
    console.log(body);
    this.playService.addList(body).subscribe(res => {
      this.playList = [];
      this.getSongs();
    });

    this.songsForm = new FormGroup({
      title: new FormControl('')
    });
  }

  deleteSong(songId) {
   this.playService.delList(songId).subscribe(res => {
      this.playList = [];
      this.getSongs();
    });
  }

  title;

  searchSong(){
    this.playService.searchList(this.title).subscribe(res=>{
      // console.log(res)
      this.playList = [];
      res["data"].map(data => this.playList.push(data));
    })
  }

}
