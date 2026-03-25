import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CaptureScreen() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      if (!imageUri) return;
      setImageUri(null);
    }, []),
  );
  useEffect(() => {
    const backAction = () => {
      router.back(); // go to home
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => subscription.remove();
  }, []);

  const pickImage = async () => {
    if (cameraLoading) return;

    setCameraLoading(true);

    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Camera access is needed");
      setCameraLoading(false);
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }

    setCameraLoading(false);
  };

  const pickGallery = async () => {
    if (galleryLoading) return;

    setGalleryLoading(true);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }

    setGalleryLoading(false);
  };

  const analyze = () => {
    router.push({
      pathname: "/processing",
      params: { imageUri },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Error</Text>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <TouchableOpacity
        style={[styles.btn, cameraLoading && styles.disabled]}
        onPress={pickImage}
        disabled={cameraLoading || galleryLoading}
      >
        <Text style={styles.btnText}>
          {cameraLoading ? "Opening Camera..." : "Open Camera"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, galleryLoading && styles.disabled]}
        onPress={pickGallery}
        disabled={cameraLoading || galleryLoading}
      >
        <Text style={styles.btnText}>
          {galleryLoading ? "Loading..." : "Upload Screenshot"}
        </Text>
      </TouchableOpacity>

      {imageUri && (
        <TouchableOpacity
          style={[styles.analyzeBtn, !imageUri && { opacity: 0.5 }]}
          disabled={!imageUri || cameraLoading || galleryLoading}
          onPress={analyze}
        >
          <Text style={styles.btnText}>Analyze</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: { color: "#38bdf8", fontSize: 24 },
  image: { width: 250, height: 150, borderRadius: 10 },
  btn: {
    backgroundColor: "#334155",
    padding: 12,
    borderRadius: 10,
  },
  analyzeBtn: {
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 10,
  },
  btnText: { color: "#fff" },
});
