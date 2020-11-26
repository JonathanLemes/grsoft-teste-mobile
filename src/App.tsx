import React from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';

export default function App() {
  return (
      <NavigationContainer>
         <AuthProvider>
            <Routes />
         </AuthProvider>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
});
