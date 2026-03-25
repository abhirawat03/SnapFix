import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Markdown from "react-native-markdown-display";

export default function ResultScreen() {
  const { result } = useLocalSearchParams();
  const router = useRouter();
  const cleanText = (text) => {
    return text
      ?.replace(/\\n/g, "\n")
      ?.replace(/\r/g, "")
      ?.replace(/^[n]+##/gm, "##")
      ?.trim();
  };
  useEffect(() => {
    const backAction = () => {
      router.replace("/"); // go to home
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => subscription.remove();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>✨ Scan Result</Text>

      <Markdown style={markdownStyles}>{cleanText(result || "")}</Markdown>

      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.8}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.btnText}>🔄 Scan Again</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#020617",
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },

  title: {
    color: "#38bdf8",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  sectionContainer: {
    gap: 18,
  },

  card: {
    backgroundColor: "#0f172a",
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1e293b",

    // subtle elevation
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  sectionTitle: {
    color: "#7dd3fc",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    letterSpacing: 0.5,
  },

  text: {
    color: "#e2e8f0",
    lineHeight: 20,
    fontSize: 14,
  },

  codeBox: {
    backgroundColor: "#020617",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  codeText: {
    color: "#22c55e",
    fontFamily: "monospace",
    fontSize: 13,
  },

  btn: {
    marginTop: 30,
    backgroundColor: "#38bdf8",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",

    shadowColor: "#38bdf8",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  btnText: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "600",
  },
});
const markdownStyles = {
  body: {
    color: "#e2e8f0",
  },

  heading2: {
    color: "#38bdf8",
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },

  code_block: {
    backgroundColor: "#020617",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  code_inline: {
    backgroundColor: "#020617",
    color: "#22c55e",
    paddingHorizontal: 4,
  },

  fence: {
    backgroundColor: "#020617",
    padding: 12,
    borderRadius: 10,
  },

  paragraph: {
    marginBottom: 10,
    lineHeight: 20,
  },

  list_item: {
    marginBottom: 6,
  },
};
