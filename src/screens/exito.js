import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/customButton';

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
                <Text style={styles.sub}>Pronto recibirás un correo de confirmación</Text>
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
        padding: 20,
        justifyContent: 'space-between',
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
        height: 300,
        marginVertical: 20,
    },
    container2: {
        backgroundColor: '#F4F4F4',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        width: '100',
        height: '30%',
        justifyContent: 'space-between',
    },
    sub: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    button: {
        marginTop: 20,
        width: '100%'
    }
});

export default ExitoScreen;
