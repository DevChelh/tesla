import { Component, OnInit, inject } from "@angular/core";
import { CarColors, CarConfig, CarModel } from "../../Interfaces/CardModel.interface";
import { map, tap } from "rxjs";
import { CarService } from "../../Services/Car.service";
import { AsyncPipe, CurrencyPipe, JsonPipe, NgFor, NgIf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NavigationComponent } from "../navigation/navigation.component";
import { CarImageComponent } from "../carImages/card-image.component";


@Component({
    selector: 'app-step1',
    standalone: true,
    imports: [ AsyncPipe, JsonPipe, NgIf, NgFor, ReactiveFormsModule, CurrencyPipe, NavigationComponent, CarImageComponent ],
    template: `
    <form [formGroup]="form">
          <h2>Step 1 : Choose yout Model and color</h2>

          
            <label for="modelSelect">Modeles</label>
            <select formControlName="selectedModel" id="modelSelect">
              <option value="" disabled>Choose</option>
              @for (model of carModels; track $index) {
                <option  [ngValue]="model">{{ model.description }}</option>
              }
            </select>
          
          

          @if ( colors ) {
            
              <label for="colorSelect">Colors</label>
              <select formControlName="selectedColor" id="colorSelect">
                @for (color of colors; track $index;) {
                  <option [ngValue]="color" >{{ color.description }} </option>
                }
              </select>
            
          }

          @if ( colors ) {
            <app-car-image [codeModel]="form.get('selectedModel')?.value.code" [codeColor]="form.get('selectedColor')?.value.code"></app-car-image>
          }
    </form>
    `
})

export class Step1Component implements OnInit {

  private CarService = inject(CarService)
  
  public form = this.CarService.modeleForm;
  public carModels!: CarModel[];
  public colors!: CarColors[]
  public configs!: CarConfig; 
  
  ngOnInit(): void {
    
    if ( this.CarService.carModels.length < 1 )
    {
      this.CarService.getModels().pipe(
        tap(
          (data: CarModel[]) => {
            this.CarService.carModels = data
            this.carModels = this.CarService.carModels
          }
        )
      ).subscribe();
    } else {
      this.carModels = this.CarService.carModels
      console.log(this.carModels)
    };
      
    this.colors = this.form.get('selectedModel')?.value.colors;

    this.form.get('selectedModel')?.valueChanges.pipe(
      tap( (value) => {
            this.colors = value.colors 
            this.form.get('selectedColor')?.setValue(value.colors[0])
            this.form.get('selectConfigs')?.reset()

            if(this.form.get('configCar')?.value.id !== 0)
            {
              const valueReset = {id: 0, description: '', price: 0, range: 0, speed: 0}
              this.form.get('configCar')?.setValue(valueReset)

              if(this.CarService.carConfigs != undefined){
                this.CarService.carConfigs = undefined
              }

            }
          } 
        )
      ).subscribe();
  }

}