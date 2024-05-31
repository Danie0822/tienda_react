import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './src/screens/login';
import RecuperacionScreen from './src/screens/recuperacion'; 
import Registrar from './src/screens/registrar'; 
import RecuContra from './src/screens/recuContra'; 
import RecuCodigoScreen from './src/screens/recuCodigo'; 
import Navigation from './src/navigation/navigation'; 
import DetalleProducto from './src/screens/detalleProducto';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Recuperacion" component={RecuperacionScreen} />
          <Stack.Screen name="RecuperacionCodigo" component={RecuCodigoScreen} />
          <Stack.Screen name="Home" component={Navigation}/>
          <Stack.Screen name="RecuContra" component={RecuContra}/>
          <Stack.Screen name="Registrar" component={Registrar}/>
          <Stack.Screen name="DetalleProducto" component={DetalleProducto}/>
        </Stack.Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
