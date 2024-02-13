import { Component, inject } from "@angular/core";
import { CarConfig, CarModel } from "../Interfaces/CardModel.interface";
import { map, tap } from "rxjs";
import { CarService } from "../Services/Car.service";
import { AsyncPipe, CurrencyPipe, JsonPipe, NgFor, NgIf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NavigationComponent } from "../navigation/navigation.component";
import { CarImageComponent } from "../cardImages/card-image.component";


@Component({
    selector: 'app-step1',
    standalone: true,
    imports: [AsyncPipe, JsonPipe, NgIf, NgFor, ReactiveFormsModule, CurrencyPipe, NavigationComponent, CarImageComponent],
    template: `
    <form [formGroup]="modeleForm">
  <h2>Options pour le modèle</h2>
  <label for="Modeles">Modeles</label>
  <select formControlName="selectedModel" (change)="selectModel()">
    <option value="">Choose</option>
    <option *ngFor="let model of models" [ngValue]="model">{{ model.description }}</option>
  </select>

  @if ( colors ) {
    <label for="Colors">Colors</label>
    <select formControlName="colors">
    <option *ngFor="let color of colors" [ngValue]="color">{{ color.code }} {{ color.description }} </option>
    </select>
  }

  @if (
    colors
  ) {
    <app-car-image [codeModel]="modeleForm.get('selectedModel')?.value.code" [codeColor]="modeleForm.get('colors')?.value.code"></app-car-image>
   
  }
</form>
    `, 
    styles: [
        ``
    ]
})

export class Step1Component{
    private CarService = inject(CarService)

    modeleForm = this.CarService.modeleForm;
  
    models = this.CarService.models
    colors = this.CarService.colors
    configs = this.CarService.configs
    config = this.CarService.config
  
  
  
    ngOnInit(): void {
      this.CarService.modeleForm.reset()
      this.getModels();
    }
    
    selectModel(): void {
      this.colors = this.modeleForm.value.selectedModel.colors
      const config = this.modeleForm.value.selectedModel.code
      
      this.CarService.getConfig(config).pipe(
        tap( 
          (data: CarConfig) => { 
            this.CarService.configs = data,
            this.config = data.configs[0]
            this.modeleForm.get('config')?.setValue(this.config)
          })
      ).subscribe()
  
    }
  
    selectConfig(){
      this.config = this.modeleForm.get('config')?.value
      console.log(this.config)
    }
  
    getModels() {
      this.CarService.getModels().pipe(
        map(
          (data: CarModel[]) => {
            this.models = data
          }
        )
      ).subscribe();
    }
  


}