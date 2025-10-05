// By VishwaGauravIn (https://itsvg.in)

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Twitter = require("twitter-v2");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Generate a tweet (under 280 chars) as Bahiata, a sarcastic trading anti-advisor. Use dry, edgy humor about options/swing trading, promote 'Leveraged 60/40 Automated System' to avoid emotional damage, end with a call to invest.";
    const result = await model.generateContent(prompt);
    console.log("Gemini full response:", JSON.stringify(result.response, null, 2));
    const tweet = result.response.text().trim() || "Market’s a mess? My 60/40 System’s unfazed. DM to invest. #Trading";
    console.log("Generated tweet:", tweet);
    await client.post("tweets", { text: tweet });
    console.log("Tweet posted!");
  } catch (err) {
    console.error("Error:", err.message, err.stack);
    throw err;
  }
}
run().catch(err => console.error("Run failed:", err.message));
