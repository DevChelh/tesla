import { Component, inject } from "@angular/core";
import { CarConfig, CarModel } from "../Interfaces/CardModel.interface";
import { map, tap } from "rxjs";
import { CarService } from "../Services/Car.service";
import { AsyncPipe, CurrencyPipe, JsonPipe, NgFor, NgIf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NavigationComponent } from "../navigation/navigation.component";
import { ActivatedRoute, Router } from "@angular/router";
import { CarImageComponent } from "../cardImages/card-image.component";


@Component({
    selector: 'app-step2',
    standalone: true,
    imports: [AsyncPipe, JsonPipe, NgIf, NgFor, ReactiveFormsModule, CurrencyPipe, NavigationComponent, CarImageComponent],
    template: `

    <form [formGroup]="modeleForm">
  <h2>Options pour le modèle</h2>
  @if( configs ) {
    <label for="Colors">Config</label>
    <select formControlName="config" (click)="selectConfig()">
    @for (confi of configs.configs; track $index; ) {
    <option [ngValue]="confi" >{{ confi.description }} </option>
    }
    </select>
    @if ( config ) {
       <ul>
      <li>
       Range: {{ config.range }} - Max speed: {{ config.speed }} - Cost: {{ config.price | currency }}
      </li>
    </ul>
    }
   
  }
  
    <app-car-image [codeModel]="modeleForm.get('selectedModel')?.value.code" [codeColor]="modeleForm.get('colors')?.value.code"></app-car-image>
   
  
</form>
    `, 
    styles: [
        ``
    ]
})

export class Step2Component {

    private CarService = inject(CarService)
    private router = inject(Router)
    modeleForm = this.CarService.modeleForm;

    configs: any = [];  
    config = this.CarService.config;
  
    ngOnInit(): void {
     this.configs = this.CarService.configs
     this.config = this.modeleForm.get('config')?.value
     this.configs.configs.length === 0 ? this.router.navigate(['']) : null;
    }
    
    selectConfig(){
      this.config = this.CarService.modeleForm.get('config')?.value
      console.log(this.config)
    }


}