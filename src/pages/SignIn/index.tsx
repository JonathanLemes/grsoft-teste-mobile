import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import AuthContext from '../../contexts/auth';
import { FaLessThan } from 'react-icons/fa';
import { Alert, Platform } from 'react-native';

interface Props {
   navigation: any
}

interface UserData {
   email: string;
   password: string;
}

const SignIn: React.FC = (props: React.Component<Props> | any) => {
   const { signIn } = useContext(AuthContext);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

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

   const handleSignIn = async () => {
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

   return (
      <View>
         <ReturnButton onPress={() => props.navigation.navigate('Landing')}><FaLessThan size={20} color={'#968EEB'} /></ReturnButton>
         <Image source={require('../../images/logo.png')} />
         <Title>GRFood</Title>
         <SignInView>
            <Text>Faça login para conferir os nossos produtos!</Text>
            <Input placeholder='exemplo@grfood.com.br' placeholderTextColor='#968EEB' value={email} onChangeText={(text) => setEmail(text)} />
            <Input placeholder='*****' placeholderTextColor='#968EEB' value={password} secureTextEntry onChangeText={(text) => setPassword(text)} />
            <ButtonSignIn onPress={() => handleSignIn()}><TextButtons>Login</TextButtons></ButtonSignIn>
            <ButtonSignUp onPress={() => props.navigation.navigate('SignUp')}><TextButtons>Não possui login? Cadastre-se!</TextButtons></ButtonSignUp>
         </SignInView>
      </View>
   )
}

const View = styled.View`
   display: flex;
   align-items: center;
   justify-content: flex-start;
   background-color: #968EEB;

   width: 100vw;
   height: 100vh;
`;

const Image = styled.Image`
   width: 25vw;
   height: 25vw;
   margin-top: 5vh;
`;

const Title = styled.Text`
   font-family: 'Poppins-SemiBold';
   color: white;

   font-weight: 600;
   font-size: 4em;
`;

const SignInView = styled.View`
   position: absolute;
   background-color: #fdfdfd;
   display: flex;
   align-items: center;
   justify-content: center;

   border-top-left-radius: 60px;
   border-top-right-radius: 60px;
   width: 100vw;
   height: 65vh;
   bottom: 0;
`;

const ReturnButton = styled.TouchableOpacity`
   background: #fdfdfd;
   display: flex;
   align-items: center;
   justify-content: center;
   position: absolute;

   box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.25);
   border-radius: 15px;
   width: 15vw;
   height: 15vw;
   top: 5vw;
   left: 5vw;
`

const Text = styled.Text`
   font-family: 'Poppins-SemiBold';
   color: #5C55B4;
   text-align: center;

   font-weight: 600;
   font-size: 1.25em;
   width: 70vw;
`;

const Input = styled.TextInput`
   background-color: #FFFFFF;
   color: #5C55B4;
   text-align: center;

   border: 3px solid #5C55B4;
   font-weight: 600;
   margin-top: 3vh;
   border-radius: 15px;
   width: 70vw;
   height: 13vw;
`;

const TextButtons = styled.Text`
   text-align: center;
   color: #fdfdfd;

   font-weight: 600;
`;

const ButtonSignIn = styled.TouchableOpacity`
   background-color: #5C55B4;
   display: flex;
   align-items: center;
   justify-content: center;

   margin-top: 3vh;
   border-radius: 15px;
   width: 70vw;
   height: 13vw;
`;

const ButtonSignUp = styled.TouchableOpacity`
   background-color: #9189E4;
   display: flex;
   align-items: center;
   justify-content: center;

   margin-top: 3vh;
   border-radius: 15px;
   width: 70vw;
   height: 13vw;
`;

export default SignIn;
