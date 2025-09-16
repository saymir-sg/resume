import { Component } from '@angular/core';
import { authorDetails } from '../constant';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  authorName = authorDetails.name;
}
