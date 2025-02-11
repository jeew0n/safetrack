import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LandingPage() {
  const router = useRouter();
  const [language, setLanguage] = useState('en');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'English', value: 'en'},
    {label: 'Español', value: 'es'},
    {label: 'Français', value: 'fr'},
    {label: 'Deutsch', value: 'de'},
    {label: '한국어', value: 'ko'},
  ]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken) {
          router.replace('./(tabs)');
        } else {
          // stay on this page
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        router.replace('./(auth)/login');
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    router.push('./(auth)/login');
  };

  const handleSignup = () => {
    router.push('./(auth)/signup');
  };

  const getWelcomeText = () => {
    switch (language) {
      case 'es': return 'Bienvenido a SafeTrack';
      case 'fr': return 'Bienvenue à SafeTrack';
      case 'de': return 'Willkommen bei SafeTrack';
      case 'ko': return 'SafeTrack 오신 것을 환영합니다';
      default: return 'Welcome to SafeTrack';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
            source={require('../assets/images/safetrack.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        <Text style={styles.title}>{getWelcomeText()}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.languageSelector}>
          <DropDownPicker
            open={open}
            value={language}
            items={items}
            setOpen={setOpen}
            setValue={setLanguage}
            setItems={setItems}
            containerStyle={{width: 200}}
            style={styles.dropdown}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  languageSelector: {
    marginTop: 20,
    zIndex: 1000,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});
