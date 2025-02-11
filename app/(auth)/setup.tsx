import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { EmergencyContact } from '@/constants/constants';

export default function UserProfileSetup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [race, setRace] = useState('');
  const [homeLocation, setHomeLocation] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([{ name: '', phone: '', relationship: ''}]);
  const router = useRouter();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: '', phone: '', relationship: '' }]);
  };

  const updateEmergencyContact = (index: number, field: keyof EmergencyContact, value: string) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [field]: value
    };
    setEmergencyContacts(updatedContacts);
  };

  const saveProfile = async () => {
    try {
      const userProfile = {
        name,
        email,
        phoneNumber,
        gender,
        age,
        race,
        homeLocation,
        profileImage,
      };

      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      await AsyncStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));

      console.log('Profile saved:', userProfile);
      console.log('Emergency contacts saved:', emergencyContacts);

      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Set Up Your Profile</Text>

      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imagePlaceholder}>Tap to add profile picture</Text>
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Other" value="other" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <Picker
          selectedValue={race}
          onValueChange={(itemValue) => setRace(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Race" value="" />
          <Picker.Item label="White" value="white" />
          <Picker.Item label="Black or African American" value="black" />
          <Picker.Item label="Hispanic or Latino" value="hispanic" />
          <Picker.Item label="Asian" value="asian" />
          <Picker.Item label="American Indian or Alaska Native" value="native_american" />
          <Picker.Item label="Native Hawaiian or Other Pacific Islander" value="pacific_islander" />
          <Picker.Item label="Two or More Races" value="multiracial" />
          <Picker.Item label="Other" value="other" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Home Location"
          value={homeLocation}
          onChangeText={setHomeLocation}
        />

        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        {emergencyContacts.map((contact, index) => (
          <View key={index} style={styles.contactContainer}>
            <TextInput
              style={styles.input}
              placeholder="Contact Name"
              value={contact.name}
              onChangeText={(value) => updateEmergencyContact(index, 'name', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Phone"
              value={contact.phone}
              onChangeText={(value) => updateEmergencyContact(index, 'phone', value)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Relationship"
              value={contact.relationship}
              onChangeText={(value) => updateEmergencyContact(index, 'relationship', value)}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={addEmergencyContact}>
          <Text style={styles.buttonText}>Add Emergency Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ddd',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  picker: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  contactContainer: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
