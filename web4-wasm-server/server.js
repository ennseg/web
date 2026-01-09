const express = require("express");
const cors = require("cors");
const { execFile } = require("child_process");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/check", (req, res) => {
  const { x, y, r } = req.body;

  execFile(
    "wasmedge",
    ["/wasm/check.wasm", x, y, r],
    (err, stdout) => {
      if (err) {
        res.status(500).send("WASM error");
        return;
      }
      res.json({ result: stdout.trim() === "true" });
    }
  );
});

app.listen(8080, () => console.log("Gateway started on 8080"));
