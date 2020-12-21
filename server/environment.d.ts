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

            HOST: string;
            BUCKET_ENDPOINT: string;

            AWS_REGION: string;
            AWS_SECRET_ACCESS_KEY: string;
            AWS_ACCESS_KEY_ID: string;
            AWS_END_POINT: string;
            
        }
    }
}

export {}