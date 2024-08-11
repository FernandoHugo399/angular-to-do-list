export interface User {
    email: string;
    password: string;
}

export interface UserLoginDTO extends User { }

export interface UserRegisterDTO extends User {
    confirmPassword: string;
}

export interface UserCollection {
    email: string;
}