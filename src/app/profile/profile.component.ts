import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(private listingsService: ListingsService) {}
  listings: any[] = [];
  userId: string = '';
  ngOnInit() {
    this.getListings();
    this.userId = JSON.parse(localStorage.getItem('user') ?? '{}').id;
  }

  getListings() {
    this.listingsService.getListings().subscribe((data) => {
      this.listings = data;
      console.log(this.listings);
    });
  }

  deleteListing(listingId: string) {
    this.listingsService.deleteListing(listingId).subscribe((data) => {
      console.log(data);
      this.getListings();
    });
  }
}
