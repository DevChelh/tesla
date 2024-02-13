import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarColors, CarConfig, CarConfigs, CarModel } from '../Interfaces/CardModel.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
    modeleForm!: FormGroup;

    models: CarModel[] = [];
    colors!: CarColors[];
    configs: CarConfig = { configs: [], towHitch: false, yoke: false };
    config!: CarConfigs;;
  
    constructor(private formBuilder: FormBuilder, private http: HttpClient){
        this.modeleForm = this.formBuilder.group({
            selectedModel: ['', Validators.required], 
            colors: ['', Validators.required], 
            config: ['', Validators.required]
          });
    }

    getModels(): Observable<CarModel[]> {
        return this.http.get<CarModel[]>('/models')
      }
    
    getConfig(code: string): Observable<CarConfig> {
        return this.http.get<CarConfig>('/options/' + code)
      }

}