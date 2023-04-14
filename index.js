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
  // received user info
  socket.on("userInfo", (userInfo) => {
    console.log("userInfo -> ", userInfo);

    all_users = [...all_users, { id: socket.id, info: userInfo }];
  });

  socket.on("setStatus", (setStatueMsg) => {
    socket.broadcast.emit("broadcast", setStatueMsg);
  });

  // socket.emit("pushStatus", "setStatueMsg");

  console.log("all users -> ", all_users);

  // disconnect
  socket.on("disconnect", () => {
    all_users = all_users.map((users) => users.id !== socket.id);
    console.log("all users -> ", all_users);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO vercel server running at http://localhost:${port}/`);
});
