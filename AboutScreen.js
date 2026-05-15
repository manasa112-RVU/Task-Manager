// Screens/AboutScreen.js

import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function AboutScreen() {

  return (

    <ScrollView style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.appName}>
          Task Manager
        </Text>

        <Text style={styles.version}>
          Version 1.0
        </Text>

      </View>

      <View style={styles.section}>

        <Text style={styles.heading}>
          About
        </Text>

        <Text style={styles.text}>
          This application is designed to
          help users manage and optimize
          daily tasks efficiently through
          task organization, productivity
          tracking, and performance analysis.
        </Text>

      </View>

      <View style={styles.section}>

        <Text style={styles.heading}>
          Features
        </Text>

        <Text style={styles.text}>
          • Add Tasks
        </Text>

        <Text style={styles.text}>
          • Edit Tasks
        </Text>

        <Text style={styles.text}>
          • Delete Tasks
        </Text>

        <Text style={styles.text}>
          • Filter Tasks
        </Text>

        <Text style={styles.text}>
          • Performance Tracking
        </Text>

      </View>

      <View style={styles.section}>

        <Text style={styles.heading}>
          Technologies Used
        </Text>

        <Text style={styles.text}>
          • React Native
        </Text>

        <Text style={styles.text}>
          • JavaScript
        </Text>

        <Text style={styles.text}>
          • React Navigation
        </Text>

      </View>

      <View style={styles.section}>

        <Text style={styles.heading}>
          Developed By
        </Text>

        <Text style={styles.text}>
          • Team 08
        </Text>

        <Text style={styles.text}>
          • Manasa
        </Text>

        <Text style={styles.text}>
          • Keerthana
        </Text>

        <Text style={styles.text}>
          • Anvitha
        </Text>

        <Text style={styles.text}>
          • Harini
        </Text>

      </View>

      <Text style={styles.footer}>
        Designed for Student Productivity 🚀
      </Text>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20
  },

  card: {
    backgroundColor: '#6200EE',
    padding: 25,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 20
  },

  appName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  version: {
    color: 'white',
    marginTop: 10,
    fontSize: 16
  },

  section: {
    backgroundColor: '#1e1e2f',
    padding: 18,
    borderRadius: 15,
    marginBottom: 18
  },

  heading: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10
  },

  text: {
    fontSize: 15,
    color: '#ddd',
    marginBottom: 5,
    lineHeight: 22
  },

  footer: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    marginBottom: 40,
    fontSize: 16,
    fontStyle: 'italic'
  }

});