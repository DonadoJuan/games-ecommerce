import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Slider } from '../../../domain/slider';
import { SliderService } from '../../../core/services/slider/slider.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  sliderSub: Subscription;
  sliderArr: Slider[] = [];
  error: boolean;

  constructor( private sliderService : SliderService) { }

  ngOnInit() {

    this.sliderSub = this.sliderService.getSlider$()
    .subscribe(data => { 
      data.forEach(d => {
        this.sliderArr.push(d);
        console.log(d);
        let image = (d.imagen) ? d.imagen : "http://localhost:3000/img/no-image.png";
       
      });
    }, 
    error => {
      console.error(error);

      this.error = true;
    });
  }

}
