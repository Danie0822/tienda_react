import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/customInput';
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/regresar';
import { useRegistrar } from '../controller/publica/agregarDirrecion';

const { width } = Dimensions.get('window');
// Importar el hook de navegación
const RegistrarDirreciones = () => {
    const [nombre, setNombre] = useState('');
    const [direccion, setdireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [codigo, setcodigo] = useState('');
    const [instruciones, setinstruciones] = useState('');
    const navigation = useNavigation();
    const { registrarSave } = useRegistrar();

    const handlePress = () => {
        navigation.navigate('Login');
    };

    const handlePressRegistrar = async () => {
        const { success, message } = await registrarSave(nombre, direccion, codigo, telefono, instruciones);
        if (success) {
            Alert.alert("Registro exitoso", "Dirrecion agregada ", [
                { text: "OK", onPress: () => navigation.navigate('Addresses') }
            ]);
        } else {
            Alert.alert("Error", message);
        }
    };

    return (
        <View style={styles.container}>
            <CustomFlecha />
            <Text style={styles.title}>Editar dirrecion</Text>
            <CustomTextInput
                placeholder="Nombre Dirrecion"
                keyboardType="default"
                value={nombre}
                onChangeText={text => setNombre(text)}
            />
            <CustomTextInput
                placeholder="Descripcion de la dirrecion"
                keyboardType="default"
                value={direccion}
                onChangeText={text => setdireccion(text)}
            />
            <CustomTextInput
                placeholder="Codigo postal"
                keyboardType="default"
                value={codigo}
                onChangeText={text => setcodigo(text)}
            />
            <CustomTextInput
                placeholder="Telefono"
                keyboardType="default"
                value={telefono}
                onChangeText={text => setTelefono(text)}
            />
            <CustomTextInput
                placeholder="Instruciones"
                keyboardType="default"
                value={instruciones}
                onChangeText={text => setinstruciones(text)}
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

export default RegistrarDirreciones;
