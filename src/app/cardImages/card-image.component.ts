import { Component, Input, inject } from "@angular/core";
import { CarConfig, CarModel } from "../Interfaces/CardModel.interface";
import { map, tap } from "rxjs";
import { CarService } from "../Services/Car.service";
import { AsyncPipe, CurrencyPipe, JsonPipe, NgFor, NgIf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NavigationComponent } from "../navigation/navigation.component";


@Component({
    selector: 'app-car-image',
    standalone: true,
    imports: [],
    template: `
    
    <div>
    <img [src]="'/assets/cars/' + codeModel + '/' + codeColor + '.jpg'" alt="Photo de la couleur sélectionnée" >
  </div>

    `, 
    styles: [
        ``
    ]
})

export class CarImageComponent{
    @Input({required: true}) codeModel: string | null = null
    @Input({required: true}) codeColor: string | null = null
    
}