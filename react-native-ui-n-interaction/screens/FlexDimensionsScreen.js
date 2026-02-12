import { View, Text, StyleSheet } from 'react-native';

export default function FlexDimensionsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text>Flex 1</Text>
      </View>
      <View style={styles.box2}>
        <Text>Flex 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    flex: 1,
    backgroundColor: '#fbbc05',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    flex: 2,
    backgroundColor: '#ea4335',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
