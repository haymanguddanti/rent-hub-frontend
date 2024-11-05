import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListingsService } from '../../services/listings.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private listingsService: ListingsService,
    private userService: UserService,
    private loginService: LoginService
  ) {}

  listings: any[] = [];
  searchTerm: string = '';
  ngOnInit() {
    this.getListings();
  }

  getListings() {
    this.listingsService.getListings().subscribe((data) => {
      this.listings = data;
      console.log(this.listings);
    });
  }

  isUserFav(listingID: number) {
    let user = this.userService.getUser();
    if (user.UserFavorites.indexOf(listingID) !== -1) return true;
    return false;
  }

  toggleFav(listingId: string) {
    const userId = JSON.parse(localStorage.getItem('user') ?? '{}').id;
    this.loginService
      .addToFavorites(userId, listingId)
      .subscribe((updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      });
  }

  filteredListings() {
    if (!this.searchTerm) {
      return this.listings;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    return this.listings.filter(
      (listing) =>
        listing.ListingTitle.toLowerCase().includes(lowerCaseSearchTerm) ||
        listing.ListingDescription.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
}
