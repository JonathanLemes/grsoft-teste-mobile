import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import Landing from '../pages/Landing';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
   <AuthStack.Navigator>
      <AuthStack.Screen name="Landing" component={Landing} options={{headerShown: false}} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
   </AuthStack.Navigator>
);

export default AuthRoutes;
