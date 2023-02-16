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
  useEffect(() => {
    if (ref && window.innerWidth > 576) {
      ref.current.focus();
    }
  }, []);
  return { form, ref, setForm, handleChange };
}

export default useControlledComponent;
