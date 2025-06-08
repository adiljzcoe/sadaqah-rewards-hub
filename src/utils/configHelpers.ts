
import { AppSetting, ContentItem, BusinessRule } from '@/hooks/useAppConfig';

export const getSettingValue = (settings: AppSetting[] = [], key: string, fallback: string = ''): string => {
  const setting = settings.find(s => s.setting_key === key);
  return setting?.setting_value || fallback;
};

export const getSettingNumber = (settings: AppSetting[] = [], key: string, fallback: number = 0): number => {
  const setting = settings.find(s => s.setting_key === key);
  return setting ? parseFloat(setting.setting_value) : fallback;
};

export const getContent = (content: ContentItem[] = [], key: string, fallback: string = ''): string => {
  const item = content.find(c => c.content_key === key);
  return item?.content_value || fallback;
};

export const getBusinessRule = (rules: BusinessRule[] = [], key: string, fallback: any = null): any => {
  const rule = rules.find(r => r.rule_key === key);
  return rule?.rule_value || fallback;
};

export const formatCurrency = (amount: number, settings: AppSetting[] = []): string => {
  const symbol = getSettingValue(settings, 'currency_symbol', '£');
  return `${symbol}${(amount / 100).toLocaleString()}`;
};

export const formatCurrencyInput = (amount: number, settings: AppSetting[] = []): string => {
  const symbol = getSettingValue(settings, 'currency_symbol', '£');
  return `${symbol}${amount.toLocaleString()}`;
};

export const getDonationLimits = (rules: BusinessRule[] = []) => {
  const limits = getBusinessRule(rules, 'donation_limits', { min: 100, max: 1000000 });
  return {
    min: limits.min || 100,
    max: limits.max || 1000000
  };
};

export const getRewardRates = (rules: BusinessRule[] = []) => {
  const rates = getBusinessRule(rules, 'reward_rates', { jannah_points_per_pound: 10, sadaqah_coins_per_pound: 5 });
  return {
    jannahPointsPerPound: rates.jannah_points_per_pound || 10,
    sadaqahCoinsPerPound: rates.sadaqah_coins_per_pound || 5
  };
};

export const getUserSegmentThresholds = (rules: BusinessRule[] = []) => {
  const thresholds = getBusinessRule(rules, 'user_segments', { 
    active_days: 30, 
    dormant_days: 90, 
    new_user_days: 7, 
    vip_threshold: 100000 
  });
  return {
    activeDays: thresholds.active_days || 30,
    dormantDays: thresholds.dormant_days || 90,
    newUserDays: thresholds.new_user_days || 7,
    vipThreshold: thresholds.vip_threshold || 100000
  };
};
