import React, { createContext, useState } from 'react';
import api from '../services/api';

interface AuthContextData {
   signed: boolean,
   user: object | null,
   signIn(data: UserData): Promise<boolean>
}

interface UserData {
   email: string;
   password: string;
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
      console.log(response);

      if (response.token === "error") return false;

      const { name, email } = response;

      if (response) {
         setUser({ name, email });
         return true;
      }

      return false;
   }

   return (
      <AuthContext.Provider value={{ signed: !!user, user, signIn}}>
         { children }
      </AuthContext.Provider>
   )
}

export default AuthContext;
