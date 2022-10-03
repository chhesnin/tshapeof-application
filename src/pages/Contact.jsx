import '../style/Contact.scss';
import { useState, useRef, useEffect } from 'react';

// *line 13 use htmlFor=""+id="" && put input under label
// *line 22 https://ithelp.ithome.com.tw/articles/10267360
function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isDisable, setIsDisable] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const inputRef = useRef(null);
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmit(true);
    setTimeout(() => {
      setIsSubmit(false);
    }, 2000);
    setForm({
      name: '',
      email: '',
      message: ''
    });
    inputRef.current.focus();
  }
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    if (form.name !== '' && form.email !== '' && form.message !== '') {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [form]);
  return (
    <main className="contact">
      <div className="container">
        <h1 className="title">
          聯絡我們
          <span>| Contact Us</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            姓名:
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              value={form.name}
              ref={inputRef}
            />
          </label>
          <label htmlFor="email">
            信箱:
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              value={form.email}
            />
          </label>
          <label htmlFor="message">
            想說的話:
            <textarea
              id="message"
              type="text"
              name="message"
              onChange={handleChange}
              value={form.message}
              rows="8"
            />
          </label>
          <button type="submit" disabled={isDisable}>
            提交
          </button>
        </form>
        {isSubmit && <h6 className="alert">表單已提交！</h6>}
      </div>
    </main>
  );
}

export default Contact;
