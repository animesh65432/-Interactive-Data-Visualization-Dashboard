export type CreateUserTypes = {
    email: string
}

export interface SucessResponseTypes {
    success: boolean;
    message: string;
    data: any;
}


export interface ErrorResponseTypes {
    success: boolean;
    message: string;
    data: any;
}


export type RetrivethedatabyspefictimeTypes = {
    startDate: string
    endDate: string
}

export type RetrivethedatabyspefictimeTypesandGender = {
    startDate: string
    endDate: string
    gender: string
}

export type RetrieveDataByTimeRangeTypesAge = {
    startDate: string
    endDate: string
    age: string
}