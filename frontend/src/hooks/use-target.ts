import { useState, useEffect } from 'react';

interface UpdateTargetEventDetail {
  order: number;
}

export function useTarget(): number{
  const [target, setTarget] = useState<number>(0);

  useEffect(() => {
    const handleUpdateTarget: EventListener = (event) => {
      const customEvent = event as CustomEvent<UpdateTargetEventDetail>;
      setTarget(customEvent.detail.order);
    };

    document.addEventListener("updateTarget", handleUpdateTarget);

    return () => {
      document.removeEventListener("updateTarget", handleUpdateTarget);
    };
  }, []);

  return target;
};
