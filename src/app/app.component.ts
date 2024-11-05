import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Spaces';
  isLoading = true;
  constructor(public router: Router, private userService: UserService) {}
  logout() {
    console.log(this.router.url);
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
