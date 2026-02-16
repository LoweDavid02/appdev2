import { View, Text, StyleSheet } from "react-native";

export default function StyleExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Style Example</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CAF50",
    padding: 20,
    margin: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
