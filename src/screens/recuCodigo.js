import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomCodigoInput from '../components/customcodigo';
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/regresar';
import { useRegistrar } from '../controller/publica/correo';  // Importa useRegistrar

const { width } = Dimensions.get('window');

// Función para generar código aleatorio
const generateRandomCode = () => {
    const length = 4;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const RecuCodigoScreen = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params;
    const [codigoRecuperacion, setCodigoRecuperacion] = useState('');
    const { enviarCorreo, validarDatos } = useRegistrar();

    // Efecto para enviar correo al montar el componente
    useEffect(() => {
        const generatedCode = generateRandomCode();
        setCodigoRecuperacion(generatedCode);

        enviarCorreo(email, generatedCode)
            .then((response) => {
                if (response.success) {
                    Alert.alert('Código enviado', `Se ha enviado un correo a ${email} con el código de recuperación.`);
                } else {
                    Alert.alert('Error', response.message || 'No se pudo enviar el correo de recuperación.');
                }
            })
            .catch((error) => {
                Alert.alert('Error', 'Ocurrió un error al enviar el correo de recuperación.');
            });
    }, []);

    // Manejar presión del botón de continuar
    const handlePress = async () => {
        const codeValue = code.join('');
        const validationResponse = await validarDatos(email, codeValue, codigoRecuperacion);
        if (validationResponse === true) {
            navigation.navigate('RecuContra', { email });
            Alert.alert('Código de recuperación es correcto');
        } else {
            Alert.alert('Error de validación', validationResponse);
        }
    };

     // Manejar cambio en el código de recuperación
     const handleChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    };

    return (
        <View style={styles.container}>
            <CustomFlecha />
            <Text style={styles.title}>Código de recuperación</Text>
            <View style={styles.codeContainer}>
                {code.map((item, index) => (
                    <CustomCodigoInput
                        key={index}
                        placeholder={String.fromCharCode(65 + index)}
                        nombre={item}
                        setNombre={(value) => handleChange(index, value)}
                    />
                ))}
            </View>
            <CustomButton text="Continuar" onPress={handlePress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
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
    codeContainer: {
        flexDirection: 'row',
        marginLeft: 5,
        marginBottom: 20,
    },
});

export default RecuCodigoScreen;
