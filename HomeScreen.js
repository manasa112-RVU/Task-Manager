// Screens/HomeScreen.js

import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';

export default function HomeScreen({ navigation, route }) {

  const getToday = () => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    return days[new Date().getDay()];
  };

  const selectedDay =
    route?.params?.selectedDay || getToday();

  const [task, setTask] = useState('');

  const [filter, setFilter] = useState('ALL');

  const [editingId, setEditingId] = useState(null);

  const [editText, setEditText] = useState('');

  const [tasks, setTasks] = useState({

    Monday: [
      {
        id: '1',
        text: 'Study Physics',
        completed: false
      },
      {
        id: '2',
        text: 'Practice Coding',
        completed: false
      }
    ],

    Tuesday: [
      {
        id: '3',
        text: 'Do Exercise',
        completed: false
      },
      {
        id: '4',
        text: 'Read Operating Systems Notes',
        completed: false
      }
    ],

    Wednesday: [
      {
        id: '5',
        text: 'Revise Data Structures',
        completed: false
      },
      {
        id: '6',
        text: 'Practice Python Programs',
        completed: true
      }
    ],

    Thursday: [
      {
        id: '7',
        text: 'Watch motivating podcasts',
        completed: false
      },
      {
        id: '8',
        text: 'Prepare Seminar Topics',
        completed: false
      }
    ],

    Friday: [
      {
        id: '9',
        text: 'Do Mock Interviews',
        completed: false
      },
      {
        id: '10',
        text: 'Work on Mini project',
        completed: false
      }
    ],

    Saturday: [
      {
        id: '11',
        text: 'Mini Project Development',
        completed: false
      },
      {
        id: '12',
        text: 'Read Computer Networks',
        completed: true
      }
    ],

    Sunday: [
      {
        id: '13',
        text: 'Weekly Revision',
        completed: false
      },
      {
        id: '14',
        text: 'Plan Next Week Schedule',
        completed: false
      }
    ]

  });

  // ADD TASK

  const addTask = () => {

    if (task.trim() === '') {

      Alert.alert(
        'Empty Task',
        'Please enter a task'
      );

      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false
    };

    setTasks(prev => ({
      ...prev,
      [selectedDay]: [
        ...prev[selectedDay],
        newTask
      ]
    }));

    setTask('');
  };

  // COMPLETE TASK

  const toggleComplete = (id) => {

    setTasks(prev => ({
      ...prev,

      [selectedDay]: prev[selectedDay].map(t =>
        t.id === id
          ? { ...t, completed: !t.completed }
          : t
      )
    }));
  };

  // DELETE TASK

  const deleteTask = (id) => {

    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel'
        },

        {
          text: 'Delete',

          onPress: () => {

            setTasks(prev => ({
              ...prev,

              [selectedDay]:
                prev[selectedDay].filter(
                  t => t.id !== id
                )
            }));

          },

          style: 'destructive'
        }
      ]
    );
  };

  // EDIT TASK

  const startEdit = (item) => {

    setEditingId(item.id);

    setEditText(item.text);
  };

  const saveEdit = (id) => {

    if (editText.trim() === '') {
      return;
    }

    setTasks(prev => ({
      ...prev,

      [selectedDay]: prev[selectedDay].map(t =>
        t.id === id
          ? { ...t, text: editText }
          : t
      )
    }));

    setEditingId(null);

    setEditText('');
  };

  // FILTER TASKS

  const filteredTasks =
    tasks[selectedDay].filter(t => {

      if (filter === 'COMPLETED') {
        return t.completed;
      }

      if (filter === 'PENDING') {
        return !t.completed;
      }

      return true;
    });

  // PERFORMANCE TRACKER

  const totalTasks =
    tasks[selectedDay].length;

  const completedTasks =
    tasks[selectedDay].filter(
      t => t.completed
    ).length;

  const pendingTasks =
    totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (

    <ScrollView style={styles.container}>

      {/* TITLE */}

      <Text style={styles.title}>
        {selectedDay}
      </Text>

      <Text style={styles.subtitle}>
        {totalTasks} Tasks
      </Text>

      {/* PERFORMANCE TRACKER */}

      <View style={styles.statsCard}>

        <Text style={styles.statsTitle}>
          Performance Tracker
        </Text>

        <Text style={styles.statsText}>
          Total Tasks : {totalTasks}
        </Text>

        <Text style={styles.statsText}>
          Completed : {completedTasks}
        </Text>

        <Text style={styles.statsText}>
          Pending : {pendingTasks}
        </Text>

        <Text style={styles.statsText}>
          Completion Rate : {completionRate}%
        </Text>

      </View>

      {/* INPUT */}

      <View style={styles.inputBox}>

        <TextInput
          placeholder="Add new task..."
          placeholderTextColor="#aaa"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.addBtn}
          onPress={addTask}
        >
          <Text style={styles.btnText}>
            ＋
          </Text>
        </TouchableOpacity>

      </View>

      {/* FILTER */}

      <View style={styles.filterRow}>

        {['ALL', 'COMPLETED', 'PENDING'].map(f => (

          <TouchableOpacity
            key={f}

            style={[
              styles.filterBtn,
              filter === f &&
                styles.activeFilter
            ]}

            onPress={() => setFilter(f)}
          >

            <Text style={styles.filterText}>
              {f}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {/* TASKS */}

      {filteredTasks.map(item => (

        <View
          key={item.id}
          style={[
            styles.card,

            item.completed &&
              styles.completedCard
          ]}
        >

          {editingId === item.id ? (

            <TextInput
              value={editText}
              onChangeText={setEditText}
              style={styles.editInput}
            />

          ) : (

            <Text
              style={[
                styles.taskText,

                item.completed &&
                  styles.completed
              ]}
            >
              {item.text}
            </Text>

          )}

          <View style={styles.row}>

            <TouchableOpacity
              onPress={() =>
                toggleComplete(item.id)
              }
            >
              <Text style={styles.complete}>
                ✔
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                startEdit(item)
              }
            >
              <Text style={styles.edit}>
                ✏️
              </Text>
            </TouchableOpacity>

            {editingId === item.id && (

              <TouchableOpacity
                onPress={() =>
                  saveEdit(item.id)
                }
              >
                <Text style={styles.save}>
                  💾
                </Text>
              </TouchableOpacity>

            )}

            <TouchableOpacity
              onPress={() =>
                deleteTask(item.id)
              }
            >
              <Text style={styles.delete}>
                🗑
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      ))}

      {/* EMPTY STATE */}

      {filteredTasks.length === 0 && (

        <Text style={styles.empty}>
          No tasks available 🚀
        </Text>

      )}

      {/* ABOUT */}

      <TouchableOpacity
        style={styles.aboutBtn}
        onPress={() =>
          navigation.navigate('About')
        }
      >

        <Text style={styles.btnText}>
          About App
        </Text>

      </TouchableOpacity>

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
    fontSize: 34,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  subtitle: {
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16
  },

  statsCard: {
    backgroundColor: '#1e1e2f',
    padding: 18,
    borderRadius: 15,
    marginBottom: 20
  },

  statsTitle: {
    color: '#2196f3',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  statsText: {
    color: 'white',
    fontSize: 15,
    marginBottom: 5
  },

  inputBox: {
    flexDirection: 'row',
    marginBottom: 18
  },

  input: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    color: 'white',
    padding: 14,
    borderRadius: 12
  },

  addBtn: {
    marginLeft: 10,
    backgroundColor: '#ff9800',
    padding: 14,
    borderRadius: 12,
    justifyContent: 'center'
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18
  },

  filterBtn: {
    backgroundColor: '#2e2e40',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20
  },

  activeFilter: {
    backgroundColor: '#2196f3'
  },

  filterText: {
    color: 'white',
    fontSize: 13
  },

  card: {
    backgroundColor: '#1e1e2f',
    padding: 16,
    borderRadius: 15,
    marginBottom: 14
  },

  completedCard: {
    borderWidth: 1,
    borderColor: '#4CAF50'
  },

  taskText: {
    color: 'white',
    fontSize: 17
  },

  completed: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },

  editInput: {
    backgroundColor: '#2e2e40',
    color: 'white',
    padding: 10,
    borderRadius: 10
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12
  },

  complete: {
    marginRight: 15,
    color: '#4CAF50',
    fontSize: 18
  },

  edit: {
    marginRight: 15,
    fontSize: 18
  },

  save: {
    marginRight: 15,
    fontSize: 18
  },

  delete: {
    fontSize: 18
  },

  empty: {
    color: '#999',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16
  },

  aboutBtn: {
    backgroundColor: '#2196f3',
    padding: 16,
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 40
  },

  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});