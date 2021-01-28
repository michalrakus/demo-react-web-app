import {Brand} from "./Brand";

export interface Car {
    idCar: number;
    vin?: string;
    brand?: string;
    year?: string;
    color?: string;
    price?: string;
    brandAssoc?: Brand;
    [field: string]: any;
}
