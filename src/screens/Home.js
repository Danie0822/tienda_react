import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Este es el home</Text>
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
});

export default Home;
