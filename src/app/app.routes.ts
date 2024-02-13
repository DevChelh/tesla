import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';

export const routes: Routes = [
    { path: '', component: Step1Component }, 
    { path: 'option/:id' , component: Step2Component},
    { path: 'step3' , component: Step3Component}
];
