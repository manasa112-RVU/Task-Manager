import React from 'react';

import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function DaysScreen({ navigation }) {

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Task Manager
      </Text>

      <Text style={styles.subtitle}>
        Select a Day
      </Text>

      {days.map((day, index) => (

        <TouchableOpacity
          key={index}
          style={styles.card}
          activeOpacity={0.8}

          onPress={() =>
            navigation.navigate('Home', {
              selectedDay: day
            })
          }
        >

          <Text style={styles.dayText}>
            {day}
          </Text>

        </TouchableOpacity>

      ))}

      <Text style={styles.footer}>
        Organize • Track • Improve 🚀
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

  title: {
    color: '#2196f3',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },

  subtitle: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginVertical: 25
  },

  card: {
    backgroundColor: '#1e1e2f',
    padding: 22,
    borderRadius: 15,
    marginBottom: 14,
    elevation: 5
  },

  dayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },

  footer: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    marginBottom: 30,
    fontSize: 16,
    fontStyle: 'italic'
  }

});