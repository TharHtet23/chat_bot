import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Set the menu button to open the web app
bot.setMyCommands([
  { command: "/start", description: "Start the bot" },
  { command: "/help", description: "Help" },
  // Add other commands as needed
]);

// Replace the setMenuButton function with this:
async function setChatMenuButton() {
  try {
    await axios.post(`https://api.telegram.org/bot${token}/setChatMenuButton`, {
      menu_button: {
        type: "web_app",
        text: "Open App",
        web_app: { url: "https://invitecodebackend-production.up.railway.app" },
      },
    });
  } catch (error) {
    console.error(
      "Error setting chat menu button:",
      error.response?.data || error.message
    );
  }
}

// Call this function instead of setMenuButton
setChatMenuButton();

// Keep your existing message handlers
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Click to open the web app:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open Web App",
            web_app: {
              url: "https://invitecodebackend-production.up.railway.app",
            },
          },
        ],
      ],
    },
  });
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Here are the available commands:\n/start - Start the bot\n/help - Show help"
  );
});

// Handle data sent from the web app
bot.on("web_app_data", (msg) => {
  const data = JSON.parse(msg.web_app_data.data);
  console.log("Received data from web app:", data);
  // Process the data as needed
});
