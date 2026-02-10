import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function ProfileDemo() {
  return (
    <ScrollView style={styles.container}>

      {/* Cover Photo */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1503264116251-35a269479413',
        }}
        style={styles.coverPhoto}
      />

      {/* Profile Picture */}
      <View style={styles.profilePicWrapper}>
        <Image
          source={require('./assets/profile.jpg')}
          style={styles.profilePic}
        />
      </View>

      {/* Name & Bio */}
      <View style={styles.profileInfo}>
        <Text style={styles.name}>Lowe David Tubat</Text>
        <Text style={styles.bio}>
          💻 BSIS 3-B • Web Developer & UI/UX Designer • Coding Enthusiast
        </Text>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📌 About</Text>

        <Text style={styles.row}>🎓 Course & Section: BSIS 3-B</Text>
        <Text style={styles.row}>🎂 Age: 23</Text>
        <Text style={styles.row}>
          ❤️ Hobby: Web Development & Coding
        </Text>
      </View>

      {/* Bio Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📝 Bio</Text>
        <Text style={styles.text}>
          I am a passionate BSIS student who enjoys building web and mobile
          applications. I love learning new technologies and improving my
          programming skills.
        </Text>
      </View>

      {/* Pet Peeves */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>😤 Pet Peeves</Text>
        <Text style={styles.text}>• Talking loudly during discussions</Text>
        <Text style={styles.text}>• Not participating in group activities</Text>
        <Text style={styles.text}>• Being late without valid reasons</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e6eb',
  },

  coverPhoto: {
    width: '100%',
    height: 200,
  },

  profilePicWrapper: {
    alignItems: 'center',
    marginTop: -60,
  },

  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },

  profileInfo: {
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 15,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  bio: {
    fontSize: 14,
    color: '#65676b',
    marginTop: 5,
    textAlign: 'center',
  },

  editButton: {
    marginTop: 10,
    backgroundColor: '#1877f2',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },

  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    borderRadius: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  row: {
    fontSize: 16,
    marginBottom: 6,
  },

  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});
