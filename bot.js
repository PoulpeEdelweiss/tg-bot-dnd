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
            web_app: { url: `${process.env.WEBHOOK_DOMAIN}/d20.html`} 
          }
        ]
      ]
    }
  });
});

// bot.launch();
// console.log('Бот запущен');


// Подключаем webhook
app.use(bot.webhookCallback('/bot'));
app.listen(process.env.PORT, async () => {
  console.log(`Сервер запущен на порту ${process.env.PORT}`);
  const Url = 'https://tg-bot-dnd.onrender.com';
  await bot.telegram.setWebhook(Url);
  console.log(`Webhook установлен: ${Url}`);
});
