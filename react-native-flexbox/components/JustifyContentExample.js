import { View, StyleSheet } from "react-native";

export default function JustifyContentExample() {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: "teal",
  },
});
