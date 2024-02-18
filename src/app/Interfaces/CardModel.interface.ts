export interface CarModel {
    code: string;
    description: string;
    colors: CarColors[];
  }

export interface CarColors {
    code: string;
    description: string;
    price: number;
}

export interface CarConfig {
  configs: CarDetailsConfigs[], 
  towHitch: boolean,
  yoke: boolean
}

export interface CarDetailsConfigs {
    id: number, 
    description: string, 
    range: number, 
    speed: number, 
    price: number
}