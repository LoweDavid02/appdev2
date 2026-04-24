import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen'; 
import SignupScreen from './src/screens/SignupScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import TodoScreen from './src/screens/TodoScreen';

export default function App() {
  return (
    <>
      <TodoScreen />
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({});
