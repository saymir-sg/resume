import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  lastScrollTop = 0;
  @ViewChild('headerContainer') container: ElementRef;

  constructor(private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    let opacityValue = Math.max(0, 1 - currentScroll / 1000);
    let translateYValue = Math.min(-50, - currentScroll / 100);
    let transformValue = `translateY(${translateYValue}%)`;

    // if (currentScroll > this.lastScrollTop) {
    //   this.renderer.setStyle(this.container.nativeElement, 'transform', transformValue);
    //   this.renderer.setStyle(this.container.nativeElement, 'opacity', opacityValue.toString());
    // } else {
    //   this.renderer.setStyle(this.container.nativeElement, 'transform', transformValue);
    //   this.renderer.setStyle(this.container.nativeElement, 'opacity', opacityValue.toString());
    // }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}
