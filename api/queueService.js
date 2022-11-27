import { rabbitConnect } from "./deps.js";
import { grade } from "./grade.js";
import { saveUserGrade } from './userGradeService.js'; 
import { redisClient, getCodeHash } from './redisClient.js'; 

const url = 'amqp://guest:guest@rabbitmq:5672';
const queueName = "submitted.tasks.queue";

const connection = await rabbitConnect(url) 
const channel = await connection.openChannel();
await channel.declareQueue({ queue: queueName });

export const publish = async ({ code, userId, exerciseId }) => {
  try { 
    console.log("connection created success", userId, exerciseId)
    await channel.publish(
      { routingKey: queueName },
      { contentType: "application/json" },
      new TextEncoder().encode(JSON.stringify({ code, userId, exerciseId })),
    );
    console.log('Message published');

  } catch (e) {
    console.error('Error in publishing message', e);
  }
};

export const publishResultToWs = ({userId, exerciseId, result}) => {
  fetch(`http://ws-grader-service:7779/grade?${userId}&${exerciseId}&${result}`);
};

export const startConsume = async () => {
  try {
    //await channel.declareQueue({ queue: queueName });
    console.log("connection created success")
    await channel.consume(
      { queue: queueName },
      async (args, props, data) => {
        console.log(JSON.stringify(args));
        console.log(JSON.stringify(props));
        const { userId, exerciseId, code } = JSON.parse(new TextDecoder().decode(data));
        const result = await grade(code)
        // Save to the database 
        await saveUserGrade(userId, exerciseId, result)
        
        // Cache the graded result 
        redisClient.set(getCodeHash(exerciseId, code), result); 
        
        publishResultToWs({ userId, exerciseId, result });
        await channel.ack({ deliveryTag: args.deliveryTag });
      },
    );
  } catch (e) {
    console.error('Error in consuming message', e);
  }
}
