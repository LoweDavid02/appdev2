import { StyleSheet, Text, View } from 'react-native';

export default function PercentageDimensionsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>80% Width, 30% Height</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '80%',
    height: '30%',
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
