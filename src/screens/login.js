import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/customInput';
import CustomButton from '../components/customButton';
import { authenticateUser, saveTokenToAsyncStorage } from '../controller/publica/login';
import { calculateAndLogSha256 } from '../controller/utilis/sha256';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const { width } = Dimensions.get('window');

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const navigation = useNavigation();

    const handleRecuperaciones = () => {
        navigation.navigate('Recuperacion');
    };

    const handlePress = async () => {
        try {
            // Guardar la IP en AsyncStorage
            if (ipAddress === '') { AsyncStorage.removeItem('ipAddress'); } else { await AsyncStorage.setItem('ipAddress', ipAddress); }
            const hashedPassword = await calculateAndLogSha256(password);
            const userData = await authenticateUser(email, hashedPassword);
            await saveTokenToAsyncStorage(userData);
            limpiarFormulario();
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const limpiarFormulario = () => {
        setEmail('');
        setPassword('');
        setIpAddress(''); // Limpiar el campo de IP
    };

    const handlePressRegistrar = () => {
        navigation.navigate('Registrar');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicia sesión</Text>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <CustomTextInput
                placeholder="Correo"
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <CustomTextInput
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <CustomTextInput
                placeholder="Dirección IP"
                keyboardType="default"
                value={ipAddress}
                onChangeText={text => setIpAddress(text)}
            />
            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleRecuperaciones}>
                <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
            </TouchableOpacity>
            <CustomButton
                text="Continuar"
                onPress={handlePress}
            />
            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handlePressRegistrar}>
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
