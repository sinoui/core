import React, { useState } from 'react';
import Checkbox from '@sinoui/core/Checkbox';

export default function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return <Checkbox checked={checked} onChange={handleChange} />;
}
