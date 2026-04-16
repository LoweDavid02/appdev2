import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bg:        '#0e0e0e',
  surface:   '#1a1a1a',
  border:    '#2e2e2e',
  accent:    '#f5a623',
  accentDim: '#7a5010',
  text:      '#f0ece4',
  muted:     '#6b6560',
  danger:    '#e05252',
  teal:      '#3ecfb2',
};

// ─── Reusable Button ──────────────────────────────────────────────────────────
function Btn({ label, onPress, variant = 'primary' }) {
  const bg =
    variant === 'primary' ? C.accent :
    variant === 'ghost'   ? 'transparent' :
    variant === 'danger'  ? C.danger :
    variant === 'teal'    ? C.teal : C.surface;

  const fg =
    variant === 'primary' ? '#0e0e0e' :
    variant === 'ghost'   ? C.muted :
    variant === 'danger'  ? '#fff' :
    variant === 'teal'    ? '#0e0e0e' : C.text;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.btn, { backgroundColor: bg, borderColor: variant === 'ghost' ? C.border : 'transparent' }]}
    >
      <Text style={[styles.btnText, { color: fg }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function Tag({ label, color = C.accentDim, textColor = C.accent }) {
  return (
    <View style={[styles.tag, { backgroundColor: color }]}>
      <Text style={[styles.tagText, { color: textColor }]}>{label}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

// ─── Section 3: HomeScreen ────────────────────────────────────────────────────
function HomeScreen({ navigation, route }) {
  // Section 13: read param passed back from Details
  const result = route.params?.result;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.heroBlock}>
        <Tag label="SCREEN · HOME" />
        <Text style={styles.heroTitle}>Navigator{'\n'}Demo</Text>
        <Text style={styles.heroSub}>React Navigation · Native Stack · Expo SDK 54</Text>
      </View>
      <Divider />
      {/* Section 13: show result returned from Details */}
      {result ? (
        <View style={styles.resultBadge}>
          <Text style={styles.resultLabel}>↩ RETURNED VALUE</Text>
          <Text style={styles.resultValue}>{result}</Text>
        </View>
      ) : null}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>NAVIGATION</Text>
        {/* Section 6 + 10: navigate with params */}
        <Btn
          label="→  Go to Details"
          onPress={() => navigation.navigate('Details', { itemId: 42, otherParam: 'anything' })}
        />
        {/* Section 14: navigate into nested navigator */}
        <Btn
          label="⊞  Nested Settings"
          variant="teal"
          onPress={() =>
            navigation.navigate('Root', {
              screen: 'Settings',
              params: { user: 'Jane' },
            })
          }
        />
      </View>
    </ScrollView>
  );
}

// ─── Section 4: DetailsScreen ─────────────────────────────────────────────────
function DetailsScreen({ navigation, route }) {
  // Section 10: read params from route.params
  const { itemId, otherParam } = route.params ?? {};

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.heroBlock}>
        <Tag label="SCREEN · DETAILS" color="#1a2e2a" textColor={C.teal} />
        <Text style={[styles.heroTitle, { color: C.teal }]}>Detail{'\n'}View</Text>
      </View>
      <Divider />
      {/* Section 10: display params */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>ROUTE PARAMS</Text>
        <View style={styles.paramRow}>
          <Text style={styles.paramKey}>itemId</Text>
          <Text style={styles.paramVal}>{JSON.stringify(itemId)}</Text>
        </View>
        <View style={styles.paramRow}>
          <Text style={styles.paramKey}>otherParam</Text>
          <Text style={styles.paramVal}>{JSON.stringify(otherParam)}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>NAVIGATION OBJECT</Text>
        {/* Section 7: navigation.navigate() */}
        <Btn
          label="→  navigation.navigate('Home')"
          variant="ghost"
          onPress={() => navigation.navigate('Home')}
        />
        {/* Section 7: navigation.goBack() */}
        <Btn
          label="←  navigation.goBack()"
          variant="ghost"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>NAVIGATE VS PUSH</Text>
        {/* Section 8: navigate() does nothing if already on this screen */}
        <Btn
          label="↻  navigate('Details') — no-op if here"
          variant="ghost"
          onPress={() => navigation.navigate('Details')}
        />
        {/* Section 8: push() always adds a new instance */}
        <Btn
          label="＋  push('Details') — always adds"
          onPress={() => navigation.push('Details')}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>GOING BACK</Text>
        {/* Section 9: goBack() */}
        <Btn
          label="←  goBack()"
          variant="ghost"
          onPress={() => navigation.goBack()}
        />
        {/* Section 9: popToTop() */}
        <Btn
          label="⇤  popToTop()"
          variant="ghost"
          onPress={() => navigation.popToTop()}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>PARAMS</Text>
        {/* Section 12: update params with setParams() */}
        <Btn
          label="✎  setParams({ itemId: 99 })"
          variant="ghost"
          onPress={() => navigation.setParams({ itemId: 99 })}
        />
        {/* Section 13: pass result back to Home */}
        <Btn
          label="↩  Pass result back to Home"
          variant="danger"
          onPress={() => navigation.navigate('Home', { result: 'done' })}
        />
      </View>
    </ScrollView>
  );
}

// ─── Section 14: Nested Navigator ─────────────────────────────────────────────
const RootStack = createNativeStackNavigator();

function SettingsScreen({ route }) {
  const { user } = route.params ?? {};
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <View style={styles.heroBlock}>
        <Tag label="NESTED · SETTINGS" color="#1a2e2a" textColor={C.teal} />
        <Text style={[styles.heroTitle, { color: C.teal }]}>Settings</Text>
      </View>
      <Divider />
      <View style={styles.card}>
        <Text style={styles.cardLabel}>PASSED PARAM</Text>
        <View style={styles.paramRow}>
          <Text style={styles.paramKey}>user</Text>
          <Text style={styles.paramVal}>{user ?? '—'}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function ProfileScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <View style={styles.heroBlock}>
        <Tag label="NESTED · PROFILE" />
        <Text style={styles.heroTitle}>Profile</Text>
      </View>
      <Divider />
      <View style={styles.card}>
        <Text style={styles.cardLabel}>INFO</Text>
        <Text style={styles.paramVal}>Nested navigator screen.</Text>
      </View>
    </ScrollView>
  );
}

