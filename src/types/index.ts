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

// Signup Response
export interface SignupResponse {
    userId: number;
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
    cropName: string;
    soilType: string;
    plantDate: string;
    status: string;
    harvest_pred: string | null;
}

// KYC Request
export interface KYCRequest {
    userId: number;
    location: string;
    fields: CropData[];
}

// CropData
export interface CropData {
    cropName: string;
    area: number;
    soilType: string;
    plantDate: string;
}

// KYC Response
export interface KYCResponse {
    location: string;
    fields: CropData[];
}