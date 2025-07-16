// In frontend/src/lib/api.ts
import axios from 'axios';

// Define the shape of our data for type safety
interface AuthCredentials {
  email?: string;
  password?: string;
}

// Set up a base URL for our backend
const API = axios.create({
    baseURL: 'http://localhost:3002/api' // Make sure this port matches your backend server
});

export const signUp = async (formData: AuthCredentials) => {
    try {
        const response = await API.post('auth/signup', formData);
        return { data: response.data };
    } catch (error: any) {
        return { error: error.response?.data || { message: 'An unknown error occurred.' } };
    }
};

export const signIn = async (credentials: AuthCredentials) => {
    try {
        const response = await API.post('auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        return { data: response.data };
    } catch (error: any) {
        return { error: error.response?.data || { message: 'An unknown error occurred.' } };
    }
};