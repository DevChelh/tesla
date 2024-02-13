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
  configs: CarConfigs[], 
  towHitch: boolean,
  yoke: boolean
}

export interface CarConfigs {
    id: number, 
    description: string, 
    range: number, 
    speed: number, 
    price: number
}