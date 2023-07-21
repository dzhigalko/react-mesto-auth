import {Link, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import authApi from "../../utils/authApi";
import fail from "../../images/fail.svg"
import success from "../../images/success.svg"
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import useForm from "../../hooks/useForm";


export default function Register() {
  const [infoTooltip, setInfoTooltip] = useState({isOpen: false})
  const {formState, handleChange} = useForm({
    email: true,
    password: true
  })

  const { setMenu } = useOutletContext()

  useEffect(() => {
    setMenu([
      <Link className="header__sign" to="/sign-in">Войти</Link>
    ])
  }, [setMenu])

  function handleSubmit(e) {
    e.preventDefault()

    authApi.signup(formState.values.email, formState.values.password).then(() => {
      setInfoTooltip({
        isOpen: true,
        text: "Вы успешно зарегистрировались!",
        icon: success
      })
    }).catch(() => {
      setInfoTooltip({
        isOpen: true,
        text: "Что-то пошло не так! Попробуйте ещё раз.",
        icon: fail
      })
    })
  }

  return (<>
    <InfoTooltip isOpen={infoTooltip.isOpen} icon={infoTooltip.icon} text={infoTooltip.text}
                 onClose={() => setInfoTooltip({isOpen: false})}/>

    <section className="login login__page">
      <h2 className="login__title">Регистрация</h2>
      <form
        className="login__form"
        name="register-form"
        onSubmit={handleSubmit}
      >
        <input
          required=""
          name="email"
          className="login__input"
          placeholder="Email"
          value={formState.values.email}
          onChange={handleChange}
        />
        <input
          required=""
          name="password"
          className="login__input"
          type="password"
          placeholder="Пароль"
          value={formState.values.password}
          onChange={handleChange}
        />
        <button
          className="login__button"
          type="submit"
          aria-label="Зарегистрироваться"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="login__subtitle">Уже зарегистрированы?
        <Link className="login__subtitle-link" to="/sign-in"> Войти</Link>
      </p>
    </section>
  </>)
}