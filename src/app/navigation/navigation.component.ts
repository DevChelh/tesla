import { Component, Signal, WritableSignal, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { CarService } from "../Services/Car.service";


@Component({
    selector: 'app-navigation',
    standalone: true, 
    template: `

    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <ul class="navbar-nav">
                <li class="nav-item" routerLink="">Step 1</li>
                <li (click)="click()" class="nav-item">Step 2</li>
                <li class="nav-item" [routerLink]="  " routerLink="/step3"  > Step 3</li>
            </ul>
        </div>
    </nav>
    
    `, 
    imports: [RouterLink]
})

export class NavigationComponent{

    private cardService = inject(CarService)
    private route = inject(Router)

    code: WritableSignal<string> = signal('') ;

    click(){
        this.code.set(this.cardService.modeleForm.value.selectedModel.code);
        if(this.cardService.modeleForm.value.selectedModel != ''){
            this.route.navigate(['option/', this.code()])
        }
        
    }
}