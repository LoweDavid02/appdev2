import { View, StyleSheet } from "react-native";

export default function PercentageDimensions() {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: "#ddd",
  },
  box: {
    width: "50%",
    height: "50%",
    backgroundColor: "purple",
  },
});
