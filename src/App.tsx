import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import { AuthProvider } from './contexts/apiContexts';
import { SizeProvider } from './contexts/sizeContexts';

export default function App() {
  return (
      <NavigationContainer>
         <AuthProvider>
            <SizeProvider>
               <Routes />
            </SizeProvider>
         </AuthProvider>
      </NavigationContainer>
  );
}
