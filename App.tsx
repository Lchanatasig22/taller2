import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      navigation.replace('Home');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
}

function HomeScreen({ navigation }) {
  const restaurants = [
    { name: 'Yogurt Amazonas', image: require('./assets/Yougurt-Amazonas.webp') },
    { name: 'KFC', image: require('./assets/KFC-logo.png') },
    { name: 'Burguer King', image: require('./assets/images.png') },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Home Screen</Text>
      {restaurants.map((restaurant, index) => (
        <TouchableOpacity key={index} style={styles.restaurantCard} onPress={() => navigation.navigate('Details', { restaurant })}>
          <Image source={restaurant.image} style={styles.restaurantImage} />
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Ir a Perfil" onPress={() => navigation.navigate('Profile')} />
    </ScrollView>
  );
}

function DetailsScreen({ route }) {
  const { restaurant } = route.params;

  return (
    <View style={styles.container}>
      <Image source={restaurant.image} style={styles.detailImage} />
      <Text style={styles.header}>{restaurant.name}</Text>
      <Text style={styles.description}>Descripción del restaurante</Text>
      <Button title="Volver a Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Ir a Perfil" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Screen</Text>
      <Text style={styles.description}>Aquí puedes ver y editar tu perfil</Text>
      <Button title="Volver a Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Ir a Detalles" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  restaurantCard: {
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  restaurantImage: {
    left:15,
    width: '50%',
    height: 150,
  },
  restaurantName: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  detailImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
