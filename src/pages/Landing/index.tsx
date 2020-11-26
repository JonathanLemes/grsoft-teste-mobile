import React from 'react';
import styled from 'styled-components/native';

interface Props {
   navigation: any
}


const Landing: React.FC = (props: React.Component<Props> | any) => {
   return (
      <View>
         <ViewImage>
            <Image source={require('../../images/landing.png')} />
         </ViewImage>
         <Title>GRFood</Title>
         <Subtitle>Turbine suas vendas com o GRFood Delivery</Subtitle>
         <Button onPress={() => props.navigation.navigate('SignIn')}><ButtonText>VER PRODUTOS</ButtonText></Button>
      </View>
   )
}

const View = styled.View`
   display: flex;
   align-items: flex-start;
   justify-content: center;

   background-color: #968EEB;
   width: 100vw;
   height: 100vh;
`;

const Image = styled.Image`
   width: 80vw;
   height: 60vw;
`;

const ViewImage = styled.View`
   display: flex;
   align-items: flex-end;
   justify-content: center;

   filter: drop-shadow(5px 5px 35px rgba(0, 0, 0, 0.25));
   width: 100vw;
   padding-bottom: 6vh;
`;

const Title = styled.Text`
   font-family: 'Poppins-SemiBold';
   font-weight: 600;
   color: white;

   padding-left: 8vw;
   padding-bottom: 3vh;
   font-size: 5rem;
`;

const Subtitle = styled.Text`
   font-family: 'Poppins-Regular';
   color: white;

   font-weight: 400;
   padding-bottom: 3vh;
   padding-left: 8vw;
   font-size: 1.5rem;
`;

const Button = styled.TouchableOpacity`
   background: #514B96;
   color: white;
   display: flex;
   align-items: center;
   justify-content: center;

   font-weight: 600;
   border-radius: 30px;
   margin-left: 8vw;
   width: 50vw;
   height: 17vw;
`

const ButtonText = styled.Text`
   font-family: 'Poppins-Semibold';
   color: white;

   font-size: 1.25rem;
   font-weight: 600;
`;

export default Landing;
