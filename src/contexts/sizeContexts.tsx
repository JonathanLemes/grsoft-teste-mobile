import React, { createContext, useState } from 'react';
import { Dimensions, Platform, PixelRatio } from 'react-native';

interface SizeContextData {
   actuatedNormalize(size: number): number;
}

const SizeContext = createContext<SizeContextData>({} as SizeContextData);

export const SizeProvider: React.FC = ({ children }) => {
   const {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
   } = Dimensions.get('window');

   // based on iphone 5s's scale
   const scale = SCREEN_WIDTH / 320   ;

   const actuatedNormalize = (size: number): number => {
   const newSize = size * scale;
   if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
   } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
   }
   }

   return (
      <SizeContext.Provider value={{ actuatedNormalize }}>
         { children }
      </SizeContext.Provider>
   )
}

export default SizeContext;
