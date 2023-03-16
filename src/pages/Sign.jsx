import '../style/Sign.scss';
import { useContext } from 'react';
import Context from '../Context';
import useControlledComponent from '../hooks/useControlledComponent';

function Sign() {
  const { isSignOpen, isLoading, alert, toggleSignOpen, signUp, signIn } = useContext(Context);
  const initialForm = {
    email: 'user1@gmail.com',
    password: '111111'
  };
  const { form, ref, setForm, handleChange } = useControlledComponent(initialForm);
  function handleClickPropagation(event) {
    event.stopPropagation();
  }
  function handleSignUp(event) {
    handleClickPropagation(event);
    signUp(form.email, form.password);
    setForm(initialForm);
  }
  function handleSignIn(event) {
    handleClickPropagation(event);
    signIn(form.email, form.password);
    setForm(initialForm);
  }
  return (
    <main
      className={isSignOpen ? 'sign opened' : 'sign'}
      onClick={toggleSignOpen}
      role="presentation">
      <form action="">
        <h1 className="title">
          <span>登入</span>
          <span className="subtitle">|</span>
          <span>註冊</span>
        </h1>
        <label htmlFor="email-sign">
          帳號:
          <input
            ref={ref}
            type="email"
            id="email-sign"
            name="email"
            onChange={handleChange}
            value={form.email}
            onClick={handleClickPropagation}
            placeholder="email"
          />
        </label>
        <label htmlFor="password">
          密碼:
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            onClick={handleClickPropagation}
            placeholder="password"
          />
        </label>
        <div className="buttons">
          <button
            className="form-button sign-button"
            type="button"
            onClick={handleSignIn}
            disabled={isLoading}>
            登入
          </button>
          <button
            className="form-button sign-button"
            type="button"
            onClick={handleSignUp}
            disabled={isLoading}>
            註冊
          </button>
        </div>
        {alert && <h6 className="alert">{alert}</h6>}
      </form>
    </main>
  );
}

export default Sign;
