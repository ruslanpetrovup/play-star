import { Context } from 'telegraf';

export async function checkSubscription(ctx: Context & { state: any }): Promise<boolean> {
  if (!ctx.state.referralId) {
    let payload: string | undefined;
    if ("startPayload" in ctx && ctx.startPayload) {
      payload = ctx.startPayload as unknown as string;
    } else if ((ctx.message as any)?.text) {
      const text = (ctx.message as any).text as string;
      const match = text.match(/^\/start\s+(.+)/);
      if (match) payload = match[1];
    }
    if (payload) {
      const match = payload.match(/start_id=([^\s]+)/);
      ctx.state.referralId = match ? match[1] : payload;
    }
  }
  const channel = process.env.CHANNEL_USERNAME as string;
  if (!channel) return true;
  try {
    const userId = ctx.from?.id;
    if (!userId) return false;
    const member = await ctx.telegram.getChatMember(channel, userId);
    const status = ['creator', 'administrator', 'member'].includes(member.status);
    if (!status) {
      await ctx.reply(`Пожалуйста, подпишитесь на канал ${channel}`);
    }
    return status;
  } catch (e) {
    await ctx.reply(`Ошибка проверки подписки. Попробуйте позже.`);
    return false;
  }
}
