import React, { createContext, useState } from 'react';
import api from '../services/api';

interface AuthContextData {
   signed: boolean,
   user: object | null,
   signIn(data: UserData): Promise<boolean>,
   signUp(data: SignUpData): Promise<boolean>
}

interface UserData {
   email: string,
   password: string
}

interface SignUpData {
   name: string,
   email: string,
   password: string
}

interface ResponseAuth {
   name: string,
   email: string,
   token: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
   const [user, setUser] = useState<object | null>(null);

   const signIn = async (data: UserData): Promise<boolean> => {
      const response: ResponseAuth = await api.authUser(data);

      if (response.token === "error") return false;

      const { name, email } = response;

      if (response) {
         setUser({ name, email });
         return true;
      }

      return false;
   }

   const signUp = async (data: SignUpData): Promise<boolean> => {
      return await api.createUser(data);
   }

   return (
      <AuthContext.Provider value={{ signed: !!user, user, signIn, signUp}}>
         { children }
      </AuthContext.Provider>
   )
}

export default AuthContext;
