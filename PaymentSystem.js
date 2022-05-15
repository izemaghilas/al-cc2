
async function cacheChargeDetails(idempotencyKey, chargeDetails, redisClient) {
    try {
        await redisClient.set(idempotencyKey, JSON.stringify(chargeDetails));
    } catch (error) {
        throw error;
    }
}

async function chargeUser(paymentDetails, idempotencyKey, redisClient) {
    let chargeDetails = {
        amount: paymentDetails.amount,
        customer: paymentDetails.customer,
        chargedAt: new Date(),
        status: "succeeded"
    };
    
    try {
        const data = await redisClient.get(idempotencyKey);
        if(data){
            // cache hit
            chargeDetails = JSON.parse(data);
        }
        else {
            // cache miss
            cacheChargeDetails(idempotencyKey, chargeDetails, redisClient);
        }
    } catch (error) {
        throw error;
    }
    
    return chargeDetails;
}

module.exports = {
    chargeUser: chargeUser
};