import { redisConnect, hmac } from './deps.js'; 

const redisClient = await redisConnect({
    hostname: 'cache',
    port: 6379,
  })

const getCodeHash = (exerciseId, code) => {
  return hmac("sha256", `${exerciseId}~${code}`,'exercise@codeKey', "utf8", "base64");
}

export { redisClient, getCodeHash }
