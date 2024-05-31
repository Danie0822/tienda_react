import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/customInput';
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/regresar';
const { width } = Dimensions.get('window');

const RecuContra = () => {
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <CustomFlecha />
            <Text style={styles.title}>Cambiar tu contraseña</Text>
            <CustomTextInput
                placeholder="Contraseña"
                secureTextEntry
                nombre={password}
                setNombre={setPassword}
            />
            <CustomTextInput
                placeholder="Confirmar"
                secureTextEntry
                nombre={password1}
                setNombre={setPassword1}
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

export default RecuContra;
