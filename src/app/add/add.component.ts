import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ListingsService } from '../../services/listings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  myForm: FormGroup;
  preview: boolean = false;
  amenitiesList = [
    'Gym/Fitness Center',
    'Power Backup',
    'Plant Security System',
    'Swimming Pool',
    'Garbage Disposal',
    'Laundry Service',
    'Car Park',
    'Private Lawn',
    'Elevator',
    'Visitors Parking',
    'Water Heater',
    'Club House',
  ];

  imageUrl1: string | null = null;
  imageUrl2: string | null = null;
  imageUrl3: string | null = null;
  imageUrl4: string | null = null;

  constructor(
    private fb: FormBuilder,
    private listingService: ListingsService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      ListingTitle: ['', Validators.required],
      ListingDescription: ['', Validators.required],
      ListingLocation: ['', Validators.required],
      amenities: this.fb.group({}),
      comments: this.fb.group({}),
      ListingRent: ['', Validators.required],
      ListingDeposit: ['', Validators.required],
      ListingArea: ['', Validators.required],
      imageUrl1: [''],
      imageUrl2: [''],
      imageUrl3: [''],
      imageUrl4: [''],
      ListingUser: JSON.parse(localStorage.getItem('user') ?? '{}')?.id,
    });
    this.initializeAmenities();
  }

  onImageSelected(event: Event, imageId: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (imageId === 1) {
          this.imageUrl1 = reader.result as string;
          this.myForm.get('imageUrl1')?.setValue(reader.result);
        }
        if (imageId === 2) {
          this.imageUrl2 = reader.result as string;
          this.myForm.get('imageUrl2')?.setValue(reader.result);
        }
        if (imageId === 3) {
          this.imageUrl3 = reader.result as string;
          this.myForm.get('imageUrl3')?.setValue(reader.result);
        }
        if (imageId === 4) {
          this.imageUrl4 = reader.result as string;
          this.myForm.get('imageUrl4')?.setValue(reader.result);
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  initializeAmenities() {
    const amenitiesGroup = this.myForm.get('amenities') as FormGroup;
    this.amenitiesList.forEach((amenity) => {
      amenitiesGroup.addControl(amenity, this.fb.control(false));
    });
  }

  onPreview() {
    if (
      this.myForm.valid &&
      this.atLeastOneAmenitySelected &&
      this.anyImageUploaded
    ) {
      this.preview = true;
    } else {
      this.myForm.markAllAsTouched();
      const amenitiesGroup = this.myForm.get('amenities') as FormGroup;
      Object.keys(amenitiesGroup.controls).forEach((key) => {
        amenitiesGroup.get(key)?.markAsTouched();
      });
    }
  }

  onSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      this.listingService.addListing(this.myForm.value).subscribe(
        (response) => {
          console.log('Listing created successfully!', response);
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Error adding listing:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  get atLeastOneAmenitySelected(): boolean {
    const amenitiesGroup = this.myForm.get('amenities') as FormGroup;
    return Object.values(amenitiesGroup.controls).some(
      (control) => control.value
    );
  }

  get anyImageUploaded(): boolean {
    return !!(
      this.imageUrl1 ||
      this.imageUrl2 ||
      this.imageUrl3 ||
      this.imageUrl4
    );
  }

  get numberOfImagesUploaded(): number {
    let count = 0;
    if (this.imageUrl1) count++;
    if (this.imageUrl2) count++;
    if (this.imageUrl3) count++;
    if (this.imageUrl4) count++;
    return count;
  }
}
