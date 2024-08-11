export interface User {
    email: string;
    password: string;
}

export interface UserDTO extends User{
    confirmPassword: string;
}

export interface UserCollection {
    email: string;
}