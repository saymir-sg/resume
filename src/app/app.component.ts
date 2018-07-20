import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  myData: any;
  activeClass: boolean = false;
  arrData: any;
  intro: any;
  contact: any;
  about: any;
  resume: any;
  work: any;
  menu: any;
  activeSlide: any;
  selected: string;

  count = 0;


  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    direction: 'vertical'
  };

  constructor(private http: Http)  {
    // window.addEventListener("mousedown", this.mouseDown);
    // window.addEventListener("mouseup", this.mouseUp);
  }
  ngOnInit (){
    

    this.getData().subscribe(
      data => {
        this.arrData = data;
        console.log(this.arrData);
        this.intro = this.arrData['intro'];
        this.about = this.arrData['about'];
        this.resume = this.arrData['resume'];
        this.contact= this.arrData['contact'];
        this.work= this.arrData['portfolio'];
        this.menu= this.arrData['menu'];
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );

  }

  activeMenu(event: string){
    this.activeClass = !this.activeClass;
    this.selected = event
  }
  toggleMenu(){
    this.activeClass = !this.activeClass;
  }
  

  getData(){  
    return this.http.get('./assets/mydata.json')  
      .map(res  => res.json())
  }

  // mouseDown = (ev: MouseEvent) => {
  //   window.addEventListener("mousemove", this.mouseMove);
  // }
  // mouseUp = (ev: MouseEvent) => {
  //     window.removeEventListener("mousemove", this.mouseMove);
  // }
  // mouseMove = (ev: MouseEvent) => {
  //     this.count++;
  //     console.log(this.count);
  // }

}
