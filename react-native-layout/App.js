import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

// Import your Login screen
import Login from './screens/Login';
import Signup from './screens/Signup';
import Todo from './screens/Todo';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  return (
    <View style={styles.container}>
      {currentScreen === 'login' ? (
        <Login onSwitchToSignup={() => setCurrentScreen('signup')} />
      ) : currentScreen === 'signup' ? (
        <Signup 
          onSwitchToLogin={() => setCurrentScreen('login')}
          onNavigateToTodo={() => setCurrentScreen('todo')}
        />
      ) : (
        <Todo />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
