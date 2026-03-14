export interface User {
    _id: string,
    username: string,
    displayName: string
}

export interface LoginCredentials {
    username: string,
    displayName?: string,
    password: string
}

export interface AuthResponse {
    userId: string,
    username: string,
    displayName: string,
    token: string
}

export interface AuthContextType {
    user: User | null,
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

export interface UserFormErrors {
    usernameErr?: string,
    displayNameErr?: string,
    passwordErr?: string,
    loginErr?: string
}