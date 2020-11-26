import React from 'react';
import Landing from '../pages/Landing';

import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
   <AppStack.Navigator>
      <AppStack.Screen name="Landing" component={Landing} />
   </AppStack.Navigator>
);

export default AppRoutes;
