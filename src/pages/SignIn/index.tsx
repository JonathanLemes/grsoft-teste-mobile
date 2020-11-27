import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/apiContexts';
import { Alert, Image, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import SizeContext from '../../contexts/sizeContexts';

interface Props {
   navigation: any
}

const SignIn: React.FC = (props: React.Component<Props> | any) => {
   const { signIn } = useContext(AuthContext);
   const { actuatedNormalize } = useContext(SizeContext);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const showAlert = (alertTitle: string, alertText: string) => {
      setIsLoading(false);
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

   const handleSignIn = async () => {
      setIsLoading(true);

      if (email === '' || password === '') {
         showAlert('Erro', 'Todos os dados são obrigatórios');
         return;
      }

      const success: boolean = await signIn({
         email,
         password
      });

      if (!success) {
         showAlert('Erro', 'Falha na autenticação');
      }
   };

   if (isLoading) {
      return (
         <View style={styles.view}>
            <TouchableOpacity style={styles.returnButton} onPress={() => props.navigation.navigate('Landing')}><Text style={{...styles.returnText, fontSize: actuatedNormalize(30)}}>{'<'}</Text></TouchableOpacity>
            <Image style={styles.image} source={require('../../images/logo.png')} />
            <Text style={{...styles.title, fontSize: actuatedNormalize(55)}}>GRFood</Text>
            <View style={styles.viewSign}>
               <ActivityIndicator size="large" color="#5C55B4" />
            </View>
         </View>
      );
   }

   return (
      <View style={styles.view}>
         <TouchableOpacity style={styles.returnButton} onPress={() => props.navigation.navigate('Landing')}><Text style={{...styles.returnText, fontSize: actuatedNormalize(30)}}>{'<'}</Text></TouchableOpacity>
         <Image style={styles.image} source={require('../../images/logo.png')} />
         <Text style={{...styles.title, fontSize: actuatedNormalize(55)}}>GRFood</Text>
         <View style={styles.viewSign}>
            <Text style={{...styles.text, fontSize: actuatedNormalize(18)}}>Faça login para conferir os nossos produtos!</Text>
            <TextInput style={styles.textInput} placeholder='exemplo@grfood.com.br' placeholderTextColor='#968EEB' value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput style={styles.textInput} placeholder='*****' placeholderTextColor='#968EEB' value={password} secureTextEntry onChangeText={(text) => setPassword(text)} />
            <TouchableOpacity style={{...styles.buttons, backgroundColor: '#5C55B4'}} onPress={() => handleSignIn()}><Text style={{...styles.textButtons, fontSize: actuatedNormalize(13)}}>Login</Text></TouchableOpacity>
            <TouchableOpacity style={{...styles.buttons, backgroundColor: '#9189E4'}} onPress={() => props.navigation.navigate('SignUp')}><Text style={{...styles.textButtons, fontSize: actuatedNormalize(13)}}>Não possui login? Cadastre-se!</Text></TouchableOpacity>
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

   returnText: {
      color: '#5C55B4',
      //fontFamily: 'Poppins-SemiBold',
      fontWeight: '600'
   },

   image: {
      width: vw(25),
      height: vw(25),
      marginTop: vh(10)
   },

   title: {
      //fontFamily: 'Poppins-SemiBold',
      fontWeight: '600',
      color: 'white',

      paddingBottom: vh(3)
   },

   viewSign: {
      flex: 1,
      position: 'absolute',
      backgroundColor: '#fdfdfd',
      alignItems: 'center',
      justifyContent: 'center',

      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      width: vw(100),
      height: vh(65),
      bottom: 0
   }
,
   text: {
      //fontFamily: 'Poppins-SemiBold',
      fontWeight: '600',
      color: '#5C55B4',
      textAlign: 'center',

      paddingBottom: vh(3),
      width: vw(70)
   },

   textInput: {
      backgroundColor: '#FFFFFF',
      color: '#5C55B4',
      textAlign: 'center',

      borderColor: '#5C55B4',
      borderWidth: 3,
      fontWeight: '600',
      marginTop: vh(3),
      borderRadius: 15,
      width: vw(70),
      height: vw(13)
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

export default SignIn;
