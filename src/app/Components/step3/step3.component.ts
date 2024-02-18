import { Component, inject } from "@angular/core";
import { CarColors, CarDetailsConfigs, CarModel } from "../../Interfaces/CardModel.interface";
import { CarService } from "../../Services/Car.service";
import { AsyncPipe, CurrencyPipe, JsonPipe, NgFor, NgIf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NavigationComponent } from "../navigation/navigation.component";
import { Router } from "@angular/router";
import { CarImageComponent } from "../carImages/card-image.component";


@Component({
    selector: 'app-step3',
    standalone: true,
    imports: [AsyncPipe, JsonPipe, NgIf, NgFor, ReactiveFormsModule, CurrencyPipe, NavigationComponent, CarImageComponent],
    template: `
    <table>
    <legend>Step 3: Summary</legend>
    <h2> Your Tesla {{ yourTesla }} </h2>
    <tbody style="padding: 10px;">
        <tr>
            <td><strong>{{ configCar.description }}</strong></td>
            <td>{{ configCar.price | currency }}</td>
        </tr>
        <tr>
            <td>Range: {{ configCar.range }} - Max speed: {{ configCar.speed }}</td>
            <td></td>
        </tr>
        <tr>
            <td><strong>{{ selectedColor.description }}</strong></td>
            <td>{{ selectedColor.price | currency }}</td>
        </tr>
        @if (selectConfigs.yoke) {
        <tr>
            <td><strong>Yoke Package</strong></td>
            <td>{{ 1000 | currency }}</td>
        </tr>        
        }
        @if (selectConfigs.towHitch) {
          <tr>
            <td><strong>Tow Hitch Package</strong></td>
            <td>{{ 1000 | currency }}</td>
        </tr>
        }
        <tr style="border-top: 1px white solid;">
            <td><strong style="font-size: 20px;">Total Cost</strong></td>
            <td style="font-size: 16px;" >{{ totalCoast | currency }}</td>
        </tr>
    </tbody>
</table>
  

<app-car-image [codeModel]="modeleForm.get('selectedModel')?.value.code" [codeColor]="modeleForm.get('selectedColor')?.value.code"></app-car-image>
    `, 
    styles: [`
  table {
    border-collapse: collapse;
    border: none;
  }

  th, td, tbody {
    border: none;
    padding: 0; 
  }
    `]
})

export class Step3Component {

    private CarService = inject(CarService)
    private router = inject(Router)

    public totalCoast: number = 0;
    public modeleForm = this.CarService.modeleForm;
    public selectConfigs = this.modeleForm.get('selectConfigs')?.value
    public yourTesla = this.modeleForm.get('selectedModel')?.value.description
    
    public get configCar(): CarDetailsConfigs{
      return this.modeleForm.get('configCar')?.value;
    }

    public get selectedColor(): CarColors {
      return this.modeleForm.get('selectedColor')?.value
    }

    ngOnInit(): void{
        this.total()
        console.log(this.modeleForm)
    }

    total(): void{
      const priceColor = this.modeleForm.get('selectedColor')?.value.price
      const priceConfig = this.modeleForm.get('configCar')?.value.price
      let totalPrice = priceColor + priceConfig;

      if(this.selectConfigs.yoke){
        totalPrice += 1000
      }

      if(this.selectConfigs.towHitch){
        totalPrice += 1000
      }

      this.totalCoast = totalPrice;
    }
  
}