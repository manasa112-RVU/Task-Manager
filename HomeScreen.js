import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';

export default function HomeScreen({ navigation }) {

  // Get today's day
  const getToday = () => {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[new Date().getDay()];
  };

  const selectedDay = getToday();

  const [task, setTask] = useState('');
  const [showOthers, setShowOthers] = useState(false);

  const [tasks, setTasks] = useState({
    Monday: [{ id: '1', text: 'Study Math', completed: false }],
    Tuesday: [{ id: '2', text: 'Attend Lecture', completed: false }],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  // Add Task
  const addTask = () => {
    if (task.trim() === '') return;

    const newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false
    };

    setTasks(prev => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newTask]
    }));

    setTask('');
  };

  // Mark Complete
  const markComplete = (id) => {
    setTasks(prev => ({
      ...prev,
      [selectedDay]: prev[selectedDay].map(t =>
        t.id === id ? { ...t, completed: true } : t
      )
    }));
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(prev => ({
      ...prev,
      [selectedDay]: prev[selectedDay].filter(t => t.id !== id)
    }));
  };

  return (
    <ScrollView style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>{selectedDay} Plan</Text>

      {/* INPUT */}
      <TextInput
        placeholder="Add new task..."
        placeholderTextColor="#aaa"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />

      {/* ADD BUTTON */}
      <TouchableOpacity style={styles.addBtn} onPress={addTask}>
        <Text style={styles.btnText}>Add Task</Text>
      </TouchableOpacity>

      {/* TODAY TASKS */}
      {(tasks[selectedDay] || []).map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={[
            styles.taskText,
            item.completed && styles.completed
          ]}>
            {item.text}
          </Text>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => markComplete(item.id)}>
              <Text style={styles.complete}>✔</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* TOGGLE BUTTON */}
      <TouchableOpacity
        style={styles.otherBtn}
        onPress={() => setShowOthers(!showOthers)}
      >
        <Text style={styles.btnText}>
          {showOthers ? "Hide Other Days" : "View Other Days"}
        </Text>
      </TouchableOpacity>

      {/* OTHER DAYS */}
      {showOthers && (
        <View style={{ marginTop: 20 }}>

          <Text style={styles.subtitle}>Other Days</Text>

          {Object.keys(tasks).map(day => {
            if (day === selectedDay) return null;

            return (
              <View key={day} style={styles.section}>
                <Text style={styles.dayTitle}>{day}</Text>

                {tasks[day].length === 0 ? (
                  <Text style={styles.empty}>No tasks</Text>
                ) : (
                  tasks[day].map(item => (
                    <View key={item.id} style={styles.card}>
                      <Text style={styles.taskText}>{item.text}</Text>
                    </View>
                  ))
                )}
              </View>
            );
          })}
        </View>
      )}

      {/* ABOUT BUTTON */}
      <TouchableOpacity
        style={styles.aboutBtn}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={styles.btnText}>About App</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    padding: 20
  },

  title: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20
  },

  input: {
    backgroundColor: '#2e2e40',
    color: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  addBtn: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },

  otherBtn: {
    backgroundColor: '#a77baf',
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },

  aboutBtn: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },

  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  card: {
    backgroundColor: '#2e2e40',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  taskText: {
    color: 'white',
    fontSize: 16
  },

  completed: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5
  },

  complete: {
    marginRight: 15,
    color: 'green',
    fontSize: 18
  },

  delete: {
    color: 'red',
    fontSize: 18
  },

  subtitle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10
  },

  dayTitle: {
    color: '#03A9F4',
    fontSize: 16,
    marginBottom: 5
  },

  section: {
    marginBottom: 10
  },

  empty: {
    color: 'gray',
    fontStyle: 'italic'
  }

});