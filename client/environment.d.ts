declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'test' | 'production';
            PORT?: string;
            PWD: string;
            VERCEL_URL: 'develop-ecoleta.marconwillian.dev' | 'ecoleta.marconwillian.dev';
        }
    }
}

export {}