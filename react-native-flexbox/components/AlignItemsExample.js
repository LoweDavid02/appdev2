import { View, StyleSheet } from "react-native";

export default function AlignItemsExample() {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: "brown",
    margin: 5,
  },
});
