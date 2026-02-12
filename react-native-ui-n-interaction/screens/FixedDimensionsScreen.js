import { View, Text, StyleSheet } from 'react-native';

export default function FixedDimensionsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>Fixed 150 x 150</Text>
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
    width: 150,
    height: 150,
    backgroundColor: '#34a853',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
