import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/customInput';
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/regresar';
import { useDirrecion } from '../controller/publica/editDirreciones'; 
import { fetchInfo } from '../controller/publica/cargardDirrecionesEdit';

const { width } = Dimensions.get('window');

const EditDirrecion  = () => {
    const { infoCliente } = fetchInfo();
    const [nombre, setNombre] = useState('');
    const [direccion, setdireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [codigo, setcodigo] = useState('');
    const [instruciones, setinstruciones] = useState('');
    const navigation = useNavigation();
    const { dirrecionesEdit } = useDirrecion();
    // Función para obtener la información del cliente
    const fetchData = async () => {
        try {
            const response = await infoCliente();
            if (response.success) {
                const user = response.data[0];
                setNombre(user.nombre_direccion);
                setdireccion(user.direccion_cliente);
                setTelefono(user.telefono_cliente);
                setcodigo(user.codigo_postal);
                setinstruciones(user.instrucciones_entrega);
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
        const { success, message } = await dirrecionesEdit(nombre, direccion, codigo, telefono, instruciones);
        if (success) {
            Alert.alert("Registro exitoso", "Tu dirrecion editada", [
                { text: "OK", onPress: () => navigation.navigate('Addresses') }
            ]);
        } else {
            Alert.alert("Error", message);
        }
    };

    return (
        <View style={styles.container}>
            <CustomFlecha />
            <Text style={styles.title}>Editar Dirrecion</Text>
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

export default EditDirrecion;
