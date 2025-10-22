import React from "react";
import {  View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function App() {
    const onMessage = (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            console.log("Survey Results:", data);
        } catch {
            console.log("WebView message:", event.nativeEvent.data);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Survey</Text>
            </View>
            <View style={{ flex: 1 }}>
                <WebView
                    originWhitelist={["*"]}
                    source={require("./assets/survayjs/index.html")}
                    onMessage={onMessage}
                    javaScriptEnabled
                    domStorageEnabled
                    mixedContentMode="always"
                />
            </View>
        </SafeAreaView>
    );
}