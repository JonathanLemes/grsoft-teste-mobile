import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import AuthContext from '../../contexts/auth';
import { FaLessThan } from 'react-icons/fa';
import { Alert, Platform } from 'react-native';
import * as EmailValidator from 'email-validator';

interface Props {
   navigation: any
}

const SignUp: React.FC = (props: React.Component<Props> | any) => {
   const { signUp } = useContext(AuthContext);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

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

   const handleSignUp = async () => {
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

   return (
      <View>
         <ReturnButton onPress={() => props.navigation.navigate('SignIn')}><FaLessThan size={20} color={'#968EEB'} /></ReturnButton>
         <Image source={require('../../images/logo.png')} />
         <Title>GRFood</Title>
         <SignInView>
            <Input placeholder='nome completo' placeholderTextColor='#968EEB' value={name} onChangeText={(text) => setName(text)} />
            <Input placeholder='e-mail' placeholderTextColor='#968EEB' value={email} onChangeText={(text) => setEmail(text)} />
            <Input placeholder='senha' placeholderTextColor='#968EEB' value={password} secureTextEntry onChangeText={(text) => setPassword(text)} />
            <Input placeholder='confirmar senha' placeholderTextColor='#968EEB' value={confirmPassword} secureTextEntry onChangeText={(text) => setConfirmPassword(text)} />
            <ButtonSignUp onPress={() => handleSignUp()}><TextButtons>Cadastrar-se</TextButtons></ButtonSignUp>
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

const ButtonSignUp = styled.TouchableOpacity`
   background-color: #5C55B4;
   display: flex;
   align-items: center;
   justify-content: center;

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

export default SignUp;
