import { View, StyleSheet } from "react-native";

export default function FlexWrapExample() {
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
    height: 220,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#95e1d3",
    margin: 5,
  },
});
