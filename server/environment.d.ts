declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'test' | 'production';
            PORT?: string;
            PWD: string;
            HASH_1_SECRET: string;
            DB_HOST: string;
            DB_DATABASE: string;
            DB_USER: string;
            DB_PASSWORD: string;
        }
    }
}

export {}