import { config as conf } from "dotenv";
conf()
const _config = {
    port: process.env.PORT,
    mongooseUrl : process.env.mongodbUrl
};
export const config = Object.freeze(_config);