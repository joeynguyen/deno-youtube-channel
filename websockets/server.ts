Deno.serve((req) => {
  // check if the request is a websocket request
  if (req.headers.get("upgrade") !== "websocket") {
    // we only want our server to accept websocket requests
    return new Response(null, { status: 501 });
  }

  // upgrade the HTTP connection to a websocket connection
  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.addEventListener("open", () => {
    console.log("A client just connected");
  });

  socket.addEventListener("message", (event) => {
    if (event.data === "hey") {
      socket.send("yo");
    }
  });

  socket.addEventListener("close", () => {
    console.log("Disconnected!");
  });

  return response;
});
