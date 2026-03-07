import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      {/* 1. Top Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}></Text>
      </View>

      {/* 2. Middle Section */}
      <View style={styles.middleSection}>
        <Image
          source={require("./../../assets/welcome.png")}
          style={styles.image}
        />
      </View>

      {/* 3. Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.footerText}></Text>
          <TouchableOpacity>
            <Text style={styles.loginLink}></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7D7AFF",
    paddingTop: 80,
    paddingHorizontal: 30,
  },
});
