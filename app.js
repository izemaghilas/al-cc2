const express = require("express");
const redis = require("redis");

const PaymentSystem = require("./PaymentSystem");

const app = express();
const redisClient = redis.createClient();
const port = 3000;

async function connectToRedisServer() {
    await redisClient.connect();
}
connectToRedisServer();

app.use(express.json());

app.post("/charges", async (req, res)=>{
    const chargeDetails = await PaymentSystem.chargeUser(req.body, req.headers["idempotency-key"], redisClient);
    res.json(chargeDetails);
});

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});