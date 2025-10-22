import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-semibold">Hello Tailwind</Text>
      </View>
    </SafeAreaView>
  );
}
