import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardView } from '../Models/CardView';
import { SocialInfoView } from '../Models/SocialInfoView';

@Component({
  selector: 'app-outpatientcard',
  templateUrl: './outpatientcard.component.html',
  styleUrls: ['./outpatientcard.component.css']
})
export class OutpatientcardComponent implements OnInit {

  socialview!: SocialInfoView;
  cards: CardView[] = [];
  isExist: boolean = false;

  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
  //Получение социальной информации
  this.http.get("http://localhost:35702/api/home/GetSocialInfo").subscribe
  (data => {
    console.log(data);
    this.socialview = data;
  }, err => {
    console.log(err);
  })

    //Получение карты
    this.http.get<CardView[]>("http://localhost:35702/api/home/GetRecords").subscribe
    ((data2: CardView[]) => {
      this.cards = data2;
      console.log(this.cards);
      console.log(this.cards.length);
      if (this.cards.length!=0) this.isExist = true;
    }, err => {
      console.log(err);
    })
  }

}
