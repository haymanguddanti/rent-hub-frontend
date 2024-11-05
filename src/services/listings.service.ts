import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ListingsService {
  constructor(private http: HttpClient) {}

  getListingDetails(id: string) {
    return this.http.get<any[]>(
      'https://rent-hub-db.vercel.app/listings/' + id
    );
  }

  getListings() {
    return this.http.get<any[]>('https://rent-hub-db.vercel.app/listings');
  }

  addListing(listing: any): Observable<any> {
    console.log(listing);
    return this.http.post<any>(
      'https://rent-hub-db.vercel.app/listings',
      listing
    );
  }

  editListing(listing: any, id: string): Observable<any> {
    return this.http.patch<any>(
      'https://rent-hub-db.vercel.app/listings/' + id,
      listing
    );
  }

  deleteListing(id: string): Observable<any> {
    return this.http.delete<any>(
      'https://rent-hub-db.vercel.app/listings/' + id
    );
  }

  addComment(listingId: string, userId: string, comment: string) {
    return this.http
      .get<any>(`https://rent-hub-db.vercel.app/listings/${listingId}`)
      .pipe(
        switchMap((listing) => {
          const updatedComments = [
            ...listing.comments,
            { user: userId, comment },
          ];
          return this.http.patch(
            `https://rent-hub-db.vercel.app/listings/${listingId}`,
            {
              comments: updatedComments,
            }
          );
        })
      );
  }
}
