import { config as conf } from "dotenv";
conf()
const _config = {
    port: process.env.PORT,
    mongooseUrl : process.env.mongodbUrl,
    env:process.env.NODE_ENV,
    secret:process.env.secretVar
};
export const config = Object.freeze(_config);