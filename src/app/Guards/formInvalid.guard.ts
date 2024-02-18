import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CarService } from '../Services/Car.service';

export const formInvalidGuard: CanActivateFn = () => {
  const carService = inject(CarService)
  const route = inject(Router)

  if(carService.modeleForm.status === "INVALID"){
    route.navigate([''])
    return false
  }
  return true
};
