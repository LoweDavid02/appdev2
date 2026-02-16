import { View, StyleSheet } from "react-native";

export default function AlignSelfExample() {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { alignSelf: "flex-start" }]} />
      <View style={[styles.box, { alignSelf: "center" }]} />
      <View style={[styles.box, { alignSelf: "flex-end" }]} />
      <View style={[styles.box, { alignSelf: "stretch" }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: "#ff6b6b",
    margin: 5,
  },
});
