import { useEffect, useMemo, useRef, useState } from "react";
import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";

StylesManager.applyTheme("defaultV2");

type AnyJson = Record<string, any>;

function buildModel(json: AnyJson, onComplete?: (data: AnyJson) => void) {
    const m = new Model(json);
    if (onComplete) {
        m.onComplete.add(sender => {
            const payload = JSON.stringify(sender.data);
            // Send to RN if available
            (window as any).ReactNativeWebView?.postMessage(payload);
            console.log("Survey complete:", payload);
            onComplete(sender.data);
        });
    }
    return m;
}

export default function App() {
    // 1) Read initial JSON injected by RN (optional)
    const initialJson =
        (window as any).__SURVEY_JSON__ ??
        {
            title: "Demo",
            elements: [
                { type: "text", name: "email", title: "Your email:" },
                { type: "rating", name: "satisfaction", title: "How satisfied are you?" }
            ]
        };

    // Keep model in state so we can swap it on RN messages
    const [model, setModel] = useState(() =>
        buildModel(initialJson, (data) => console.log("Completed with:", data))
    );

    // 2) Listen for messages from RN to update the survey JSON live
    useEffect(() => {
        const handler = (event: MessageEvent) => {
            try {
                const msg = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
                if (msg?.type === "setSurvey") {
                    const nextJson = msg.payload;
                    const nextModel = buildModel(nextJson, (data) => console.log("Completed with:", data));
                    setModel(nextModel);
                }
            } catch (e) {
                console.warn("Failed to parse message from RN:", e);
            }
        };

        // react-native-webview sends on window; older Android also fires on document
        window.addEventListener("message", handler);
        // @ts-ignore
        document.addEventListener("message", handler);

        return () => {
            window.removeEventListener("message", handler);
            // @ts-ignore
            document.removeEventListener("message", handler);
        };
    }, []);

    return (
        <div style={{ padding: 16 }}>
            <Survey model={model} />
        </div>
    );
}