import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-car-image',
    standalone: true,
    imports: [],
    template: `
    
    <img [src]="'/assets/cars/' + codeModel + '/' + codeColor + '.jpg'" alt="Photo de la couleur sélectionnée" height="100%" width="100%">

    `, 
    styles: [
        ``
    ]
})

export class CarImageComponent{
    @Input({required: true}) codeModel: string | null = null
    @Input({required: true}) codeColor: string | null = null
    
}