import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private usersUrl = 'https://rent-hub-db.vercel.app/users';

  constructor(private http: HttpClient) {}

  // Add user to the database
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.usersUrl, user);
  }

  // Fetch users from the API
  getUsers(): Observable<any[]> {
    return this.http
      .get<any[]>(this.usersUrl)
      .pipe(catchError(this.handleError<any[]>('getUsers', [])));
  }

  // Check user credentials
  checkLogin(email: string, password: string): Observable<any> {
    return this.getUsers().pipe(
      map((users) => {
        const user = users.find(
          (u) => u.UserEmail === email && u.Password === password
        );
        return user ? user : null;
      }),
      catchError(() => of(null))
    );
  }

  // Handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  addToFavorites(userId: string, favorite: string): Observable<any> {
    return this.http.get(`${this.usersUrl}/${userId}`).pipe(
      switchMap((user: any) => {
        const index = user.UserFavorites.indexOf(favorite);
        if (index > -1) {
          user.UserFavorites.splice(index, 1);
        } else {
          user.UserFavorites.push(favorite);
        }
        return this.http.put(`${this.usersUrl}/${userId}`, user);
      })
    );
  }
}
