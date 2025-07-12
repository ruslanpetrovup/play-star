import { Context, Scenes } from 'telegraf';
import { menuKeyboard } from '../keyboards';

export async function menuHandler(ctx: any) {
  await ctx.reply('Меню', menuKeyboard());
}
