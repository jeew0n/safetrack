import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Alert, SafeAreaView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    homeLocation: '',
    profilePicture: '',
  });

  const fetchUserData = async () => {
    try {
      const storedUserProfile = await AsyncStorage.getItem('userProfile');
      if (storedUserProfile) {
        const parsedUserProfile = JSON.parse(storedUserProfile);
        setUserProfile(parsedUserProfile);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove([
                'userToken',
                'userProfile',
                'userSettings',
                'emergencyContacts',
                // Add any other keys you're using to store user-specific data
              ]);
              console.log('User logged out');
              router.replace('/(auth)/login');
            } catch (error) {
              console.error('Error logging out:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Account Info Section */}
        <View style={styles.accountInfoSection}>
        <Image
          source={
            userProfile.profilePicture
              ? { uri: userProfile.profilePicture }
              : require('../../assets/images/profile.jpg')
          }
          style={styles.profileImage}
        />

          <View style={styles.accountDetails}>
            <Text style={styles.userName}>{userProfile.name || 'User Name'}</Text>
            <Text style={styles.userEmail}>{userProfile.email || 'user@example.com'}</Text>
            <Text style={styles.userLocation}>Location: {userProfile.homeLocation || 'Unknown'}</Text>
          </View>
        </View>

        {/* Account Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Link href="../(settings)/profile" style={styles.option}>
            <Text>Profile Information</Text>
          </Link>
          <Link href="../(settings)/profile" style={styles.option}>
            <Text>Emergency Contacts</Text>
          </Link>
          <Link href="../(settings)/notification" style={styles.option}>
            <Text>Notification Settings</Text>
          </Link>
        </View>

        {/* Safety Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Settings</Text>
          <Link href="../(settings)/profile" style={styles.option}>
            <Text>Danger Level Threshold</Text>
          </Link>
          <Link href="../(settings)/profile" style={styles.option}>
            <Text>Location Tracking</Text>
          </Link>
        </View>

        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <Link href="../(settings)/profile" style={styles.option}>
            <Text>Language</Text>
          </Link>
          <Link href="../(settings)/profile" style={styles.option}>
            <Text>Theme</Text>
          </Link>
          <Link href="../(settings)/profile" style={styles.option}>
            <Text>About</Text>
          </Link>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 50,
    paddingBottom: 5,
  },
  accountInfoSection: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  accountDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
  },
  userLocation: {
    fontSize: 14,
    color: '#888',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  option: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
  },
});
