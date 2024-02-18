import {  Routes } from '@angular/router';
import { Step1Component } from './Components/step1/step1.component';
import { Step2Component } from './Components/step2/step2.component';
import { Step3Component } from './Components/step3/step3.component';
import { step3Guard } from './Guards/step3.guard';
import { formInvalidGuard } from './Guards/formInvalid.guard';



export const routes: Routes = [
    { path: '', redirectTo: '/step1', pathMatch: 'full' },
    { path: 'step1', component: Step1Component }, 
    { path: 'option/:id' , component: Step2Component, canActivate: [ formInvalidGuard ]},
    { path: 'step3' , component: Step3Component, canActivate:[ formInvalidGuard, step3Guard ]}
];
