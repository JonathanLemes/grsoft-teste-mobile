import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

interface AuthContextData {
   signed: boolean,
   user: object | null,
   signIn(data: UserData): Promise<boolean>,
   signUp(data: SignUpData): Promise<boolean>,
   getCategories(): Promise<Category[]>,
   setUser: React.Dispatch<React.SetStateAction<object | null>>,
   getProducts(id: number): Promise<Product[]>
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
   token: string,
   userData: {
      name: string,
      email: string
   }
}

interface Category {
   name: string,
   url: string,
   id: number
}

interface Product {
   id: number,
   name: string,
   image_url: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
   const [user, setUser] = useState<object | null>(null);

   const tryToken = async (token: string) => {
      await api.authenticateToken(token).then(async () => {
         const user = await AsyncStorage.getItem('@GRSoftTeste:user');
         if (user) setUser(JSON.parse(user));
      }).catch(() => {
         setUser(null);
      });
   }

   const signIn = async (data: UserData): Promise<boolean> => {
      const response: ResponseAuth = await api.authUser(data);

      if (response.token === "error") return false;

      const { userData, token } = response;

      if (response) {
         await AsyncStorage.setItem('@GRSoftTeste:user', JSON.stringify({ name: userData.name, email: userData.email }));
         await AsyncStorage.setItem('@GRSoftTeste:token', token);

         setUser({ name: userData.name, email: userData.email });
         return true;
      }

      return false;
   }

   const signUp = async (data: SignUpData): Promise<boolean> => {
      return await api.createUser(data);
   }

   const getCategories = async (): Promise<Category[]> => {
      return await api.getCategories();
   }

   const getProducts = async (id: number): Promise<Product[]> => {
      return await api.getProducts(id);
   }

   useEffect(() => {
      async function loadStorageData() {
         const storageUser = await AsyncStorage.getItem('@GRSoftTeste:user');
         const storageToken = await AsyncStorage.getItem('@GRSoftTeste:token');

         if (storageUser && storageToken) {
            tryToken(storageToken);
         }
      }

      loadStorageData();
   }, []);

   return (
      <AuthContext.Provider value={{ signed: !!user, user, signIn, signUp, getCategories, setUser, getProducts }}>
         { children }
      </AuthContext.Provider>
   )
}

export default AuthContext;
