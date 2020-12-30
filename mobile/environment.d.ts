declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'test' | 'production';
            MAPS_API_KEY: string;
            SENTRY_API_KEY: string;
        }
    }
}

export {}