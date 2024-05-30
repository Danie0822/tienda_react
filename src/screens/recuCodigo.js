import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomCodigoInput from '../components/customcodigo';
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/regresar';

const { width } = Dimensions.get('window');

const RecuCodigoScreen = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const navigation = useNavigation();

    const handlePress = () => {
        const codeValue = code.join('');
        Alert.alert('Código ingresado', codeValue);
    };

    const handleChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    };

    return (
        <View style={styles.container}>
             <CustomFlecha/>
            <Text style={styles.title}>Cambiar tu contraseña</Text>
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
