import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Animated, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './src/screens/login';
import RecuperacionScreen from './src/screens/recuperacion'; 
import Registrar from './src/screens/registrar'; 
import RecuContra from './src/screens/recuContra'; 
import RecuCodigoScreen from './src/screens/recuCodigo'; 
import Navigation from './src/navigation/navigation'; 
import DetalleProducto from './src/screens/detalleProducto';
import Carrito from './src/screens/carrito';
import EditPerfil from './src/screens/editarPerfil';
import Configuraciones from './src/screens/configuraciones';
import DetalleOrden from './src/screens/pedidosDetalle';
import AddressesScreen from './src/screens/dirreciones';
import RegistrarDirreciones from './src/screens/registrarDirreciones';
import EditDirrecion from './src/screens/editDirreciones';
import ExitoScreen from './src/screens/exito';
const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Usamos useRef para mantener el valor animado

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Simulamos una carga de recursos (ejemplo con setTimeout)
        setTimeout(() => {
          setAppIsReady(true);
        }, 3000); // Tiempo de carga simulado de 3 segundos (ajusta según sea necesario)

      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start(() => {
        setAnimationComplete(true);
      });
    }
  }, [appIsReady, fadeAnim]);

  if (!animationComplete) {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
          <Image
            source={require('./src/img/Logoe.png')}
            style={styles.logo}
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EditPerfil" component={EditPerfil} />
        <Stack.Screen name="Recuperacion" component={RecuperacionScreen} />
        <Stack.Screen name="RecuperacionCodigo" component={RecuCodigoScreen} />
        <Stack.Screen name="Home" component={Navigation}/>
        <Stack.Screen name="RecuContra" component={RecuContra}/>
        <Stack.Screen name="Registrar" component={Registrar}/>
        <Stack.Screen name="Configuraciones" component={Configuraciones}/>
        <Stack.Screen name="DetalleProducto" component={DetalleProducto}/>
        <Stack.Screen name="Carrito" component={Carrito}/>
        <Stack.Screen name="Addresses" component={AddressesScreen}/>
        <Stack.Screen name="EditDirrecion" component={EditDirrecion}/>
        <Stack.Screen name="RegistrarDirreciones" component={RegistrarDirreciones}/>
        <Stack.Screen name="DetalleOrden" component={DetalleOrden}/>
        <Stack.Screen name="ExitoScreen" component={ExitoScreen}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000', // Mismo color de fondo que la pantalla de inicio
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Ancho deseado
    height: 200, // Alto deseado
  },
});
