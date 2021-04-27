declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    JWT_SECRET: string;
    REFRESH_SECRET: string;
    ATLAS_URI: string;
    AWS_KEY_ID: string;
    AWS_KEY: string;
    AWS_REGION: string;
    BUCKET: string;
  }
}
