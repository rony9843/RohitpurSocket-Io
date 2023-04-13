const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    // origin: [
    //   "https://rony9843.github.io/Queenz-Zone-dashboard/",
    //   "https://rony9843.github.io/",
    //   "https://rony9843.github.io",
    //   "https://queenzzone.online/",
    // ],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const port = process.env.PORT || 5500;

app.get("/", (req, res) => {
  res.send("this is rohitpur socket io server");
});

let all_users = [];

io.on("connection", (socket) => {
  console.log("user connected -> ", socket.id);

  all_users.push(socket.id);

  console.log("all users -> ", all_users);

  // disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected -> ", socket.id);

    socket.emit("hello", "world");

    all_users.pop(socket.id);
    console.log("all users -> ", all_users);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO vercel server running at http://localhost:${port}/`);
});