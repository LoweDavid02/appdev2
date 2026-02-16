import { View, StyleSheet } from "react-native";

export default function FlexDimensions() {
  return (
    <View style={styles.container}>
      <View style={styles.box1} />
      <View style={styles.box2} />
      <View style={styles.box3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 150,
  },
  box1: {
    flex: 1,
    backgroundColor: "red",
  },
  box2: {
    flex: 2,
    backgroundColor: "green",
  },
  box3: {
    flex: 1,
    backgroundColor: "blue",
  },
});
