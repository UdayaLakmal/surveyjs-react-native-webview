import { useMemo } from "react";
import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";

StylesManager.applyTheme("defaultV2");

export default function App() {
    const survey = useMemo(() => {
        const json = {
            title: "Demo",
            elements: [
                { type: "text", name: "email", title: "Your email:" },
                { type: "rating", name: "satisfaction", title: "How satisfied are you?" }
            ]
        };
        const m = new Model(json);
        // post results back to RN WebView
        m.onComplete.add(sender => {
            const payload = JSON.stringify(sender.data);
            // WebView bridge (will be undefined in a normal browser — that’s ok)
            (window as any).ReactNativeWebView?.postMessage(payload);
            console.log("Survey complete:", payload);
        });
        return m;
    }, []);

    return <div style={{ padding: 16 }}><Survey model={survey} /></div>;
}