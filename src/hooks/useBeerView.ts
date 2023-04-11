import { useState } from 'react';

export const useBeerView = (beerView: string) => {
  const [view, setView] = useState<string>(beerView);

  const onViewChange = (value: string) => {
    setView(value);
  };

  return { view, onViewChange };
};
