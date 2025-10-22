import React, { useMemo, useRef, useEffect } from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {  View, Text } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
    const webRef = useRef<WebView>(null);

    // Example: your survey JSON from RN (could be state, props, fetched, etc.)
    const surveyJson = useMemo(
        () => ({
            title: "Customer Feedback",
            elements: [
                { type: "text", name: "name", title: "Your name:" },
                { type: "rating", name: "nps", title: "How likely to recommend us?" },
                { type: "comment", name: "comment", title: "Any comments?" }
            ]
        }),
        []
    );

    // A) Inject initial JSON before the page executes
    const injectedJSBefore = `
    window.__SURVEY_JSON__ = ${JSON.stringify(surveyJson)};
    true; // <- required by react-native-webview
  `;

    // B) (Optional) Send live updates later (e.g., after fetch or user action)
    // Call this whenever you want to replace the survey:
    const sendSurveyToWeb = (json: object) => {
        const msg = JSON.stringify({ type: "setSurvey", payload: json });
        webRef.current?.postMessage(msg);
    };

    const onMessage = (event: any) => {
        // Messages coming FROM the web (e.g., survey results)
        try {
            const data = JSON.parse(event.nativeEvent.data);
            console.log("Survey Results:", data);
        } catch {
            console.log("WebView says:", event.nativeEvent.data);
        }
    };



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Survey</Text>
            </View>
            <View style={{ flex: 1 }}>
                <WebView
                    ref={webRef}
                    originWhitelist={["*"]}
                    source={require("./assets/survayjs/index.html")}
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