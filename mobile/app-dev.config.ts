import 'dotenv/config';

export default {
    expo: {
        name: "Ecoleta Dev",
        slug: "ecoleta-development",
        platforms: [
            "ios",
            "android",
            "web"
        ],
        version: "1.0.7-dev",
        orientation: "portrait",
        icon: "./assets/icon-development.png",
        splash: {
            image: "./assets/splash-dev.png",
            resizeMode: "contain",
            backgroundColor: "#414141"
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: [
            "**/*"
        ],
        android: {
            package: "dev.mh4sh.ecoleta.develop",
            versionCode: 7,
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