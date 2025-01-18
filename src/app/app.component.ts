import { Component, ElementRef, HostListener, Inject, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SVGIcons } from './constant';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, HomeComponent, FooterComponent, MatIconModule],
})
export class AppComponent implements OnInit {
  themeType: string;
  private lastScrollTop = 0;
  private rafId: number | null = null;
  @ViewChild('mainElement', { static: true }) mainElement: ElementRef;
  // myData: any;
  // activeClass: boolean = false;
  // arrData: any;
  // intro: any;
  // contact: any;
  // about: any;
  // resume: any;
  // work: any;
  // menu: any;
  // activeSlide: any;
  // selected: string;

  // count = 0;


  // config: SwiperOptions = {
  //   pagination: '.swiper-pagination',
  //   paginationClickable: true,
  //   nextButton: '.swiper-button-next',
  //   prevButton: '.swiper-button-prev',
  //   spaceBetween: 30,
  //   direction: 'vertical'
  // };

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.themeType = 'dark-theme';
    this.renderer.addClass(this.document.body, this.themeType);
  }

  ngOnInit () {
    SVGIcons.forEach(iconName => {
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${iconName}.svg`)
      );
    });
  }

  // activeMenu(event: string){
  //   this.activeClass = !this.activeClass;
  //   this.selected = event
  // }
  // toggleMenu(){
  //   this.activeClass = !this.activeClass;
  // }
  

  // getData(){  
  //   return this.http.get('./assets/mydata.json')
  //   .pipe(
  //     map(res  => res)
  //   );
  // }

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

  changeTheme(): void {
    this.themeType = this.themeType === 'dark-theme' ? 'light-theme' : 'dark-theme';
    if (this.themeType === 'dark-theme') {
      this.renderer.removeClass(this.document.body, 'dark-theme');
      this.renderer.addClass(this.document.body, 'light-theme');
    } else {
      this.renderer.removeClass(this.document.body, 'light-theme');
      this.renderer.addClass(this.document.body, 'dark-theme');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const fullScrollLength = 600;
    const maxMargin = 8.3333;
    const decreasePerPx = (maxMargin / fullScrollLength);
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const newMargin = Math.max(maxMargin - currentScroll * decreasePerPx, 0);

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      const maxBorderRadius = 4;
      const borderRadius = Math.min(maxBorderRadius, newMargin * (maxBorderRadius / maxMargin));
      this.renderer.setStyle(this.mainElement.nativeElement, 'margin-left', `${newMargin}%`);
      this.renderer.setStyle(this.mainElement.nativeElement, 'margin-right', `${newMargin}%`);
      this.renderer.setStyle(this.mainElement.nativeElement, 'border-top-left-radius', `${borderRadius}rem`);
      this.renderer.setStyle(this.mainElement.nativeElement, 'border-top-right-radius', `${borderRadius}rem`);
    });
  
    this.lastScrollTop = Math.max(currentScroll, 0);
  }
}
