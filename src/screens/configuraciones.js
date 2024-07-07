// screens/Configuracion.js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Configuracion = ({ }) => {
    return (
        <View style={styles.container}>
            <Title style={styles.title}>Mi cuenta</Title>
            <Title style={styles.subtitle}>Tu información</Title>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>Gilbert Jones</Text>
                        <Text style={styles.infoText2}>Glbertjones001@gmail.com</Text>
                        <Text style={styles.infoText2}>121-224-7890</Text>
                    </View>
                </Card.Content>
            </Card>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Información personal</Text>
                <MaterialCommunityIcons name="arrow-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
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