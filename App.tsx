import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SurveyListScreen from "./screens/SurveyListScreen";
import SurveyDetailScreen from "./screens/SurveyDetailScreen";
import { RootStackParamList } from "./types/navigation";
import "./app/global.css";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SurveyList" component={SurveyListScreen} />
                <Stack.Screen name="SurveyDetail" component={SurveyDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}