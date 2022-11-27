import { delay, serve } from "./deps.js";

const sockets = {};

const createWebSocketConnection = (request, userId) => {
  console.log("Creating WS connection");
  const { socket, response } = Deno.upgradeWebSocket(request);
  
  socket.onopen = () => console.log("Connection created");
  socket.onmessage = (e) => console.log(`Received a message: ${e.data}`);

  socket.onclose = (code, reason) => {
    if(Object.keys(sockets).includes(userId)) {
      console.log("WS closed code: ", code);
      console.log("WS closed reason: ", reason);
      delete sockets[userId];
    }
  };

  socket.onerror = (e) => console.error("WS error:", e);

  sockets[userId] = socket;
  //sockets.add(socket);
  console.log(sockets)
  return response;
};

const handleRequest = async (request) => {
  const {pathname, search } = new URL(request.url);
  const queries = search.substring(1).split('&');
  const userId = queries[0];
  if (pathname === "/grade" && Object.keys(sockets).includes(userId)) {
    console.log('all sockets: ', sockets)
    // try {
    //sockets.forEach((socket) => socket.send(`Pong sent at ${new Date()}`));
    // }
    console.log('socket for the user: ', userId, sockets[userId])
    //sockets.forEach((socket) => socket.send(`Finished grading exercise ${queries[1]}. You got ${queries[2]} mark`));
    
    //sockets[userId].send(`Finished grading exercise ${queries[1]}. You got ${queries[2]} mark`);
    sockets[userId].send(JSON.stringify({ 
      userId,
      exerciseId: queries[1],
      result: queries[2]
    }))
  } else if (pathname === "/connect") {

    return createWebSocketConnection(request, queries[0]);
  }

  return new Response(200);
};

serve(handleRequest, { port: 7779 });
