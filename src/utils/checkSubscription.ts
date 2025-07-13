import { Context } from 'telegraf';

export async function checkSubscription(ctx: Context & { state: any }): Promise<boolean> {
  if (!(ctx as any).session?.referralId) {
    if ((ctx as any).startPayload) {
        (ctx as any).session.referralId = (ctx as any).startPayload;
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

