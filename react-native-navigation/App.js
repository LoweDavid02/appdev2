import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, Text, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

// ─── Section 3: HomeScreen (basic screen) ────────────────────────────────────
function HomeScreen({ navigation, route }) {
  // Section 13: read a param passed back from DetailsScreen
  const result = route.params?.result;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      {/* Section 13: show result passed back from Details */}
      {result ? (
        <Text style={styles.info}>Result from Details: {result}</Text>
      ) : null}

      {/* Section 6: Button that navigates to Details */}
      <Button
        title="Go to Details"
        onPress={() =>
          // Section 10: passing params to Details
          navigation.navigate('Details', { itemId: 42, otherParam: 'anything' })
        }
      />

      {/* Section 14: navigate to nested screen */}
      <Button
        title="Go to Nested Settings"
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'Settings',
            params: { user: 'Jane' },
          })
        }
      />
    </View>
  );
}

// ─── Section 4: DetailsScreen (second screen) ────────────────────────────────
function DetailsScreen({ navigation, route }) {
  // Section 10: read params
  const { itemId, otherParam } = route.params ?? {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>

      {/* Section 10: display params */}
      <Text style={styles.info}>Item ID: {JSON.stringify(itemId)}</Text>
      <Text style={styles.info}>Other Param: {JSON.stringify(otherParam)}</Text>

      {/* Section 7: navigation.navigate() */}
      <Button
        title="Go to Details again (navigate)"
        onPress={() => navigation.navigate('Details')}
      />

      {/* Section 8: navigation.push() adds a new instance */}
      <Button
        title="Push Details again (push)"
        onPress={() => navigation.push('Details')}
      />

      {/* Section 7 & 9: goBack */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />

      {/* Section 9: popToTop */}
      <Button title="Pop to Top" onPress={() => navigation.popToTop()} />

      {/* Section 12: update params */}
      <Button
        title="Update itemId to 99"
        onPress={() => navigation.setParams({ itemId: 99 })}
      />

      {/* Section 13: pass param back to Home */}
      <Button
        title="Pass result back to Home"
        onPress={() => navigation.navigate('Home', { result: 'done' })}
      />
    </View>
  );
}

// ─── Section 14: nested navigator screens ────────────────────────────────────
const RootStack = createNativeStackNavigator();

function SettingsScreen({ route }) {
  const { user } = route.params ?? {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
      <Text style={styles.info}>User: {user}</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
    </View>
  );
}

function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Profile" component={ProfileScreen} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
    </RootStack.Navigator>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // Section 4: set initial route
        initialRouteName="Home"
      >
        {/* Section 5: options prop to customize header */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'My Home',
            headerStyle: { backgroundColor: '#6200ee' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Detail View',
            headerStyle: { backgroundColor: '#03dac6' },
            headerTintColor: '#000',
          }}
          // Section 11: initialParams — default values if none are passed
          initialParams={{ itemId: 0, otherParam: 'default' }}
        />
        {/* Section 14: nested navigator as a screen */}
        <Stack.Screen
          name="Root"
          component={RootNavigator}
          options={{ title: 'Nested Navigator' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
});
