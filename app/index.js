import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit App", "Are you sure you want to exit?", [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => subscription.remove();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SnapFix</Text>
      <Text style={styles.subtitle}>
        Scan programming errors and get instant fixes
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/capture")}
      >
        <Text style={styles.buttonText}>Scan Error</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#38bdf8",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#94a3b8",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#38bdf8",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#0f172a",
    fontWeight: "bold",
  },
});
