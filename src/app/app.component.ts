import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, HomeComponent, FooterComponent, CommonModule, MatIconModule],
})
export class AppComponent implements OnInit {
  lines = new Array(12);
  themeType: string;
  private rafId: number | null = null;
   private mouseX = 0;
  private mouseY = 0;
  private outerX = 0;
  private outerY = 0;
  @ViewChild('mainElement', { static: true }) mainElement: ElementRef;
  isDark: boolean = true;
  @ViewChild('cursorInner', { static: true }) cursorInner!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorOuter', { static: true }) cursorOuter!: ElementRef<HTMLDivElement>;


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
    @Inject(DOCUMENT) private document: Document
  ) {
    this.themeType = 'dark-theme';
    this.renderer.addClass(this.document.body, this.themeType);
  }

  ngOnInit(): void {
    this.renderer.listen('document', 'mousemove', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const interactiveParent = target.closest('button, a, input, textarea, select, [role="button"]');
      if (interactiveParent) {
        this.cursorInner.nativeElement.style.opacity = '0';
        this.cursorOuter.nativeElement.style.opacity = '0';
        document.body.style.cursor = 'pointer';
      } else {
        this.cursorInner.nativeElement.style.opacity = '1';
        this.cursorOuter.nativeElement.style.opacity = '1';
        document.body.style.cursor = 'none';
      }

      this.mouseX = event.clientX;
      this.mouseY = event.clientY;

      // inner cursor follows instantly
      this.cursorInner.nativeElement.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px) translate(-50%, -50%)`;
    });

    this.animateOuterCursor();
  }

  animateOuterCursor(): void {
    const delay = 0.15; // smoothness (lower = faster)

    const animate = () => {
      this.outerX += ((this.mouseX - this.outerX) * delay);
      this.outerY += ((this.mouseY - this.outerY) * delay);

      this.cursorOuter.nativeElement.style.transform = `translate(${this.outerX}px, ${this.outerY}px) translate(-50%, -50%)`;

      requestAnimationFrame(animate);
    };

    animate();
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
  
    // this.lastScrollTop = Math.max(currentScroll, 0);
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-theme', this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  setTheme(mode: 'light' | 'dark') {
    this.isDark = (mode === 'dark');
    document.body.classList.toggle('dark-theme', this.isDark);
    localStorage.setItem('theme', mode);
  }
}
