import { AestheticType } from '../../types/aesthetic';

/**
 * Resolves the aesthetic type for a given username by consulting the user service.
 * Hardcoded fallbacks can be replaced by Redux state resolution if fetched simultaneously in components.
 */
export const resolveAesthetic = (userAesthetic?: AestheticType | null): AestheticType => {
  if (!userAesthetic) return 'noir'; // default
  
  const validAesthetics: AestheticType[] = ['noir', 'minimal', 'vaporwave', 'brutalist', 'grunge', 'cyberpunk'];
  
  if (validAesthetics.includes(userAesthetic)) {
    return userAesthetic;
  }
  
  return 'noir';
};