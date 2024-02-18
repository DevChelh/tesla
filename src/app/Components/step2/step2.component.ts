import { Component, inject } from "@angular/core";
import { CarConfig, CarDetailsConfigs} from "../../Interfaces/CardModel.interface";
import { CarService } from "../../Services/Car.service";
import { AsyncPipe, CurrencyPipe, JsonPipe, NgFor, NgIf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NavigationComponent } from "../navigation/navigation.component";
import { ActivatedRoute, Router } from "@angular/router";
import { CarImageComponent } from "../carImages/card-image.component";
import { map, switchMap, tap } from "rxjs";


@Component({
    selector: 'app-step2',
    standalone: true,
    imports: [AsyncPipe, JsonPipe, NgIf, NgFor, ReactiveFormsModule, CurrencyPipe, NavigationComponent, CarImageComponent],
    template: `
                <form [formGroup]="modeleForm">
                  <h2>Options pour le modèle</h2>

                  @if( configs ) {
                    <label for="configSelect">Config</label>
                    <select formControlName="configCar" id="configSelect">
                    @for (confi of configs.configs; track $index; ) {
                    <option [ngValue]="confi">{{ confi.description }} </option>
                    }
                    </select>

                    @if ( carDetailsConfig ) {
                      <ul>
                      <li>
                      Range: {{ carDetailsConfig.range }} - Max speed: {{ carDetailsConfig.speed }} - Cost: {{ carDetailsConfig.price | currency }}
                      </li>
                      <div formGroupName="selectConfigs">
                        
                        @if ( configs.towHitch) {
                          <li>Tow: <input type="checkbox" id="includeTow" formControlName="towHitch"/></li>
                        }
                        
                        @if (configs.yoke) {
                          <li>Yoke: <input type="checkbox" id="includeYoke" formControlName="yoke"/></li>
                        }
                      </div>
                      
                    </ul>
                    }
                  
                  }
                    
                </form>
                <app-car-image [codeModel]="modeleForm.get('selectedModel')?.value.code" [codeColor]="modeleForm.get('selectedColor')?.value.code"></app-car-image>
    `
})

export class Step2Component {

    private CarService = inject(CarService)
    private activa= inject(ActivatedRoute)

    public modeleForm = this.CarService.modeleForm;
    public configs!: CarConfig;
    public carDetailsConfig!: CarDetailsConfigs;
  
    ngOnInit(): void {

      this.activa.paramMap.pipe(
        map( data => {
          const id = data.get("id")
          return id
        }),
          switchMap((id: any) => { 
            return this.CarService.getConfig(id).pipe(
              tap(
                (data: CarConfig) => {
                  if (data) {
                    this.configs = data
                    this.modeleForm.get('configs')?.setValue(data),
                    this.carDetailsConfig = data.configs[0];
                    this.modeleForm.get('configCar')?.setValue(this.carDetailsConfig);
                  }
                }
              )
            );
          }))
          .subscribe()

      this.modeleForm = this.CarService.modeleForm;
      this.carDetailsConfig = this.modeleForm.get('configCar')?.value
      
      this.modeleForm.get('configCar')?.valueChanges.subscribe(
        (configs) => {
          this.carDetailsConfig = configs
        }
      )
    }

}