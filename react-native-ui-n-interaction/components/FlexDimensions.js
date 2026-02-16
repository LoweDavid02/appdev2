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
    backgroundColor: "#1c1a18",
  },
  box2: {
    flex: 2,
    backgroundColor: "#2d2824",
  },
  box3: {
    flex: 1,
    backgroundColor: "#3e3730",
  },
});
