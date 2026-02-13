import { View, StyleSheet } from "react-native";

export default function LayoutDirectionExample() {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "orange",
    margin: 5,
  },
});
