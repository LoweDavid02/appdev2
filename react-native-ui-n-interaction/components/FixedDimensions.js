import { View, StyleSheet } from "react-native";

export default function FixedDimensions() {
  return (
    <View style={styles.box} />
  );
}

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: "#aaaaaa",
    margin: 20,
  },
});
