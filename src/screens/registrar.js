import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/customInput';
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/regresar';
import { useRegistrar } from '../controller/publica/registrarSave'; 

const { width } = Dimensions.get('window');
// Importar el hook de navegación
const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { registrarSave } = useRegistrar();

    const handlePress = () => {
        navigation.navigate('Login');
    };

    const handlePressRegistrar = async () => {
        const { success, message } = await registrarSave(nombre, apellido, email, telefono, password);
        if (success) {
            Alert.alert("Registro exitoso", "Tu cuenta ha sido creada con éxito", [
                { text: "OK", onPress: () => navigation.navigate('Login') }
            ]);
        } else {
            Alert.alert("Error", message);
        }
    };

    return (
        <View style={styles.container}>
            <CustomFlecha />
            <Text style={styles.title}>Crea una cuenta</Text>
            <CustomTextInput
                placeholder="Nombre"
                keyboardType="default"
                value={nombre}
                onChangeText={text => setNombre(text)}
            />
            <CustomTextInput
                placeholder="Apellido"
                keyboardType="default"
                value={apellido}
                onChangeText={text => setApellido(text)}
            />
            <CustomTextInput
                placeholder="Correo"
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <CustomTextInput
                placeholder="Telefono"
                keyboardType="default"
                value={telefono}
                onChangeText={text => setTelefono(text)}
            />
            <CustomTextInput
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <CustomButton
                text="Continuar"
                onPress={handlePressRegistrar}
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
