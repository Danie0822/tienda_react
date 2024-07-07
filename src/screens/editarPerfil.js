import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/customInput';
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/regresar';
import { usePerfil } from '../controller/publica/editarPerfil'; 
import { fetchInfoCliente } from '../controller/publica/configuraciones';

const { width } = Dimensions.get('window');

const EditPerfil = () => {
    const { infoCliente } = fetchInfoCliente();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    const { registrarEdit } = usePerfil();

    const fetchData = async () => {
        try {
            const response = await infoCliente();
            if (response.success) {
                const user = response.data[0];
                setNombre(user.nombre_cliente);
                setApellido(user.apellido_cliente);
                setTelefono(user.telefono_cliente);
                setEmail(user.correo_cliente);
            } else {
                Alert.alert('Error al cargar:', 'No se pudo cargar la información del cliente.');
            }
        } catch (error) {
            Alert.alert('Error al cargar', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const handlePressRegistrar = async () => {
        const { success, message } = await registrarEdit(nombre, apellido, email, telefono);
        if (success) {
            Alert.alert("Registro exitoso", "Tu cuenta ha sido creada con éxito", [
                { text: "OK", onPress: () => navigation.navigate('Configuraciones') }
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
            <CustomButton
                text="Continuar"
                onPress={handlePressRegistrar}
            />
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

export default EditPerfil;
