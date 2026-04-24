import { View, StyleSheet } from "react-native";

export default function FlexDirectionExample() {
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
    flexDirection: "column",
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: "#93c47d",
    margin: 5,
  },
});
