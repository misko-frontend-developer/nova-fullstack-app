import http from "http";
import app from "./app";

const port = process.env.PORT || "3000";
app.set("port", port);
const server = http.createServer(app);

server.on("error", (error: NodeJS.ErrnoException) => console.error(error));
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
