import express from "express";
import cors from "cors";
import router from "./routes/router.js";

const main = async () => {
  const app = express();

  app.use(express.json());

  app.use(cors());
  app.use(router);
  app.use("/", express.static("public"));

  const PORT = 6500;

  app.get("/hello", (req, res) => {
    res.status(200).json({ message: "Hello World 👋" });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

main().catch((e) => console.error(e));
