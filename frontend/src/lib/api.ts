// In frontend/src/lib/api.ts
import axios from 'axios';

// Define the shape of our data for type safety
interface AuthCredentials {
  email?: string;
  password?: string;
}

interface IncomeSource {
  id: string;
  incomeType: string;
  jobTitle?: string;
  company?: string;
  startMonth?: string;
  startYear?: string;
  annualIncome?: number;
  hourlyRate?: number;
  hoursPerWeek?: number;
  additionalCompensation?: number;
  paycheckFrequency?: string;
  description?: string;
  otherIncomeType?: string;
  yearlyAmount?: number;
}

interface LoanApplicationData {
  loanDetails: {
    loanPurpose: string;
    loanAmount: number;
  };
  personalInfo: {
    firstName: string;
    lastName: string;
    suffix: string;
    birthMonth: string;
    birthDay: string;
    birthYear: string;
    streetAddress: string;
    aptSuite: string;
    city: string;
    state: string;
    zipCode: string;
    housingStatus: string;
    phoneNumber: string;
    textUpdatesConsent: boolean;
    educationLevel: string;
  };
  educationInfo: {
    lastEnrolledYear: string;
    schoolName: string;
    graduationYear: string;
    areaOfStudy: string;
  };
  incomeInfo: {
    sources: IncomeSource[];
  };
  financialInfo: {
    savingsAmount: string;
    investmentAmount: string;
    hasRecentLoans: boolean | null;
    vehicleOwnershipStatus: string;
    vehicleMileage: string;
  };
  agreementInfo: {
    agreedToTerms: boolean;
  };
}

interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    [key: string]: unknown;
  };
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Set up a base URL for our backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002/api';
export const EXTERNAL_API_BASE_URL = import.meta.env.VITE_EXTERNAL_API_BASE_URL || 'http://localhost:3001/api';

const API = axios.create({
    baseURL: API_BASE_URL
});

// Add request interceptor to include auth token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const signUp = async (formData: AuthCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
        console.log('📤 Sending signup request to:', `${API_BASE_URL}/auth/signup`);
        console.log('📤 Request data:', { email: formData.email, password: '[REDACTED]' });
        
        const response = await API.post('auth/signup', formData);
        console.log('📨 Signup response:', response.data);
        return { data: response.data };
    } catch (error: unknown) {
        const axiosError = error as { response?: { data?: unknown; status?: number } };
        console.error('🔥 Signup API error:', {
            status: axiosError.response?.status,
            data: axiosError.response?.data,
            fullError: error
        });
        
        return { 
            error: axiosError.response?.data as { message: string; error?: string } || { message: 'An unknown error occurred.' } 
        };
    }
};

export const signIn = async (credentials: AuthCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
        const response = await API.post('auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        return { data: response.data };
    } catch (error: unknown) {
        const axiosError = error as { response?: { data?: unknown } };
        return { error: axiosError.response?.data as { message: string } || { message: 'An unknown error occurred.' } };
    }
};

export const submitApplication = async (applicationData: LoanApplicationData): Promise<ApiResponse<{ id: string; message: string }>> => {
    try {
        const response = await API.post('application', applicationData);
        return { data: response.data };
    } catch (error: unknown) {
        const axiosError = error as { response?: { data?: unknown } };
        return { error: axiosError.response?.data as { message: string } || { message: 'An unknown error occurred.' } };
    }
};