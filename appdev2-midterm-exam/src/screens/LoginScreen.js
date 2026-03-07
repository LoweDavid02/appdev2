import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* 1. Header Section */}
      <View style={styles.header}>
        <Image
          source={require("./../../assets/login.webp")}
          style={styles.image}
        />
      </View>

      {/* 2. Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.label}></Text>
        <TextInput style={styles.input} placeholder="" />

        <Text style={styles.label}></Text>
        <TextInput style={styles.input} secureTextEntry placeholder="" />

        <TouchableOpacity>
          <Text style={styles.forgotText}></Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}></Text>
        </TouchableOpacity>

        <Text style={styles.orText}></Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="" size={30} color="#DB4437" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="" size={30} color="#4267B2" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text></Text>
          <TouchableOpacity>
            <Text style={styles.linkText}></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
