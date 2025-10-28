// screens/SurveyListScreen.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { surveys, type Survey } from "../constants/data";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "SurveyList">;
};

export default function SurveyListScreen({ navigation }: Props) {
    const handlePress = (survey: Survey) =>
        navigation.navigate("SurveyDetail", { survey });

    const renderItem = ({ item }: { item: Survey }) => (
        <TouchableOpacity
            onPress={() => handlePress(item)}
            className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow"
            activeOpacity={0.8}
        >
            <Text className="text-lg font-semibold">{item.title}</Text>
            {item.description ? (
                <Text className="text-neutral-600 mt-1">{item.description}</Text>
            ) : null}
            <Text className="mt-2 text-blue-600">Tap to start →</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <View className="px-4 py-3">
                <Text className="text-2xl font-bold">Surveys</Text>
            </View>
            <FlatList
                data={surveys}
                keyExtractor={(it) => it.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 24 }}
            />
        </SafeAreaView>
    );
}