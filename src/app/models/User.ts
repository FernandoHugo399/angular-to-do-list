export interface User {
    email: string;
    password: string;
}

export interface UserDTO {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserCollection {
    email: string;
}