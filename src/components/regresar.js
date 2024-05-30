import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomFlecha = () => {
    const navigation = useNavigation(); 
    return (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
        borderWidth: 0,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        padding: 10,
    },
});

export default CustomFlecha;
