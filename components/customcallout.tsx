import React from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Linking } from "react-native";
import { Callout } from "react-native-maps";
import { CrimeMarker } from "@/constants/constants";

const screenWidth = Dimensions.get("window").width;

const CrimeCallout: React.FC<{
  marker: CrimeMarker;
}> = ({ marker }) => {

  return (
    <Callout tooltip>
      <View>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{marker.crimeType}</Text>
            <Text style={styles.description}>Time Occurred: {marker.timeOccurred}</Text>
            <Text style={styles.description}>Trust Level: {marker.trustLevel}%</Text>
          </View>
        </View>
        <View style={styles.triangle}></View>
      </View>
    </Callout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: screenWidth * 0.8,
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  triangle: {
    left: (screenWidth * 0.8) / 2 - 10,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 20,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: "black",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
});

export default CrimeCallout;
