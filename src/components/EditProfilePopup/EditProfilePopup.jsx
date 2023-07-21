import {useContext, useEffect} from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useForm from "../../hooks/useForm";
import PopupInput from "../PopupInput/PopupInput";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const {formState, resetForm, handleChange} = useForm({
    name: true,
    about: true
  })

  useEffect(() => {
    resetForm({
      name: currentUser.name,
      about: currentUser.about
    })
  }, [currentUser, isOpen])
  function handleSubmit(e) {
    e.preventDefault()

    onUpdateUser(formState.values)
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={formState.isFormValid}
    >
      <PopupInput
        required={true}
        name="name"
        type="text"
        placeholder="Ваше имя"
        minLength={2}
        maxLength={40}
        value={formState.values.name}
        onChange={handleChange}
        isValid={formState.validity.name}
        validationMessage={formState.validationMessages.name}
      />
      <PopupInput
        required={true}
        name="about"
        type="text"
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        value={formState.values.about}
        onChange={handleChange}
        isValid={formState.validity.about}
        validationMessage={formState.validationMessages.about}
      />
    </PopupWithForm>
  )
}