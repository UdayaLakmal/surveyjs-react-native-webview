// screens/SurveyDetailScreen.tsx
import React, { useMemo, useRef } from "react";
import {View, Text, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import {getMetroSourceType} from "babel-preset-expo/build/common";

type Props = NativeStackScreenProps<RootStackParamList, "SurveyDetail">;

export default function SurveyDetailScreen({ navigation, route }: Props) {
    const { survey } = route.params;
    const webRef = useRef<WebView>(null);

    console.log("Loaded survey:", survey.title);
    console.log("Loaded survey:", JSON.stringify(survey.json));
    // Put the chosen survey JSON into window BEFORE the page runs

    const injectedJSBefore = useMemo(
        () => `
      window.__SURVEY_JSON__ = ${typeof survey.survey === "string" ? survey.survey : JSON.stringify( survey.json)};
      true;
    `,
        [survey.json]
    );


    const onMessage = (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            console.log("Survey result:", data);
            //Show Alert and when confirmed go back
            try {
                const data = JSON.parse(event.nativeEvent.data);
                console.log("Survey result:", data);
                Alert.alert(
                    "Survey submitted",
                    "Your responses have been received." + JSON.stringify(data),
                    [
                        {
                            text: "OK",
                            onPress: () => {
                               navigation.goBack();
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } catch {
                console.log("WebView says:", event.nativeEvent.data);
            }
        } catch {
            console.log("WebView says:", event.nativeEvent.data);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-4 py-3 border-b border-neutral-200">
                <Text className="text-xl font-semibold">{survey.title}</Text>
            </View>
            <View className="flex-1">
                <WebView
                    ref={webRef}
                    originWhitelist={["*"]}
                    source={require("../assets/survayjs/index.html")}
                    onMessage={onMessage}
                    javaScriptEnabled
                    domStorageEnabled
                    mixedContentMode="always"
                    injectedJavaScriptBeforeContentLoaded={injectedJSBefore}
                />
            </View>
        </SafeAreaView>
    );
}
