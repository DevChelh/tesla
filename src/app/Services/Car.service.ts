import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarColors, CarConfig, CarDetailsConfigs, CarModel } from '../Interfaces/CardModel.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

    modeleForm!: FormGroup;
    models: CarModel[] = [];

    constructor(private formBuilder: FormBuilder, private http: HttpClient){
        this.modeleForm = this.formBuilder.group({
            selectedModel: new FormControl<CarModel | string>('', Validators.required), 
            selectedColor: new FormControl<CarColors>( {code: '', description: '', price: 0}, Validators.required), 
            configCar: new FormControl<CarDetailsConfigs>( {id: 0, description: '', price: 0, range: 0, speed: 0}, Validators.required),
            configs: new FormControl<CarConfig>( {configs: [], towHitch: false, yoke: false}, Validators.required),
            selectConfigs: this.formBuilder.group({
                towHitch: new FormControl<boolean>(false),
                yoke: new FormControl<boolean>(false)
            }),
            
          });
    }

    getModels(): Observable<CarModel[]> {
        return this.http.get<CarModel[]>('/models')
      }
    
    getConfig(code: string): Observable<CarConfig> {
        return this.http.get<CarConfig>('/options/' + code)
      }

      

}