import 'dotenv/config';


export default {
    expo: {
        name: "Ecoleta",
        slug: "ecoleta",
        platforms: [
            "ios",
            "android",
            "web"
        ],
        version: "1.0.10",
        orientation: "portrait",
        icon: "./assets/icon.png",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
            userInterfaceStyle: "light"
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: [
            "**/*"
        ],
        android: {
            package: "dev.mh4sh.ecoleta",
            versionCode: 10,
            config: {
                googleMaps: {
                    apiKey: process.env.MAPS_API_KEY
                }
            }
        },
        hooks: {
            postPublish: [
                {
                    file: "sentry-expo/upload-sourcemaps",
                    config: {
                        organization: "mh4sh",
                        project: "ecoleta-mobile",
                        authToken: process.env.SENTRY_API_KEY
                    }
                }
            ]
        }
    }
}