// OrderDetail.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CustomFlecha from '../components/regresar';
import { MaterialIcons } from '@expo/vector-icons';
import ProductCard from '../components/cardProductOrder';

const DetalleOrden = ({ navigation }) => {
  const products = [
    {
      image: 'https://link-to-image1.com',
      name: 'CHLOÉ SIGNATURE',
      brand: 'Chloé',
      price: '$56.00',
      quantity: 1,
    },
    {
      image: 'https://link-to-image2.com',
      name: 'GOOD GIRL BLUSH',
      brand: 'Carolina Herrera',
      price: '$99.95',
      quantity: 1,
    },
    {
      image: 'https://link-to-image3.com',
      name: 'SPICE BOMB',
      brand: 'Viktor Rolf',
      price: '$99.95',
      quantity: 1,
    },
    {
      image: 'https://link-to-image4.com',
      name: 'ACQUA ESSENZIALE BLU',
      brand: 'Salvatore Ferragamo',
      price: '$100.00',
      quantity: 1,
    },
    {
      image: 'https://link-to-image4.com',
      name: 'ACQUA ESSENZIALE BLU',
      brand: 'Salvatore Ferragamo',
      price: '$100.00',
      quantity: 1,
    },
  ];

  const renderItem = ({ item }) => (
    <ProductCard
      image={item.image}
      name={item.name}
      brand={item.brand}
      price={item.price}
      quantity={item.quantity}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>  Detalle pedido</Text>
        <View style={styles.spacer} />
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.summary}>
        <Text style={styles.sub}>Subtotal 
          <Text style={styles.text}> $155.95</Text>
        </Text>
        <Text style={styles.sub}>Costo de envío 
          <Text style={styles.text}> $0.00</Text>
        </Text>
        <Text style={styles.sub}>Total 
          <Text style={styles.text}> $155.95</Text>
        </Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30
  },
  backButton: {
    position: 'absolute',
    borderWidth: 0,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    marginRight: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: "center",
    marginTop: 20,
    alignSelf: 'center'

  },
  listContainer: {
    paddingBottom: 20,
  },
  summary: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 20,
  },
  sub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontWeight: '600'
  },
  text: {
    fontSize: 16
  },
});

export default DetalleOrden;
