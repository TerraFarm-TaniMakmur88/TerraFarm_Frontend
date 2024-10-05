// BACKEND-RELATED COMPONENTS
// JWT Payload
export interface JwtPayload {
    id: string;
    email: string;
    iat: number;
    exp: number;
}

// Login Request
export interface LoginRequest {
    email: string;
    password: string;
}

// Login Response
export interface LoginResponse {
    token: string;
}

// Signup Request
export interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

// Self Response
export interface SelfResponse {
    email: string;
    name: string;
    location: string;
}

// Crop Response
export interface CropResponse {
    id: number;
    userId: number;
    area: number;
    soilType: string;
    plantDate: string;
    status: string;
    harvest_pred: string | null;
}