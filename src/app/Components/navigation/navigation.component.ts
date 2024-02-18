import { Component, inject,} from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { CarService } from "../../Services/Car.service";
import { CarModel } from "../../Interfaces/CardModel.interface";


@Component({
    selector: 'app-navigation',
    standalone: true, 
    template: `

    <nav class="navbar navbar-expand-lg">
        <div class="container">

                <button class="card" routerLinkActive="active"  id="step1">Step 1</button>
                <button class="card"  [routerLink]="(['option/', code])" id="step2">Step 2</button>
                <button class="card"  id="step3" routerLink="/step3"> Step 3</button>

        </div>
    </nav>
    
    `, 
    imports: [RouterLink]
})

export class NavigationComponent{

    private cardService = inject(CarService)

    code!: string | number;

    ngOnInit(){
      this.cardService.modeleForm.get("selectedModel")?.valueChanges.subscribe(
        (data: CarModel) => this.code = data.code
      )
    }
}