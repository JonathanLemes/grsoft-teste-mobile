import React from 'react';
import Landing from '../pages/Landing';
import Categories from '../pages/Categories';

import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
   <AppStack.Navigator>
      <AppStack.Screen name="Categories" component={Categories} options={{headerShown: false}} />
   </AppStack.Navigator>
);

export default AppRoutes;
