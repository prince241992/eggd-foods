
import { useState } from 'react';

export const useOrderBumps = () => {
  const [selectedOrderBumps, setSelectedOrderBumps] = useState<number[]>([]);

  const toggleOrderBump = (id: number) => {
    setSelectedOrderBumps(prev =>
      prev.includes(id)
        ? prev.filter(bumpId => bumpId !== id)
        : [...prev, id]
    );
  };

  return {
    selectedOrderBumps,
    toggleOrderBump
  };
};
