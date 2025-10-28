const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Tell Metro that .html is an asset we want to bundle
config.resolver.assetExts = [...config.resolver.assetExts, 'html'];

module.exports = withNativeWind(config, { input: "./app/global.css" });
