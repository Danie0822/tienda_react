import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/customButton';
// Pantalla de éxito
const ExitoScreen = () => {
    const navigation = useNavigation();

    const handlerPress = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>¡Tu pedido fue enviado con éxito!</Text>
            <Image source={require('../img/vector.png')} style={styles.image} />
            <View style={styles.container2}>
                <Text style={styles.sub}>Gracias por tu compra, esperamos vuelvas pronto</Text>
                <CustomButton
                    text="Volver al inicio"
                    onPress={handlerPress}
                    style={styles.button}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDD146',
        alignItems: 'center',
        padding: 20
    },
    titulo: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        marginTop: '20%',
    },
    image: {
        width: 250,
        height: 360
    },
    container2: {
        backgroundColor: '#F4F4F4',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100',
        height: '40%'
    },
    sub: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        marginTop: 20,
        width: '100%',
    },
});

export default ExitoScreen;
