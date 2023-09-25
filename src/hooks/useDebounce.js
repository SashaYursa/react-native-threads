
import { useEffect, useState } from 'react'

const useDebounce = (value, delay, setButtonDisable) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
        setButtonDisable(true);
      const timer = setTimeout(() => {
        setDebouncedValue(value);
        setButtonDisable(false);
      }, delay);
  
      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);
  
    return debouncedValue;
  }
  
  export default useDebounce;