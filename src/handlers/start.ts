import { Context } from "telegraf";
import { checkSubscription } from "../utils/checkSubscription";
import { menuKeyboard } from "../keyboards";

export async function startHandler(ctx: any) {
  if (ctx.startPayload) {
    ctx.state ??= {};
    (ctx as any).session.referralId = ctx.startPayload;
  }
  const subscribed = await checkSubscription(ctx);
  if (!subscribed) {
    return;
  }
  await ctx.reply(`🌟 Добро пожаловать в MimiQuest — бота для поиска игровых напарниц!\n
🔍 Хочешь поиграть в любимую игру с девушкой? Здесь ты найдешь партнёршу на пару часов для фана, ранга или просто общения 🎧\n
🚀 Просто выбери игру, укажи возраст, уровень скилла и когда ты свободен — и бот подберёт подходящую пару.\n
🔒 Мы за честную и уважительную игру. Перед началом, пожалуйста, ознакомься с условиями 👇
`, menuKeyboard());
}
