
 import { View, Text, Image, TouchableOpacity } from 'react-native';
 import { useFonts } from 'expo-font';

 function HomeScreen({navigation}) {
    const [fontsLoaded] = useFonts({
        'Irish': require('./assets/fonts/Irish.ttf'),
    });
     return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightyellow' }}>
         <Image 
           source={require('./assets/bunny1.png')} 
           style = {{width: 200, height: 200, marginBotton: 20}}
           />
         <Text style={{color: 'tomato', fontSize: 20}}>Você consegue me tocar?</Text>
         <Text style={{color: 'tomato', fontSize: 20}}>Vou aparecer rapidamente na tela!</Text>
         <Text style={{color: 'tomato', fontSize: 20, marginTop:50}}>A cada 10 acertos será mais rápido...</Text>

         <TouchableOpacity onPress={() => navigation.navigate('Game')}>
            <Text style={{color: 'purple', fontSize: 78, marginTop:50, fontFamily: 'Irish',}}>
                Jogar
            </Text>
         </TouchableOpacity>
     </View>
     );
 }

 export default HomeScreen;