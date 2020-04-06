const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();
app.get("/", (req, res) => res.json({ msg: "This is an API" }));

// Init Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 3000;

// Define Routs
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
