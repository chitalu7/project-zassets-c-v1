import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';


type CardsLayout = {
  title: string;
  description: string;
  imageSrc: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html' ,
  styleUrls: [ './home.component.css'],
  standalone: true, 
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatButtonModule],
})
export class HomeComponent {

  cards = signal<CardsLayout[]>([]);

  titles = [
    'All assets', 
    'Computers',
    'Printers', 
    'Phones'
  ]

  images = [
    '../../assets/images/all_assets_200.png',
    '../../assets/images/computers_200.png',
    '../../assets/images/printers_200.png',
    '../../assets/images/phones_200.png',
  ];

  descriptions = [
    'All assets on-site.',
    'Computer assets.',
    'Printer assets.',
    'Hard phone assets.',
  ];

  constructor() {

    const assetCards: CardsLayout[] = [];

     for ( let i = 0; i < this.images.length; i++){
      assetCards.push({
        title: `${this.titles[i]}`,
        description: `${this.descriptions[i]}`,
        imageSrc:`${this.images[i]}`,
      });

     }

     this.cards.set(assetCards);


  }





}
