import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function NotificationScreen() {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>
      <View style={styles.option}>
        <Text>Enable notifications</Text>
        <Switch value={isEnabled} onValueChange={toggleSwitch} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});
