import {Component, inject} from '@angular/core';
import {AsyncPipe, CurrencyPipe, JsonPipe, NgFor, NgIf} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CarColors, CarConfig, CarConfigs, CarModel } from './Interfaces/CardModel.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { NavigationComponent } from './navigation/navigation.component';
import { CarService } from './Services/Car.service';
import { Step1Component } from './step1/step1.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf, NgFor, ReactiveFormsModule, CurrencyPipe, NavigationComponent, RouterOutlet],
  template: `
  <app-navigation></app-navigation>
  <router-outlet></router-outlet>
  `,
})

export class AppComponent {
  
  

}
