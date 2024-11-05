import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ListingsService } from '../../services/listings.service';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let listingsServiceMock: jasmine.SpyObj<ListingsService>;

  beforeEach(() => {
    // Create a mock ListingsService
    listingsServiceMock = jasmine.createSpyObj('ListingsService', [
      'getListings',
    ]);

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [{ provide: ListingsService, useValue: listingsServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });
});
