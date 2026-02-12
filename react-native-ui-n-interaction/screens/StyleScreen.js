import { StyleSheet, Text, View } from 'react-native';

export default function StyleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Style Section</Text>
      <Text style={styles.subtitle}>Basic styling in React Native</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f0fe',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
  },
});
