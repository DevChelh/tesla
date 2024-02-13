import { Component, inject } from "@angular/core";
import { CarConfig, CarModel } from "../Interfaces/CardModel.interface";
import { map, tap } from "rxjs";
import { CarService } from "../Services/Car.service";
import { AsyncPipe, CurrencyPipe, JsonPipe, NgFor, NgIf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NavigationComponent } from "../navigation/navigation.component";
import { ActivatedRoute } from "@angular/router";
import { CarImageComponent } from "../cardImages/card-image.component";


@Component({
    selector: 'app-step3',
    standalone: true,
    imports: [AsyncPipe, JsonPipe, NgIf, NgFor, ReactiveFormsModule, CurrencyPipe, NavigationComponent, CarImageComponent],
    template: `
    <div>
  <ul>
    <li> {{ modeleForm.get('config')?.value.description }}  :  {{ modeleForm.get('config')?.value.price | currency }}</li>
    <li>  Range: {{ modeleForm.get('config')?.value.range }} - Max speed: {{ modeleForm.get('config')?.value.speed }}  </li>
    <li> {{ modeleForm.get('colors')?.value.description}}  : {{ modeleForm.get('colors')?.value.price }} </li>

    <li> {{  modeleForm.get('config')?.value.price  +  modeleForm.get('colors')?.value.price | currency }} </li>
  </ul>
</div>

<app-car-image [codeModel]="modeleForm.get('selectedModel')?.value.code" [codeColor]="modeleForm.get('colors')?.value.code"></app-car-image>
    `, 
    styles: [
        ``
    ]
})

export class Step3Component {

    private CarService = inject(CarService)

    modeleForm = this.CarService.modeleForm;
    config = this.CarService.config;

    ngOnInit(): void{
      this.modeleForm = this.CarService.modeleForm;
      this.config = this.CarService.config;
      console.log( this.modeleForm.get('config')?.value)
    }
  
}