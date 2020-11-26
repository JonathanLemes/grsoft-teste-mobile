import React, { useContext } from 'react';
import { View } from 'react-native';
import AuthContext from '../../contexts/auth';

interface UserData {
   email: string;
   password: string;
}

const SignIn: React.FC = () => {
   const { signed, signIn } = useContext(AuthContext);

   const handleSignIn = (data: UserData) => {
      signIn(data);
   };

   return (
      <View />
   )
}

export default SignIn;
