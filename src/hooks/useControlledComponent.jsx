import { useState, useEffect, useRef } from 'react';

function useControlledComponent(initialForm) {
  const [form, setForm] = useState(initialForm);
  const ref = useRef(null);
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  }
  // *? Cannot read properties of null (reading 'focus')
  useEffect(() => {
    if (ref) {
      ref.current.focus();
    }
  }, []);
  return { form, ref, setForm, handleChange };
}

export default useControlledComponent;
