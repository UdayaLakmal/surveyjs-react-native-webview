# surveyjs-react-native-webview

A React Native (Expo) proof-of-concept that renders **SurveyJS** inside a **WebView**, styled with **Tailwind (NativeWind)**.  
This repo also contains a small **React (Vite)** web app (in `/web-survay`) that builds a static SurveyJS page which the RN WebView loads from app assets.

> **Status:** Work in progress (WIP)

---

## ✨ What this shows

- React Native app (Expo) + WebView integration  
- SurveyJS rendered from a bundled HTML (`assets/survayjs/index.html`)  
- Tailwind / NativeWind for RN UI styling  
- Simple path to iterate on the web survey with Vite and ship the built output with the app  

---

## 📁 Project structure

```
.
├─ app/                      # RN app screens/components (Expo Router if used)
├─ assets/
│  └─ survayjs/
│     └─ index.html           # Built SurveyJS page copied here
├─ web-survay/                # Vite + React project for SurveyJS (POC)
│  ├─ src/
│  ├─ index.html
│  └─ vite.config.ts
├─ package.json
├─ README.md
└─ ...
```

> **Note:** The folder is intentionally named `web-survay` and the asset folder `assets/survayjs` to match the current project layout.

---

## ✅ Prerequisites

- Node.js 18+  
- Yarn or npm  
- Expo CLI (`npm i -g expo`) – optional, you can use `npx expo`  

---

## 🚀 Quick start

1. **Install dependencies (root app):**
   ```bash
   npm install
   # or
   yarn
   ```

2. **Set up the web survey (Vite + React):**
   ```bash
   cd web-survay
   npm install
   npm run build
   # copy the built HTML to RN assets
   cp ./dist/index.html ../assets/survayjs/index.html
   cd ..
   ```

3. **Run the RN app (Expo):**
   ```bash
   npx expo start
   ```
   Open on iOS/Android emulator or Expo Go on your device.

---

## 🧩 How it works

- The **Vite web app** in `/web-survay` produces a static `index.html` that includes SurveyJS and your survey definition.  
- After `npm run build`, copy the output HTML to `assets/survayjs/index.html`.  
- The **React Native WebView** loads this local file from assets and displays the survey.  

---

## 🧪 Minimal WebView usage (RN)

Example snippet for your RN screen that loads the local `index.html`:

```tsx
import React from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function SurveyScreen() {
  const source =
    Platform.OS === 'android'
      ? { uri: 'file:///android_asset/survayjs/index.html' }
      : require('../assets/survayjs/index.html'); // iOS bundling via require

  return (
    <WebView
      source={source}
      originWhitelist={['*']}
      allowFileAccess
      allowUniversalAccessFromFileURLs
      javaScriptEnabled
      domStorageEnabled
      onMessage={(e) => {
        console.log('Survey message:', e.nativeEvent.data);
      }}
    />
  );
}
```

---

## 🎨 Tailwind in RN (NativeWind)

If not already configured:

1. Install NativeWind + Tailwind:
   ```bash
   npm install nativewind tailwindcss
   npx tailwindcss init
   ```

2. Add this to **`tailwind.config.js`**:
   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./app/**/*.{js,jsx,ts,tsx}",
       "./components/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

3. Update **`babel.config.js`**:
   ```js
   module.exports = function(api) {
     api.cache(true);
     return {
       presets: ['babel-preset-expo'],
       plugins: ['nativewind/babel'],
     };
   };
   ```

Now use Tailwind classes in RN components via `className`.

---

## 🔁 Development workflow

- Edit your survey UI/logic inside `/web-survay` (React + Vite + SurveyJS).  
- Build and copy:  
  ```bash
  cd web-survay
  npm run build
  cp ./dist/index.html ../assets/survayjs/index.html
  cd ..
  ```
- Reload the Expo app to see updates.  

> 💡 While iterating, you can point the WebView to a dev server URL (e.g., `http://192.168.x.x:5173`) and switch back to the bundled file for production builds.

---

## 🔌 Passing data & capturing results

Inside your Vite app (`/web-survay`):

```js
// inside the web page after completing the survey
window.ReactNativeWebView?.postMessage(
  JSON.stringify({ type: 'SURVEY_COMPLETE', data: survey.data })
);
```

In RN (`WebView onMessage`), parse and handle results (save to state, send to API, etc.).

---

## 🛠️ Scripts

**Root (React Native app):**
- `npx expo start` — start the Expo dev server  

**`/web-survay`:**
- `npm run dev` — Vite dev server (for web debugging)  
- `npm run build` — build static `index.html` (copy to RN assets manually)  

---

## 🧯 Troubleshooting

- **Blank WebView on Android** → Path must be `file:///android_asset/survayjs/index.html`.  
- **iOS requires `require()`** → Use `require('../assets/survayjs/index.html')`.  
- **SurveyJS assets not loading** → Bundle into one `index.html` or use CDN.  
- **CORS issues** → Keep `allowFileAccess` and `allowUniversalAccessFromFileURLs` enabled.  


---

## 📜 License

MIT (or your preferred license)

---

## 🙌 Credits

- [SurveyJS](https://surveyjs.io/)  
- [React Native](https://reactnative.dev/) / [Expo](https://expo.dev/)  
- [NativeWind](https://www.nativewind.dev/)  
- [Vite](https://vitejs.dev/)  

---

## 📝 Notes

- Web app dir: `/web-survay`  
- Built file target: `assets/survayjs/index.html`  

If renamed, update the copy command and WebView source path accordingly.
