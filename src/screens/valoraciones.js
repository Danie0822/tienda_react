import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import CustomFlecha from '../components/regresar';
import useValoraciones from '../controller/publica/valoraciones_inventario'; 

// Función para formatear la fecha
const formatDate = (date) => {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
// Función para guardar la valoración
const Valoraciones = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { valoracionesSave } = useValoraciones();

  const guardarReseña = async () => {
    
    const status = true;
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const idDetalle = await AsyncStorage.getItem("id_detalle_pedido");
    
    console.log(formattedDate, rating, comment, idDetalle);
    const { success, message } = await valoracionesSave(rating, comment, formattedDate, status, idDetalle);
    if (success) {
      Alert.alert("Insercción exitosa", "Se ha enviado la información de la valoración", [
        { text: "OK", onPress: () => navigation.goBack()}
      ]);
    } else {
      Alert.alert("Error", message);
    }
  };

  const ratingCompleted = (rating) => {
    // Redondea el rating al entero más cercano
    setRating(Math.round(rating));
  };

  return (
    <View style={styles.container}>
      <CustomFlecha />
      <Text style={styles.title}>Editar cuenta</Text>
      <Text style={styles.title2}>Califica el producto con estrellas:</Text>

      <Rating
        type='star'
        ratingCount={5}
        imageSize={30}
        showRating={false}
        onFinishRating={ratingCompleted}
      />
      
      <TextInput
        style={styles.commentInput}
        placeholder="Comentario"
        multiline
        value={comment}
        onChangeText={(text) => setComment(text)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={guardarReseña}>
        <Text style={styles.saveButtonText}>Guardar reseña</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    marginTop: 45,
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  title2: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
    marginTop: 20
  },
  saveButton: {
    backgroundColor: '#ffc107',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Valoraciones;
