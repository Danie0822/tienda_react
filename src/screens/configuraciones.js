// screens/Configuracion.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Alert } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchInfoCliente } from '../controller/publica/configuraciones';

const Configuracion = ({ }) => {

    const { infoCliente } = fetchInfoCliente();
    const [userInfo, setUserInfo] = useState(null);
    const navigation = useNavigation();
    
    const fetchData = async () => {
        try {
            const response = await infoCliente();
            if (response.success) {
                const user = response.data[0];
                setUserInfo({
                    nombre: user.nombre_cliente,
                    correo: user.correo_cliente,
                    telefono: user.telefono_cliente,
                });
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

    const handleEditarPerfil = () => {
        navigation.navigate('EditPerfil');
    };
    const handleDirreciones = () => {
        navigation.navigate('Addresses');
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Mi cuenta</Title>
            <Title style={styles.subtitle}>Tu información</Title>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.infoContainer}>
                    {userInfo ? (
                            <>
                                <Text style={styles.infoText}>{"Nombre: " + userInfo.nombre}</Text>
                                <Text style={styles.infoText2}>{"Correo: " + userInfo.correo}</Text>
                                <Text style={styles.infoText2}>{"Telefono: " + userInfo.telefono}</Text>
                            </>
                        ) : (
                            <Text>Cargando...</Text>
                        )}
                    </View>
                </Card.Content>
            </Card>
            <TouchableOpacity style={styles.button} onPress={handleEditarPerfil}>
                <Text style={styles.buttonText}>Información personal</Text>
                <MaterialCommunityIcons name="arrow-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDirreciones}>
                <Text style={styles.buttonText}>Direcciones</Text>
                <MaterialCommunityIcons name="arrow-right" size={24} color="black" />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    card: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#F4F4F4'
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        marginTop: 40,
        fontWeight: '800',
        color: '#000000'
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 5,
        marginTop: 10,
        fontWeight: '800',
        color: '#000000'
    },
    infoContainer: {
        marginBottom: 20,
    },
    infoText: {
        fontSize: 20,
        marginBottom: 8,
        fontWeight: '500'
    },
    infoText2: {
        fontSize: 16,
        marginBottom: 5,
        color: '#272727'
    },
    button: {
        backgroundColor: '#F4F4F4',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '800'
    },
});

export default Configuracion;