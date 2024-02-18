import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CarService } from '../Services/Car.service';

export const step3Guard: CanActivateFn = () => {
    const serviceCar = inject(CarService)
    const router = inject(Router)

    const configCarId = serviceCar.modeleForm.get('configCar')?.value.id 

    if(configCarId === 0){
        router.navigate([''])
        return false
      } 
       return true
}
