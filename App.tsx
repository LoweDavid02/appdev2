import { useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import TodoScreen from "./screens/TodoScreen";
import CompletionScreen from "./screens/CompletionScreen";

const CONVEX_URL = process.env.EXPO_PUBLIC_CONVEX_URL ?? "";

/**
 * Returns true when the URL looks like a real, reachable Convex cloud deployment.
 * Placeholder / localhost values are treated as "not configured".
 */
function isRealConvexUrl(url: string): boolean {
  if (!url) return false;
  try {
    const { hostname } = new URL(url);
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname.includes("your-deployment") ||
      hostname.endsWith(".local")
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

const useConvexBackend = isRealConvexUrl(CONVEX_URL);

const convex = useConvexBackend
  ? new ConvexReactClient(CONVEX_URL, { unsavedChangesWarning: false })
  : null;

export default function App() {
  const [showCompletion, setShowCompletion] = useState(true);

  if (showCompletion) {
    return <CompletionScreen onContinue={() => setShowCompletion(false)} />;
  }

  if (!convex) {
    return <TodoScreen />;
  }

  return (
    <ConvexProvider client={convex}>
      <TodoScreen />
    </ConvexProvider>
  );
}
