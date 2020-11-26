import React, { createContext, useState } from 'react';
import api from '../services/api';

interface AuthContextData {
   signed: boolean,
   user: object | null,
   signIn(data: UserData): Promise<void>
}

interface UserData {
   email: string;
   password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
   const [user, setUser] = useState<object | null>(null);

   const signIn = async (data: UserData) => {
      const response = await api.authUser(data);

      const { name, email } = response;

      setUser({ name, email });
   }

   return (
      <AuthContext.Provider value={{ signed: !!user, user, signIn}}>
         { children }
      </AuthContext.Provider>
   )
}

export default AuthContext;
