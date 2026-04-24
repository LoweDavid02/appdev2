import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ─── Code sections shown on the completion screen ───────────────────────────
const CODE_SECTIONS = [
  {
    label: "DB Schema",
    icon: "server-outline" as const,
    code: `defineSchema({\n  todos: defineTable({\n    text: v.string(),\n    isCompleted: v.boolean(),\n  }),\n});`,
  },
  {
    label: "Query (get)",
    icon: "search-outline" as const,
    code: `export const get = query({\n  args: {},\n  handler: async (ctx) =>\n    ctx.db.query("todos")\n      .order("desc").take(100),\n});`,
  },
  {
    label: "Mutation (add)",
    icon: "add-circle-outline" as const,
    code: `export const add = mutation({\n  args: { text: v.string() },\n  handler: async (ctx, args) =>\n    ctx.db.insert("todos", {\n      text: args.text,\n      isCompleted: false,\n    }),\n});`,
  },
  {
    label: "Mutation (toggle)",
    icon: "checkmark-circle-outline" as const,
    code: `export const toggle = mutation({\n  args: {\n    id: v.id("todos"),\n    isCompleted: v.boolean(),\n  },\n  handler: async (ctx, args) =>\n    ctx.db.patch(args.id, {\n      isCompleted: args.isCompleted,\n    }),\n});`,
  },
  {
    label: "Mutation (remove)",
    icon: "trash-outline" as const,
    code: `export const remove = mutation({\n  args: { id: v.id("todos") },\n  handler: async (ctx, args) =>\n    ctx.db.delete(args.id),\n});`,
  },
  {
    label: "React Hook (useQuery)",
    icon: "flash-outline" as const,
    code: `const todoList = useQuery(api.todos.get);`,
  },
  {
    label: "React Hook (useMutation)",
    icon: "pencil-outline" as const,
    code: `const addTodo = useMutation(api.todos.add);\nconst toggleTodo = useMutation(api.todos.toggle);\nconst removeTodo = useMutation(api.todos.remove);`,
  },
];

// ─── Live clock ─────────────────────────────────────────────────────────────
function useLiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

// ─── Component ───────────────────────────────────────────────────────────────
type Props = { onContinue: () => void };

export default function CompletionScreen({ onContinue }: Props) {
  const now = useLiveClock();

  return (
    <View style={styles.root}>
      {/* ── Fixed header ── */}
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Ionicons name="checkmark-done" size={16} color="#7D7AFF" />
            <Text style={styles.badgeText}>Project Complete</Text>
          </View>
        </View>

        {/* Name */}
        <Text style={styles.name}>Lowe David C. Tubat</Text>
        <Text style={styles.course}>BSIT — AppDev 2</Text>

        {/* Live date / time */}
        <View style={styles.clockCard}>
          <Ionicons name="time-outline" size={18} color="#7D7AFF" />
          <View style={styles.clockTexts}>
            <Text style={styles.clockDate}>{formatDate(now)}</Text>
            <Text style={styles.clockTime}>{formatTime(now)}</Text>
          </View>
        </View>
      </View>

      {/* ── Scrollable code sections ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionHeading}>
          <Ionicons name="code-slash-outline" size={15} color="#7D7AFF" />
          {"  "}Project Code
        </Text>

        {CODE_SECTIONS.map((s) => (
          <View key={s.label} style={styles.codeCard}>
            <View style={styles.codeCardHeader}>
              <Ionicons name={s.icon} size={16} color="#7D7AFF" />
              <Text style={styles.codeCardLabel}>{s.label}</Text>
            </View>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{s.code}</Text>
            </View>
          </View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* ── CTA button ── */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={onContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>Open Todo App</Text>
          <Ionicons name="arrow-forward" size={20} color="#1A1A2E" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F8F7FF",
  },

  // Header
  header: {
    backgroundColor: "#7D7AFF",
    paddingTop: 64,
    paddingHorizontal: 28,
    paddingBottom: 28,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  badgeRow: {
    flexDirection: "row",
    marginBottom: 18,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7D7AFF",
    letterSpacing: 0.4,
  },
  name: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFF",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  course: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 0.4,
    marginBottom: 20,
  },
  clockCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: "#5553C7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  clockTexts: {
    flex: 1,
  },
  clockDate: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },
  clockTime: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A2E",
    letterSpacing: 0.5,
    marginTop: 2,
  },

  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7D7AFF",
    letterSpacing: 0.5,
    marginBottom: 14,
    textTransform: "uppercase",
  },

  // Code cards
  codeCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEEEFF",
    shadowColor: "#7D7AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  codeCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EFFF",
    backgroundColor: "#FAFAFF",
  },
  codeCardLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2D2D4E",
    letterSpacing: 0.2,
  },
  codeBlock: {
    backgroundColor: "#1A1A2E",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  codeText: {
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    fontSize: 11.5,
    color: "#C8C6FF",
    lineHeight: 18,
  },

  // Footer
  bottomSpacer: { height: 16 },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 36,
    paddingTop: 12,
    backgroundColor: "#F8F7FF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEFF",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFCC00",
    borderRadius: 18,
    height: 56,
    gap: 10,
    shadowColor: "#FFCC00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A2E",
    letterSpacing: 0.3,
  },
});

// Need Platform for font family
import { Platform } from "react-native";
