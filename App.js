
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import HomeScreen from './home';
 import GameScreen from './Jogo';

 const Stack = createNativeStackNavigator();

 function App() {
     return (
     <NavigationContainer>
         <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Game'
          options={{
            title: 'Início',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'blue'},
          }} 
          component={GameScreen} /> 
          <Stack.Screen name='Home' 
          options={{
            title: 'Pegue o Coelho',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'tomato'},
            }}
          component={HomeScreen} /> 
         </Stack.Navigator>
     </NavigationContainer>
     );
 }

 export default App;