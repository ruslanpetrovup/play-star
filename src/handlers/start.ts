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
  await ctx.reply("Добро пожаловать!", menuKeyboard());
}
