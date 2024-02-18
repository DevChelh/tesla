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
    <form [formGroup]="modeleForm">
          <h2>Step 1 : Choose yout Model and color</h2>

          
            <label for="modelSelect">Modeles</label>
            <select formControlName="selectedModel" id="modelSelect">
              <option value="">Choose</option>
              @for (model of models; track $index) {
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
            <app-car-image [codeModel]="modeleForm.get('selectedModel')?.value.code" [codeColor]="modeleForm.get('selectedColor')?.value.code"></app-car-image>
          }
    </form>
    `
})

export class Step1Component implements OnInit {

  private CarService = inject(CarService)
  
  public modeleForm = this.CarService.modeleForm;
  public models = this.CarService.models; // Permet de gerer le retour, et gere le service comme un store
  public colors!: CarColors[]
  public configs!: CarConfig; 
  public selectColors: any; 
  
  ngOnInit(): void {

      if ( this.CarService.models.length < 1 ){
        this.CarService.getModels().pipe(
          tap(
            (data: CarModel[]) => {
              this.CarService.models = data
              this.models = data
            }
          )
        ).subscribe();
      }
      
      this.colors = this.modeleForm.get('selectedModel')?.value.colors // Permet de garder la couleur pour l'image et la selection

       this.modeleForm.get('selectedModel')?.valueChanges.pipe(
        map( (value) => {

          this.colors = value.colors 
          const code = value.code
          this.modeleForm.get('selectedColor')?.setValue(value.colors[0]) // selectionne par defaut le premier element de la liste 
          this.modeleForm.get('selectConfigs')?.reset() // Remet à 0 les valeurs des options
          
          return code
        } )
       ).subscribe()   
    }

}