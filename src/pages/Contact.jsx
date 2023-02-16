import '../style/Contact.scss';
import { useState, useEffect, useContext } from 'react';
import useControlledComponent from '../hooks/useControlledComponent';
import Canvas from '../components/canvas/Canvas';
import Context from '../Context';

// *line 41 use htmlFor=""+id="" && put input under label
// *CORS https://ithelp.ithome.com.tw/articles/10267360
function Contact() {
  const { user } = useContext(Context);
  const initialForm = {
    name: '',
    email: user ? user.email : '',
    message: ''
  };
  const { form, ref, setForm, handleChange } = useControlledComponent(initialForm);
  const [isDisable, setIsDisable] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmit(true);
    console.log(form);
    setTimeout(() => {
      setIsSubmit(false);
    }, 1500);
    setForm(initialForm);
    // ref.current.focus();
  }
  useEffect(() => {
    if (form.name !== '' && form.email !== '' && form.message !== '') {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [form]);
  useEffect(() => {
    if (user) {
      setForm((prevForm) => ({
        ...prevForm,
        email: user.email
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        email: ''
      }));
    }
  }, [user]);
  return (
    <main className="contact">
      <div className="container">
        <h1 className="title">
          聯絡我們
          <span className="subtitle">| Contact Us</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            姓名:
            <input
              ref={ref}
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              value={form.name}
              placeholder="enter your name"
            />
          </label>
          <label htmlFor="email-contact">
            信箱:
            <input
              id="email-contact"
              type="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              placeholder="enter your email"
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
              rows={window.innerWidth > 576 ? 8 : 6}
              placeholder="messages..."
            />
          </label>
          <button className="form-button contact-button" type="submit" disabled={isDisable}>
            提交
          </button>
        </form>
        <h6 className={isSubmit ? 'alert show' : 'alert'}>表單已提交！</h6>
      </div>
      <Canvas />
    </main>
  );
}

export default Contact;
