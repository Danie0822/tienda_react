import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/customInput';
import CustomButton from '../components/customButton';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleRecuperaciones = () => {
      navigation.navigate('Recuperacion');
    };
    const handlePress = () => {
       navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicia sesión</Text>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <CustomTextInput
                placeholder="Correo"
                keyboardType="email-address"
                nombre={email}
                setNombre={setEmail}
            />
            <CustomTextInput
                placeholder="Contraseña"
                secureTextEntry
                nombre={password}
                setNombre={setPassword}
            />
            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleRecuperaciones}>
                <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
            </TouchableOpacity>
            <CustomButton
                text="Continuar"
                onPress={handlePress}
            />
            <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.register}>No tienes una cuenta? <Text style={styles.registerLink}>Regístrate</Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 50,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 40,
    },
    forgotPasswordContainer: {
        width: width - 40,
        alignItems: 'flex-start',
    },
    forgotPassword: {
        alignSelf: 'flex-start',
        marginBottom: 20,
        color: '#000000',
        fontWeight: 'bold',
    },
    register: {
        alignSelf: 'flex-start',
        color: '#888',
    },
    registerLink: {
        alignSelf: 'flex-start',
        color: '#000000',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
