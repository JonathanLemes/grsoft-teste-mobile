import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/apiContexts';
import { Alert, Image, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import SizeContext from '../../contexts/sizeContexts';
//import Masonry from 'react-native-masonry';

interface Props {
   navigation: any,
   route: object
}

interface Product {
   id: number,
   name: string,
   image_url: string
}

const Products: React.FC = (props: React.Component<Props> | any) => {
   const { getProducts, setUser } = useContext(AuthContext);
   const { actuatedNormalize } = useContext(SizeContext);
   const [products, setProducts] = useState<Product[]>([]);
   const [foundProducts, setFoundProducts] = useState<Product[]>([]);
   const [search, setSearch] = useState('');

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

   const renderProductItem = (product: Product, index: number) => {
      let margin = index % 2 !== 0 ? 'marginLeft' : 'marginRight';

      return (
         <View style={{...styles.viewProductItem, [margin]: -vw(2.5)}} key={product.id}>
            <View style={styles.viewProductName}>
               <Text style={{...styles.textProductName, fontSize: actuatedNormalize(14)}}>{product.name}</Text>
            </View>
            <Image style={styles.imageProduct} source={{ uri: product.image_url }} />
         </View>
      )
   }

   useEffect(() => {
      if (search !== '') {
         let newProducts: Product[] = [];
         products.map((product) => {
            if (product.name.toLowerCase().includes(search.toLowerCase())) {
               newProducts.push(product);
            }
         });

         setFoundProducts(newProducts);
      } else {
         setFoundProducts(products);
      }
   }, [search]);

   useEffect(() => {
      getProducts(props.route.params.categoryId).then((products) => {
         setProducts(products);
         setFoundProducts(products);
      }).catch((error) => {
         showAlert('Erro ao carregar os produtos', error.message);
         setUser(null);
      })
   }, [])

   if (products.length === 0) {
      return (
         <View style={styles.view}>
            <TouchableOpacity style={styles.returnButton} onPress={() => props.navigation.navigate('Categories')}><Text style={{...styles.returnText, fontSize: actuatedNormalize(30)}}>{'<'}</Text></TouchableOpacity>
            <Image style={styles.image} source={require('../../images/logo.png')} />
            <View style={{...styles.viewProductsContainer, justifyContent: 'center'}}>
               <ActivityIndicator size="large" color="#5C55B4" />
            </View>
         </View>
      );
   }

   return (
      <View style={styles.view}>
         <TouchableOpacity style={styles.returnButton} onPress={() => props.navigation.navigate('Categories')}><Text style={{...styles.returnText, fontSize: actuatedNormalize(30)}}>{'<'}</Text></TouchableOpacity>
         <Image style={styles.image} source={require('../../images/logo.png')} />
         <View style={styles.viewProductsContainer}>
            <TextInput style={styles.textInput} placeholder='Pesquisar' placeholderTextColor='#968EEB' value={search} onChangeText={(text) => setSearch(text)} />
            <View style={styles.viewProductsList}>
               <View style={styles.viewProducts}>
                  {foundProducts.map((product, index) => {
                     if (index % 2 === 0) {
                        return renderProductItem(product, index);
                     }
                  })}
               </View>
               <View style={styles.viewProducts}>
                  {foundProducts.map((product, index) => {
                     if (index % 2 !== 0) {
                        return renderProductItem(product, index);
                     }
                  })}
               </View>
            </View>
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

   returnImage: {
      width: vw(8),
      height: vw(8),
      marginLeft: -vw(1)
   },

   image: {
      width: vw(15),
      height: vw(15),
      marginTop: vh(10)
   },

   viewProductsContainer: {
      flex: 1,
      position: 'absolute',
      backgroundColor: '#fdfdfd',
      alignItems: 'center',
      justifyContent: 'flex-start',

      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      width: vw(100),
      height: vh(85),
      bottom: 0
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

   viewProductsList: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',

      paddingTop: vh(3),
      width: vw(100)
   },

   viewProducts: {
      alignItems: 'center',
      justifyContent: 'center',

      width: vw(50)
   },

   viewProductsItems: {
      alignItems: 'center',
      justifyContent: 'center',

      width: vw(50)
   },

   viewProductItem: {
      paddingBottom: vh(1),
      borderRadius: 15,
      overflow: 'hidden'
   },

   viewProductName: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5C55B4',

      height: vh(5)
   },

   textProductName: {
      //fontFamily: 'Poppins-SemiBold',
      fontWeight: '600',
      color: '#fff',
      textAlign: 'center'
   },

   text: {
      //fontFamily: 'Poppins-SemiBold',
      fontWeight: '600',
      color: '#5C55B4',
      textAlign: 'center',

      paddingBottom: vh(3),
      width: vw(70)
   },

   imageProduct: {
      width: vw(46),
      height: vh(15)
   }
});

export default Products;
