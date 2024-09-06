import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Click to open the web app:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Open Web App', web_app: { url: 'https://invitecodebackend-production.up.railway.app' } }]
        ]
      }
  });
});