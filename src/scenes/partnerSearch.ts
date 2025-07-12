import { Scenes, Markup } from 'telegraf';
import { checkSubscription } from '../utils/checkSubscription';

export const partnerSearchScene = new Scenes.WizardScene<any>(
  'partnerSearch',
  async (ctx) => {
    const subscribed = await checkSubscription(ctx);
    if (!subscribed) {
      return ctx.scene.leave();
    }
    await ctx.reply('Выберите игру', Markup.keyboard(['Game 1', 'Game 2']).oneTime().resize());
    return ctx.wizard.next();
  },
  async (ctx) => {
    (ctx.wizard.state as any).game = (ctx.message as any)?.text;
    await ctx.reply('Выберите возрастной диапазон', Markup.keyboard(['До 17', '18-22', '22-25', '25+']).oneTime().resize());
    return ctx.wizard.next();
  },
  async (ctx) => {
    (ctx.wizard.state as any).age = (ctx.message as any)?.text;
    await ctx.reply('Выберите уровень партнёрши', Markup.keyboard(['Базовый', 'Средний', 'Профессиональный']).oneTime().resize());
    return ctx.wizard.next();
  },
  async (ctx) => {
    (ctx.wizard.state as any).skill = (ctx.message as any)?.text;
    await ctx.reply('Укажите дату и время');
    return ctx.wizard.next();
  },
  async (ctx) => {
    (ctx.wizard.state as any).datetime = (ctx.message as any)?.text;
    const summary = `Игра: ${(ctx.wizard.state as any).game}\nВозраст: ${(ctx.wizard.state as any).age}\nСкил: ${(ctx.wizard.state as any).skill}\nКогда: ${(ctx.wizard.state as any).datetime}`;
    await ctx.reply(`Спасибо! Данные отправлены администратору.\n${summary}`);
    const ref = ctx.state?.referralId ? `\nРеферал: ${ctx.state.referralId}` : '';
    await ctx.telegram.sendMessage(
      process.env.ADMIN_ID as string,
      `Новая заявка:\n${summary}\nПользователь: @${ctx.chat.username}${ref}`
    );
    return ctx.scene.leave();
  }
);
