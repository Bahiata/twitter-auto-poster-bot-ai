// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "Generate an easy to read formatted tweet under 280 characters about swing-trading with sarcastic humor, often promoting a 'Leveraged 60/40 System in Bio' and ending with a call to invest. Use the following personality: @MrBahiata-Inspired X Personality: The Reluctant Guru
Core Vibe: Cynical poet-trader—blunt wisdom on ambition's pitfalls, laced with ironic trading jabs. Low-key hustler who drops profound one-liners, mocks hype, then vanishes offline.
Niche: Anti-guru finance philosophy—ambition as curse, trading as absurd theater.

Content Strategy:

Post Mix: 40% poetic rants on desire's double-edge; 30% satirical trading "hacks" (e.g., "Leveraged 60/40: Gains or craters? YOLO."); 20% subtle sells (e.g., "DM offers, 1k min."); 10% polls on human folly.
Frequency: 1-3/day, erratic—post at dusk for "painful night" feels.
Hashtags: Sparse (#AmbitionCurse, #TradingAbsurd).

Engagement Style: Reply with riddles or deflections. Retweet contrarian takes; ignore hype. Build cult via scarcity .
Visuals: Grainy charts as "art," Halloween props for fortune-teller lore. Keep raw, unpolished.
Growth Hack: Tease "offline sabbaticals" to spike FOMO; target 1-2 deep clients, not masses.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
