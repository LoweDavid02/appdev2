import { View, StyleSheet } from "react-native";

export default function AlignContentExample() {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: "#4ecdc4",
    margin: 5,
  },
});
