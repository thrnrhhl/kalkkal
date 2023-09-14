
export interface IMeal {
    id: string;
    product: string;
    gram: number;
    kcal: number;
    date: Date;
}

export interface IGetMeals {
    _id: number;
    date: string;
    records: IMeal[]
}