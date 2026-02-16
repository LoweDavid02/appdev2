import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView } from "react-native";

// Import Flexbox section components
import FlexExample from "./components/FlexExample";
import FlexDirectionExample from "./components/FlexDirectionExample";
import LayoutDirectionExample from "./components/LayoutDirectionExample";
import JustifyContentExample from "./components/JustifyContentExample";
import AlignItemsExample from "./components/AlignItemsExample";
import AlignSelfExample from "./components/AlignSelfExample";
import AlignContentExample from "./components/AlignContentExample";
import FlexWrapExample from "./components/FlexWrapExample";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* FLEX */}
      <FlexExample />

      {/* FLEX DIRECTION */}
      <FlexDirectionExample />

      {/* LAYOUT DIRECTION */}
      <LayoutDirectionExample />

      {/* JUSTIFY CONTENT */}
      <JustifyContentExample />

      {/* ALIGN ITEMS */}
      <AlignItemsExample />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000000",
  },
});
