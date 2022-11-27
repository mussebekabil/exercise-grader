import { serve } from "./deps.js";
import { publish, startConsume, publishResultToWs } from "./queueService.js";
import { getGradesByUserId, getAllGrades, getGradeByUserId, saveUserGrade } from './userGradeService.js'
import { redisClient, getCodeHash } from './redisClient.js';


// Start consuming message from the queue
startConsume();



const successResponse = (body) => {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}
const handleRequest = async (request) => {
  const pathname = new URL(request.url).pathname;

  if (request.method === "POST" && pathname.includes("/grades")) {
    if(request.body) {
      try {
        const { code, userId, exerciseId } = await request.json();
        const codeHash = getCodeHash(exerciseId, code); 
        
        console.log('message-hash: ', codeHash)
        const cached = await redisClient.get(codeHash); 
        if(cached) {
          console.log(cached)
           // Save to the database 
          await saveUserGrade(userId, exerciseId, cached)
          publishResultToWs({ userId, exerciseId, result: cached })
          return;
        }
  
        await publish({ code, userId, exerciseId });
      } catch (e) {
        console.log(e)
        return new Response("Internal Server Error", { status: 500 })
      }
    }
  }
  if(request.method === "GET") {
    if (pathname.includes("/exercises") ) {
      const params = pathname.split('/')
      const userId = params[2];
      const exerciseId = params[4];
      const response = await getGradeByUserId(userId, exerciseId); 

      return successResponse(response);
    } 
    if (pathname.includes("/users")) {
      const userId = pathname.split('/')[2];
      console.log('grade by user id: ', userId)
      const response = await getGradesByUserId(userId); 
      console.log(response)
      return successResponse(response);
    } 
    if(pathname.includes("/grades")) {
      const response = await getAllGrades(); 
      
      return successResponse(response);
    }
  }
  if(request.method === "POST" && pathname.includes("/users")) {
    const { userId, code } = await request.json();
    
    const response = await createUser(userId); 
    return successResponse(response);
  } 

  return new Response(200);
};

serve(handleRequest, { port: 7777 });
