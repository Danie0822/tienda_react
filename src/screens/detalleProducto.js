import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ViewBase } from 'react-native';
import CustomFlecha from '../components/regresar';

const { width } = Dimensions.get('window');

const DetalleProducto = ({ }) => {
    return (
        <View style={styles.cont}>
            <CustomFlecha />
            <View style={styles.container}>
                <Image source={require('../img/gucci.jpg')} style={styles.image} />
                <Text style={styles.textTitulo}>Good Girl Blush</Text>
                <Text style={styles.textMarca}>Gucci</Text>
                <Text style={styles.textPrecio}>$400.0</Text>
            </View>
            <View style={styles.chip}>
                <Text style={styles.text}>Gucci</Text>
                <Text style={styles.data}>$400.0</Text>

            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    cont: {
        backgroundColor: '#FFF'
    },
    container: {
        padding: 10,
        marginTop: 70,
        backgroundColor: '#FFF'
    },
    image: {
        width: width,
        height: width,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    textTitulo: {
        fontSize: 20,
        color: '#000'
    },
    textMarca: {
        fontSize: 16,
        color: '#777',
    },
    textPrecio: {
        fontSize: 16,
        color: '#EDD146',
        textAlign: 'right',
        marginRight: 10
    },
    chip: {
        backgroundColor: '#F4F4F4',
        shadowColor: '#000',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 2,
        margin: 10
    },
    text:{
        fontSize: 18,
        color: '#000',
    },
    data:{
        fontSize: 16,
        color: '#777',
    }

});

export default DetalleProducto;
