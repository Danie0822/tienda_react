import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/customInput';
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/regresar';
const { width } = Dimensions.get('window');

const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <CustomFlecha />
            <Text style={styles.title}>Crea una cuenta</Text>
            <CustomTextInput
                placeholder="Nombre"
                keyboardType="default"
                nombre={nombre}
                setNombre={setNombre}
            />
            <CustomTextInput
                placeholder="Apellido"
                keyboardType="default"
                nombre={apellido}
                setNombre={setApellido}
            />
            <CustomTextInput
                placeholder="Correo"
                keyboardType="email-address"
                nombre={email}
                setNombre={setEmail}
            />
            <CustomTextInput
                placeholder="Telefono"
                keyboardType="default"
                nombre={telefono}
                setNombre={setTelefono}
            />
            <CustomTextInput
                placeholder="Contraseña"
                secureTextEntry
                nombre={password}
                setNombre={setPassword}
            />
            <CustomButton
                text="Continuar"
                onPress={handlePress}
            />
            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handlePress}>
                <Text style={styles.register}>Ya tienes una cuenta? <Text style={styles.registerLink}>Inicia sesión</Text></Text>
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
        marginTop: 95,
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    forgotPasswordContainer: {
        width: width - 40,
        alignItems: 'flex-start',
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

export default Registrar;
