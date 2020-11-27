import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/apiContexts';
import { Alert, Image, Platform, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as EmailValidator from 'email-validator';
import { vw, vh } from 'react-native-expo-viewport-units';
import SizeContext from '../../contexts/sizeContexts';

interface Props {
   navigation: any
}

interface Category {
   name: string,
   url: string
}

const Categories: React.FC = (props: React.Component<Props> | any) => {
   const { getCategories, setUser } = useContext(AuthContext);
   const { actuatedNormalize } = useContext(SizeContext);
   const [categories, setCategories] = useState<Category[]>([]);

   const showAlert = (alertTitle: string, alertText: string) => {
      if (Platform.OS === 'web') alert(`${alertTitle}: ${alertText}`);
      else {
         Alert.alert(
            alertTitle,
            alertText,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
         );
      }
   }

   const handleLogOut = () => {
      setUser(null);
   }

   useEffect(() => {
      getCategories().then((categories) => {
         setCategories(categories);
      }).catch((error) => {
         showAlert('Não foi possível carregar as categorias, tente reiniciar o aplicativo', error.message);
      });
   }, []);

   if (categories.length === 0) {
      return (
         <View style={styles.view}>
            <Image style={styles.image} source={require('../../images/logo.png')} />
            <Text style={{...styles.title, fontSize: actuatedNormalize(38)}}>GRFood</Text>
            <View style={styles.viewCategories}>
               <ActivityIndicator size="large" color="#5C55B4" />
            </View>
         </View>
      )
   }

   return (
      <View style={styles.view}>
         <TouchableOpacity style={styles.returnButton} onPress={() => handleLogOut()}><Image style={styles.returnImage} source={require('../../images/logout.png')} /></TouchableOpacity>
         <Image style={styles.image} source={require('../../images/logo.png')} />
         <Text style={{...styles.title, fontSize: actuatedNormalize(38)}}>GRFood</Text>
         <View style={styles.viewCategories}>
            <Text style={{...styles.text, fontSize: actuatedNormalize(20)}}>Qual categoria de produto você deseja ver agora?</Text>
            {categories.map((category, index) => {
               if (index % 2 === 0) return (<TouchableOpacity key={category.url} style={{...styles.buttons, backgroundColor: '#5C55B4'}}><Text style={{...styles.textButtons, fontSize: actuatedNormalize(13)}}>{category.name}</Text></TouchableOpacity>)
               else return (<TouchableOpacity key={category.url} style={{...styles.buttons, backgroundColor: '#9189E4'}}><Text style={{...styles.textButtons, fontSize: actuatedNormalize(13)}}>{category.name}</Text></TouchableOpacity>)
            })}
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',

      backgroundColor: '#968EEB',
      width: vw(100),
      height: vh(100)
   },

   returnButton: {
      backgroundColor: '#fdfdfd',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',

      borderRadius: 15,
      width: vw(15),
      height: vw(15),
      top: vh(6),
      left: vw(6),

      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6
   },

   returnImage: {
      width: vw(8),
      height: vw(8),
      marginLeft: -vw(1)
   },

   image: {
      width: vw(10),
      height: vw(15),
      marginTop: vh(10)
   },

   title: {
      //fontFamily: 'Poppins-SemiBold',
      fontWeight: '600',
      color: 'white',

      paddingBottom: vh(3)
   },

   viewCategories: {
      flex: 1,
      position: 'absolute',
      backgroundColor: '#fdfdfd',
      alignItems: 'center',
      justifyContent: 'center',

      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      width: vw(100),
      height: vh(75),
      bottom: 0
   },

   text: {
      //fontFamily: 'Poppins-SemiBold',
      fontWeight: '600',
      color: '#5C55B4',
      textAlign: 'center',

      paddingBottom: vh(3),
      width: vw(70)
   },

   buttons: {
      justifyContent: 'center',
      alignItems: 'center',

      marginTop: vh(3),
      borderRadius: 15,
      width: vw(70),
      height: vw(13),
      paddingLeft: vw(8),
      paddingRight: vw(8),
   },

   textButtons: {
      textAlign: 'center',
      color: '#fdfdfd',

      fontWeight: '600'
   }
});

export default Categories;
