import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

// Import your Login screen
import Login from './screens/Login';
import Signup from './screens/Signup';

export default function App() {
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  return (
    <View style={styles.container}>
      {isLoginScreen ? (
        <Login onSwitchToSignup={() => setIsLoginScreen(false)} />
      ) : (
        <Signup onSwitchToLogin={() => setIsLoginScreen(true)} />
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
