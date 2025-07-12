import { Context } from 'telegraf';
import { checkSubscription } from '../utils/checkSubscription';
import { menuKeyboard } from '../keyboards';

export async function startHandler(ctx: any) {
  if (ctx.startPayload) {
    ctx.state ??= {};
    const match = ctx.startPayload.match(/start_id=([^\s]+)/);
    ctx.state.referralId = match ? match[1] : ctx.startPayload;
  }
  const subscribed = await checkSubscription(ctx);
  if (!subscribed) {
    return;
  }
  await ctx.reply('Добро пожаловать!', menuKeyboard());
}
