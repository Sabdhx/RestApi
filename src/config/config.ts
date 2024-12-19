import { config as conf } from "dotenv";
conf()

const _config = {
    port: process.env.PORT,
    mongooseUrl: process.env.mongodbUrl,
    env: process.env.NODE_ENV,
    secret: process.env.secretVar,
    name: process.env.cloud_name,
    key: process.env.api_key,
    api_secret: process.env.api_secret
};

export const config = Object.freeze(_config);