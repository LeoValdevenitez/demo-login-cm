import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registrationData: RegistrationData | null;
  updateRegistrationData: (data: Partial<RegistrationData>) => void;
  resetRegistrationData: () => void;
}

export interface RegistrationData {
  selfieImage: string | null;
  idFrontImage: string | null;
  idBackImage: string | null;
  email: string;
  password: string;
}

const initialRegistrationData: RegistrationData = {
  selfieImage: null,
  idFrontImage: null,
  idBackImage: null,
  email: '',
  password: '',
};

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(initialRegistrationData);

  const login = async (email: string, password: string) => {
    // Simular una llamada a API de login
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          setIsAuthenticated(true);
          resolve();
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData((prev) => {
      if (!prev) return { ...initialRegistrationData, ...data };
      return { ...prev, ...data };
    });
  };

  const resetRegistrationData = () => {
    setRegistrationData(initialRegistrationData);
  };

  return (
    <UserAuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        registrationData,
        updateRegistrationData,
        resetRegistrationData,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};