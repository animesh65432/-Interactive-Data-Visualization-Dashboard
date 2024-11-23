export type CreateUserTypes = {
    email: string;
    Password: string
    Name: string
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


export type jwtPayloadTypes = {
    email: string
}

export type LoginTypes = {
    email: string,
    Password: string
}