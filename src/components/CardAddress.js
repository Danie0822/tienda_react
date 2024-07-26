import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
// Componente para mostrar la información de una dirección
const CardAddress = ({ title, address, onEdit, onSwipeRight }) => {
  const [backgroundColor, setBackgroundColor] = useState('#f2f2f2');
  const translateX = new Animated.Value(0);
  // Función para manejar el gesto de deslizar
  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.translationX > 0) {
      translateX.setValue(nativeEvent.translationX);
      setBackgroundColor('#ffcccc'); 
    }

    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX > 50) {
        animateSwipe();
      } else {
        resetPosition();
      }
    }
  };
  // Función para animar el deslizamiento
  const animateSwipe = () => {
    Animated.timing(translateX, {
      toValue: 500, 
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onSwipeRight();
    });
  };
  // Función para resetear la posición
  const resetPosition = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setBackgroundColor('#f2f2f2'); 
    });
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture} onHandlerStateChange={handleGesture}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateX }],
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.address}>{address}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onEdit}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden', // Para ocultar el contenido que se desborda
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#888',
  },
  address: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
  },
});

export default CardAddress;
