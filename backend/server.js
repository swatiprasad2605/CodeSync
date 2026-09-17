const app = require("./app");

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`CodeSync Backend running on http://localhost:${PORT}`);
});