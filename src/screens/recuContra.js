import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomTextInput from '../components/customInput';
import CustomButton from '../components/customButton';
import CustomFlecha from '../components/regresar';
import { useCambioClave } from '../controller/publica/cambioClave'; 
const { width } = Dimensions.get('window');

const RecuContra = () => {
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const route = useRoute();
    const navigation = useNavigation();
    const { email } = route.params;
    const { UpdateClave } = useCambioClave();

    const handlePress = async() => {
        const { success, message } = await UpdateClave(email, password, password1);
        if (success) {
            Alert.alert("Registro exitoso", "Tu cuenta a sido actualizada", [
                { text: "OK", onPress: () => navigation.navigate('Login') }
            ]);
        } else {
            Alert.alert("Error", message);
        }
    };

    return (
        <View style={styles.container}>
            <CustomFlecha />
            <Text style={styles.title}>Cambiar tu contraseña</Text>
            <CustomTextInput
                placeholder="Contraseña"
                secureTextEntry
                nombre={password}
                onChangeText={text => setPassword(text)}
            />
            <CustomTextInput
                placeholder="Confirmar"
                secureTextEntry
                nombre={password1}
                onChangeText={text => setPassword1(text)}
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
