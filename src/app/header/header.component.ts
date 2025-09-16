import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { SVGIcons } from '../constant';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  lastScrollTop = 0;
  isDark: boolean = true;
  @ViewChild('headerContainer') container: ElementRef;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    SVGIcons.forEach(iconName => {
      console.log(`Registering icon: ${iconName}`);
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${iconName}.svg`)
      );
    });
  }
}
