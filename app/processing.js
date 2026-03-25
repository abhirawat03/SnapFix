import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { analyzeImage } from "../services/aiService";

export default function ProcessingScreen() {
  const { imageUri } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const result = await analyzeImage(imageUri);
      router.replace("/result?result=" + encodeURIComponent(result));
    };

    run();
  }, []);
  useEffect(() => {
    const backAction = () => true; // block back

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#38bdf8" />
      <Text style={styles.text}>Analyzing...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", marginTop: 10 },
});
