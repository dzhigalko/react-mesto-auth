import {useEffect, useState} from "react";
import authApi from "../../utils/authApi";
import {Link, useNavigate, useOutletContext} from "react-router-dom";
import useForm from "../../hooks/useForm";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import fail from "../../images/fail.svg"

export default function Login({onSignIn}) {
  const { setMenu } = useOutletContext()
  const navigate = useNavigate()
  const {formState, handleChange} = useForm({
    email: true,
    password: true
  })
  const [isErrorTooltopOpen, setErrorTooltipOpen] = useState(false)

  useEffect(() => {
    setMenu([
      <Link className="header__sign" to="/sign-up">Регистрация</Link>
    ])
  }, [setMenu])

  function handleSubmit(e) {
    e.preventDefault()

    authApi.signin(formState.values.email, formState.values.password).then((data) => {
      onSignIn(data)
      navigate("/")
    }).catch(() => setErrorTooltipOpen(true))
  }

  return (
    <>
      <InfoTooltip isOpen={isErrorTooltopOpen} icon={fail} text="Что-то пошло не так! Попробуйте ещё раз."
                   onClose={() => setErrorTooltipOpen(false)}/>
      <section className="login login__page">
        <h2 className="login__title">Вход</h2>
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
            Войти
          </button>
        </form>
      </section>
    </>
  )
}