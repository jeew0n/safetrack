import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmergencyContact } from '@/constants/constants';

const EMERGENCY_NUMBER = '911';

const ContactScreen: React.FC = () => {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [userLocation, setUserLocation] = useState<string>('Unknown Location');

  useEffect(() => {
    fetchEmergencyContacts();
    fetchLastKnownLocation();
  }, []);

  const fetchEmergencyContacts = async () => {
    try {
      const contactsJson = await AsyncStorage.getItem('emergencyContacts');
      if (contactsJson) {
        setEmergencyContacts(JSON.parse(contactsJson));
      }
    } catch (error) {
      console.error('Error fetching emergency contacts:', error);
    }
  };

  const fetchLastKnownLocation = async () => {
    try {
      const location = await AsyncStorage.getItem('lastKnownLocation');
      if (location) {
        setUserLocation(location);
      }
    } catch (error) {
      console.error('Error fetching last known location:', error);
    }
  };

  const handleEmergencyCall = () => {
    Linking.openURL(`tel:\\${EMERGENCY_NUMBER}`).catch(() =>
      Alert.alert('Error', 'Cannot make an emergency call.')
    );
  };

  const handleEmergencyMessage = async () => {
    const message = `EMERGENCY: I need help! My last known location is: \\${userLocation}`;

    emergencyContacts.forEach(contact => {
      Linking.openURL(`sms:\${contact.phone}?body=\\${encodeURIComponent(message)}`)
        .catch(() => console.error(`Failed to send message to \\${contact.name}`));
    });

    Alert.alert('Emergency Alert Sent', 'Emergency messages have been sent to all your emergency contacts.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>

      {/* Emergency Call Button */}
      <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall}>
        <Text style={styles.emergencyButtonText}>Call Emergency Services</Text>
      </TouchableOpacity>

      {/* Send Emergency Message Button */}
      <TouchableOpacity style={styles.emergencyMessageButton} onPress={handleEmergencyMessage}>
        <Text style={styles.emergencyButtonText}>Send Emergency Alert to All Contacts</Text>
      </TouchableOpacity>

      {/* Contacts List */}
      <FlatList
        data={emergencyContacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactDetails}>{item.phone}</Text>
            <Text style={styles.contactDetails}>{item.relationship}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#687076',
    marginBottom: 20,
    paddingBottom: 20,
  },
  emergencyButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  emergencyMessageButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  contactDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default ContactScreen;
