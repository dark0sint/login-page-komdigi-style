import { useState } from 'react';
import { LoginFormData, AuthResponse, AuthError } from '../types/auth';
import { AuthService } from '../services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (formData: LoginFormData): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(formData);
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      setLoading(false);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token;
  };

  return {
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
    loading,
    error,
    setError,
  };
};
