import React from 'react';
import Categories from '../pages/Categories';
import Products from '../pages/Products';

import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
   <AppStack.Navigator>
      <AppStack.Screen name="Categories" component={Categories} options={{headerShown: false}} />
      <AppStack.Screen name="Products" component={Products} options={{headerShown: false}} />
   </AppStack.Navigator>
);

export default AppRoutes;
