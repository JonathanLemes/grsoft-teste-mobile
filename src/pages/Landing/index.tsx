import React, { useContext } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import SizeContext from '../../contexts/sizeContexts';

interface Props {
   navigation: any
}

const Landing: React.FC = (props: React.Component<Props> | any) => {
   const { actuatedNormalize } = useContext(SizeContext);

   return (
      <View style={styles.view}>
         <View style={styles.viewImage}>
            <Image style={styles.image} source={require('../../images/landing.png')} />
         </View>
         <View style={styles.viewText}>
            <Text style={{...styles.title, fontSize: actuatedNormalize(55)}}>GRFood</Text>
            <Text style={{...styles.subTitle, fontSize: actuatedNormalize(18)}}>Turbine suas vendas com o GRFood Delivery</Text>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('SignIn')}><Text style={{...styles.buttonText, fontSize: actuatedNormalize(15)}}>VER PRODUTOS</Text></TouchableOpacity>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   view: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',

      backgroundColor: '#968EEB',
      width: vw(100),
      height: vh(100),
      paddingTop: vh(15),
      paddingBottom: vh(15)
   },

   image: {
      width: vw(80),
      height: vw(60)
   },

   viewImage: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',

      width: vw(100)
   },

   viewText: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',

      width: vw(100)
   },

   title: {
      //fontFamily: 'Poppins-SemiBold',
      fontWeight: '600',
      color: 'white',

      paddingLeft: vw(8),
      paddingBottom: vh(3)
   },

   subTitle: {
      //fontFamily: 'Poppins-Regular',
      color: 'white',

      fontWeight: '400',
      paddingBottom: vh(3),
      paddingLeft: vw(8)
   },

   button: {
      backgroundColor: '#514B96',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',

      fontWeight: '600',
      borderRadius: 30,
      marginLeft: vw(8),
      width: vw(50),
      height: vw(17)
   },

   buttonText: {
      //fontFamily: 'Poppins-SemiBold',
      color: 'white',
      fontWeight: '600'
   }
});

export default Landing;
