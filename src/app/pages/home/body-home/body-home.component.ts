import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'app-body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.scss']
})
export class BodyHomeComponent implements OnInit, AfterViewInit {
  @ViewChild('owlElementPlaystation') owlElementPlaystation: OwlCarousel
  @ViewChild('owlElementNintendo') owlElementNintendo: OwlCarousel
  @ViewChild('owlElementXbox') owlElementXbox: OwlCarousel


  constructor() { }

  ngOnInit() {
    var n = document.getElementsByClassName("owl-nav");
    for(var i=0;i<n.length;i++){
      n[i].removeAttribute("disabled");
    }
  }

  ngAfterViewInit() {
    new WOW({
      live: false
    }).init();
  }

}
