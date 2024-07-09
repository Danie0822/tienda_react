import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Importancion de pantallas
import Home from '../screens/home';
import PedidosScreen from '../screens/pedidos';
import Configuracion from '../screens/configuraciones';

//Variable para usar la libreria
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                tabBarActiveTintColor: 'purple'
            }}>
            <Tab.Screen
                name="HomeTab"
                component={Home}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home-outline" size={24} color="black" />
                    ),
                    headerShown: false,
                }} />
            <Tab.Screen
                name="OrdeTab"
                component={PedidosScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="notebook-edit" size={24} color="black" />
                    ),
                    headerShown: false,
                }} />
            <Tab.Screen
                name="ProfileTab"
                component={Configuracion}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-settings" size={24} color="black" />
                    ),
                    headerShown: false,
                }} />
        </Tab.Navigator>
    );
};

export default MyTabs;

