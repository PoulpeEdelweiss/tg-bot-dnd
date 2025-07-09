const { Telegraf } = require('telegraf');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const _dirname = __dirname;

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

bot.start((ctx) => {
  ctx.reply('Нажми кнопку, чтобы открыть кубик d20 🎲', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть d20 🎲',
            web_app: { url: "https://dnd20.vercel.app"} 
          }
        ]
      ]
    }
  });
});

// Подключаем webhook
app.use(bot.webhookCallback('/bot'));
app.listen(process.env.PORT, async () => {
  console.log(`Сервер запущен на порту ${process.env.PORT}`);
  const WebHookUrl = `${process.env.WEBHOOK_DOMAIN}/bot.js`;
  await bot.telegram.setWebhook(WebHookUrl);
  console.log(`Webhook установлен: ${WebHookUrl}`);
});
