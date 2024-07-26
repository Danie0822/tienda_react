import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/customInput';
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/regresar';
import validaciones from '../controller/utilis/validaciones';
const { width } = Dimensions.get('window');

const Recuperacion = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    // Manejar presión del botón de continuar
    const handlePress = () => {
        if (!validaciones.validarCorreoElectronico(email)) {
            return Alert.alert("El correo electrónico no tiene un formato válido.");
        }
        navigation.navigate('RecuperacionCodigo', { email });
    };

    return (
        <View style={styles.container}>
            <CustomFlecha/>
            <Text style={styles.title}>Cambiar tu contraseña</Text>
            <CustomTextInput
                placeholder="Correo"
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <CustomButton
                text="Continuar"
                onPress={handlePress}
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
});

export default Recuperacion;
