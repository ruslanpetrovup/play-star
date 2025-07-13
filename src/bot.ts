import { Telegraf, Context, Scenes, session } from 'telegraf';
import dotenv from 'dotenv';
import { pool } from './db';
import { startHandler } from './handlers/start';
import { menuHandler } from './handlers/menu';
import { partnerSearchScene } from './scenes/partnerSearch';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN not provided');
}

const bot = new Telegraf(BOT_TOKEN);

const stage = new Scenes.Stage([partnerSearchScene]);

bot.use(session());
bot.use(stage.middleware());

bot.start(startHandler);

bot.command('menu', menuHandler);
// handlers
bot.hears("Поиск партнерши", (ctx) => (ctx as any).scene.enter("partnerSearch"));
bot.hears("Поддержка", (ctx) => ctx.reply(`Свяжитесь с менеджером: ${process.env.MANAGER_URL}`));
bot.hears("Правила использования", (ctx) => ctx.reply(require("./constants/rules").RULES));


bot.launch().then(() => console.log('Bot started'));

process.once('SIGINT', () => {
  pool.end();
  bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
  pool.end();
  bot.stop('SIGTERM');
});
