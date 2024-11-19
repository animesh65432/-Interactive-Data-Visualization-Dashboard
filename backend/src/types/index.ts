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