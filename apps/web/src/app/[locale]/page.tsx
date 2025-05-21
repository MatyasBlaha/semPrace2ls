'use client';

import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('base');
  console.log('asdsadasdas')
  return <h1>{t('welcome') ?? 'Vítej!'}</h1>;
}