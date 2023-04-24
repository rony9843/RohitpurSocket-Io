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

let all_Status = [];

io.on("connection", (socket) => {
  // received user info
  socket.on("userInfo", (userInfo) => {
    console.log("userInfo -> ", userInfo);

    all_users = [...all_users, { id: socket.id, info: userInfo }];

    console.log("all users -> ", all_users);
  });

  socket.on("setStatus", (setStatueMsg) => {
    console.log("this is one status -> ", setStatueMsg);

    all_Status = [
      ...all_Status,
      { statusId: setStatueMsg.id, status: setStatueMsg.status },
    ];

    console.log("this is one status -> ", all_Status);

    socket.broadcast.emit("broadcast", all_Status);
    // socket.broadcast.emit("getAllStatus", all_Status);
  });

  // socket.emit("pushStatus", "setStatueMsg");

  // disconnect
  socket.on("disconnect", () => {
    all_users = all_users.filter((users) => users.id !== socket.id);
    console.log("all users -> ", all_users);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO vercel server running at http://localhost:${port}/`);
});
