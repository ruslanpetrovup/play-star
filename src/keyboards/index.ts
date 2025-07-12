import { Markup } from 'telegraf';

export const menuKeyboard = () =>
  Markup.keyboard([
    [{ text: 'Поиск партнерши' }],
    [{ text: 'Поддержка' }],
    [{ text: 'Правила использования' }]
  ]).resize();
