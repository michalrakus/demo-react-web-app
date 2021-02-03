// zatial nepouzivany, ak budeme chciet kontrolovat atributy a typy, mozme v buducnosti pouzit v aplikacnom kode na klientovi (napr. v CarForm.tsx)
export interface Car {
    idCar: number;
    vin?: string;
    brand?: string;
    year?: string;
    color?: string;
    price?: string;
    //brandAssoc?: Brand;
}
