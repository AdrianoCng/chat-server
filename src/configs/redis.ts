import { createClient } from 'redis';
import RedisStore from 'connect-redis';

const redisClient = createClient();
redisClient.connect().catch(e => console.log(e));

const redisStore = new RedisStore({ client: redisClient });

export default redisStore;
