import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView } from "react-native";

// Import all UI & Interaction sections
import StyleExample from "./components/StyleExample";
import FixedDimensions from "./components/FixedDimensions";
import FlexDimensions from "./components/FlexDimensions";
import PercentageDimensions from "./components/PercentageDimensions";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* STYLE SECTION */}
      <StyleExample />

      {/* FIXED DIMENSIONS SECTION */}
      <FixedDimensions />

      {/* FLEX DIMENSIONS SECTION */}
      <FlexDimensions />

      {/* PERCENTAGE DIMENSIONS SECTION */}
      <PercentageDimensions />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
});
