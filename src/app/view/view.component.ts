import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListingsService } from '../../services/listings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent {
  commentsForm: FormGroup;
  constructor(
    private http: HttpClient,
    private listingsService: ListingsService,
    private route: ActivatedRoute
  ) {
    this.commentsForm = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
  }

  id: string = '';
  listing: any;
  listingImages: any = [];
  userId = JSON.parse(localStorage.getItem('user') ?? '{}')?.id;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id !== '')
      this.listingsService.getListingDetails(this.id).subscribe((data) => {
        this.listing = data;
        if (this.listing.imageUrl1)
          this.listingImages.push(this.listing.imageUrl1);
        if (this.listing.imageUrl2)
          this.listingImages.push(this.listing.imageUrl2);
        if (this.listing.imageUrl3)
          this.listingImages.push(this.listing.imageUrl3);
        if (this.listing.imageUrl4)
          this.listingImages.push(this.listing.imageUrl4);
        console.log(this.listing);
      });
  }

  addComment() {
    console.log(this.commentsForm.value);
    this.listingsService
      .addComment(this.id, this.userId, this.commentsForm.value.comment)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