function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: C.surface },
        headerTintColor: C.teal,
        headerTitleStyle: { fontWeight: '700', color: C.text },
        contentStyle: { backgroundColor: C.bg },
      }}
    >
      <RootStack.Screen name="Profile" component={ProfileScreen} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
    </RootStack.Navigator>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: C.surface },
          headerTintColor: C.accent,
          contentStyle: { backgroundColor: C.bg },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'MY HOME',
            headerTitleStyle: { fontWeight: '800', letterSpacing: 3, color: C.text },
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'DETAIL VIEW',
            headerTintColor: C.teal,
            headerTitleStyle: { fontWeight: '800', letterSpacing: 3, color: C.text },
          }}
          // Section 11: initialParams — default values when no params are passed
          initialParams={{ itemId: 0, otherParam: 'default' }}
        />
        {/* Section 14: nested navigator as a screen */}
        <Stack.Screen
          name="Root"
          component={RootNavigator}
          options={{
            title: 'NESTED NAV',
            headerTitleStyle: { fontWeight: '800', letterSpacing: 3, color: C.text },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  scrollContent: { padding: 24, paddingBottom: 48, gap: 0 },
  heroBlock: { paddingTop: 8, paddingBottom: 28, gap: 10 },
  heroTitle: { fontSize: 52, fontWeight: '900', color: C.accent, lineHeight: 56, letterSpacing: -1 },
  heroSub: { fontSize: 12, color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase' },
  tag: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, marginBottom: 4 },
  tagText: { fontSize: 10, fontWeight: '700', letterSpacing: 2 },
  divider: { height: 1, backgroundColor: C.border, marginBottom: 28 },
  section: { marginBottom: 24, gap: 10 },
  sectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: C.muted, marginBottom: 4 },
  btn: { paddingVertical: 14, paddingHorizontal: 20, borderRadius: 6, borderWidth: 1, alignItems: 'center' },
  btnText: { fontSize: 13, fontWeight: '700', letterSpacing: 1 },
  card: { backgroundColor: C.surface, borderWidth: 1, borderColor: C.border, borderRadius: 8, padding: 16, marginBottom: 24, gap: 10 },
  cardLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: C.muted, marginBottom: 4 },
  paramRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: C.border },
  paramKey: { fontSize: 13, color: C.muted, fontWeight: '600', letterSpacing: 0.5 },
  paramVal: { fontSize: 13, color: C.text, fontWeight: '700' },
  resultBadge: { backgroundColor: '#1a1500', borderWidth: 1, borderColor: C.accentDim, borderRadius: 6, padding: 14, marginBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resultLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: C.accentDim },
  resultValue: { fontSize: 13, fontWeight: '800', color: C.accent, letterSpacing: 1 },
});
