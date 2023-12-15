import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { ComputerService } from 'src/services/computer.service';

interface CardsLayout {
  title: string;
  description: string;
  imageSrc: string;
}

interface AssetCounts {
  allAssets: string;
  computerCount: string;
  printerCount: string;
  phoneCount: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatButtonModule],
})
export class HomeComponent implements OnInit {
  cards: CardsLayout[] = [];
  assetCounts: string[] | undefined;

  titles = ['All assets: ', 'Computers: ', 'Printers: ', 'Phones:'];

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

  constructor(private computersService: ComputerService) { }

  computerServiceCAllCount = 0;
  ngOnInit(): void {
    
    console.log('ngOnInit called');
    this.computersService.getAssetTypeCount()?.subscribe((value) => {
      
        this.assetCounts = value;

        if (this.assetCounts.length === 0) {
          this.computersService.forceRefresh();
        } else if (this.assetCounts.length > 0 && this.computerServiceCAllCount < 1) {

          this.titles = this.assetCounts;   

          for (let i = 0; i < this.images.length; i++) {
            console.log(`Creating card ${i + 1}`);
            this.cards.push({
              title: `${this.titles[i]}`,
              description: `${this.descriptions[i]}`,
              imageSrc: `${this.images[i]}`,
            });
    
          } 

          this.computerServiceCAllCount++;

          return;
        }  
      
      console.log("Updated titles inside subscription are " + this.titles);
      
    });   
    
    console.log("Updated titles outside subscription are  " + this.titles);

    console.log("Number of times ngOnInit was called :" + this.computerServiceCAllCount)
  }  
}

