import { Context, Scenes } from 'telegraf';
import { checkSubscription } from '../utils/checkSubscription';
import { menuKeyboard } from '../keyboards';

export async function startHandler(ctx: any) {
  if (ctx.startPayload) {
    ctx.session ??= {};
    (ctx.session as any).ref = ctx.startPayload;
  }
  const subscribed = await checkSubscription(ctx);
  if (!subscribed) {
    return;
  }
  await ctx.reply('Добро пожаловать!', menuKeyboard());
}
