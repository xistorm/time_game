import { useState } from 'react';


export const useInput = (startValue = '') => {
    const [value, setValue] = useState(startValue);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
    }

    return [value, handleChange];
}