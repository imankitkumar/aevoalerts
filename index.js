const axios = require("axios");
const Bot = require("node-telegram-bot-api");

const botToken = "6627774834:AAEKHO07fL2m7tk_Cu40f8tUwYtrsvjUJ_Q";
const tgId = "@aevolistings";
let listings = [];

const bot = new Bot(botToken, { polling: true });

const sendMessage = (msg,imageUrl) => {
  bot.sendPhoto(tgId, imageUrl, { caption: msg,parse_mode: "HTML" });
};


const updateNewListings = async () => {
  try {
    const response = await axios.get("https://api.aevo.xyz/assets");
    const newListings = response.data;

    const newEntries = newListings.filter(
      (asset) => !listings.includes(asset)
    );

    if (newEntries.length > 0) {
       const message = "<b>New Listings:</b> " + newEntries.join(", ") + "\n<b>Trade now:</b> aevo.xyz";
       const imageUrl =
         "./aevo.png";
       sendMessage(message, imageUrl);
       listings = newListings;
    }
  } catch (error) {
    console.error("error");
  }
};

setInterval(updateNewListings, 2 * 60 * 1000);
