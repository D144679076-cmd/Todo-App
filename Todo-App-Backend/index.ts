import express from "express";
const app = express();
app.listen(8055, () => {
  console.log("Server started on port 8055");
});
export default app;
