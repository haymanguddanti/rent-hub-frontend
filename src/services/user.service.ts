import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') ?? '{}');
  }

  isUserLoggedIn(): boolean {
    return !!this.getUser();
  }

  clearUser(): void {
    localStorage.removeItem('user');
  }
}
