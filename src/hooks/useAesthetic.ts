import { useState, useEffect } from 'react';
import { resolveAesthetic } from '../features/aesthetics/aestheticService';
import { AestheticType } from '../types/aesthetic';

export const useAesthetic = (username: string | null) => {
  const [aesthetic, setAesthetic] = useState<AestheticType>('noir');

  useEffect(() => {
    if (username) {
      // Logic for correctly fetching user aesthetic goes here.
      // E.g get username aesthetic property:
      // getUserByUsername(username).then(u => setAesthetic(resolveAesthetic(u.aesthetic)));
      setAesthetic(resolveAesthetic('noir')); // temporary default
    } else {
      setAesthetic('noir');
    }
  }, [username]);

  return aesthetic;
};