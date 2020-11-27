import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/apiContexts';
import { Alert, Image, Platform, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as EmailValidator from 'email-validator';
import { vw, vh } from 'react-native-expo-viewport-units';
import SizeContext from '../../contexts/sizeContexts';

interface Props {
   navigation: any
}

const SignUp: React.FC = (props: React.Component<Props> | any) => {
   const { signUp } = useContext(AuthContext);
   const { actuatedNormalize } = useContext(SizeContext);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
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

   const handleSignUp = async () => {
      setIsLoading(true);

      // Confirmações
      if (name === '' || email === '' || password === '' || confirmPassword === '') {
         showAlert('Erro', 'Todos os dados são obrigatórios');
         return;
      }

      if (!EmailValidator.validate(email)) {
         showAlert('Erro', 'Insira um e-mail válido');
         return;
      }

      if (password !== confirmPassword) {
         showAlert('Erro', 'As senhas não correspondem');
         return;
      }

      // Cadastro
      const signedUp: boolean = await signUp({
         name,
         email,
         password
      });

      if (!signedUp) {
         showAlert('Erro', 'Não foi possível concluir o cadastro');
         return;
      }

      showAlert('Usuário cadastrado', 'Realize o login para confirmação');
      props.navigation.navigate('SignIn');
   };

   if (isLoading) {
      return (
         <View style={styles.view}>
            <TouchableOpacity style={styles.returnButton} onPress={() => props.navigation.navigate('SignIn')}><Text style={{...styles.returnText, fontSize: actuatedNormalize(30)}}>{'<'}</Text></TouchableOpacity>
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
         <TouchableOpacity style={styles.returnButton} onPress={() => props.navigation.navigate('SignIn')}><Text style={{...styles.returnText, fontSize: actuatedNormalize(30)}}>{'<'}</Text></TouchableOpacity>
         <Image style={styles.image} source={require('../../images/logo.png')} />
         <Text style={{...styles.title, fontSize: actuatedNormalize(55)}}>GRFood</Text>
         <View style={styles.viewSign}>
            <TextInput style={styles.textInput} placeholder='nome completo' placeholderTextColor='#968EEB' value={name} onChangeText={(text) => setName(text)} />
            <TextInput style={styles.textInput} placeholder='e-mail' placeholderTextColor='#968EEB' value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput style={styles.textInput} placeholder='senha' placeholderTextColor='#968EEB' value={password} secureTextEntry onChangeText={(text) => setPassword(text)} />
            <TextInput style={styles.textInput} placeholder='confirmar senha' placeholderTextColor='#968EEB' value={confirmPassword} secureTextEntry onChangeText={(text) => setConfirmPassword(text)} />
            <TouchableOpacity style={{...styles.buttons, backgroundColor: '#5C55B4'}} onPress={() => handleSignUp()}><Text style={{...styles.textButtons, fontSize: actuatedNormalize(13)}}>Cadastrar-se</Text></TouchableOpacity>
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
      fontWeight: '600',

      fontSize: 30
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

      paddingBottom: vh(3),
      fontSize: 80
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
      fontSize: 24,
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

export default SignUp;
