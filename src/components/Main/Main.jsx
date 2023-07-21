import {useContext} from "react";
import Card from "../Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";


export default function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLikeClick, onCardDeleteClick, cards}) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          type="button"
          aria-label="Редактировать"
          onClick={onEditAvatar}
        >
          <img className="avatar" src={currentUser.avatar} alt="Фото профиля"/>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__button-edit"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          />
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>
      <section className="photos">
        {cards.map(data => {
          return (
            <Card
              key={data._id}
              card={data}
              onCardClick={onCardClick}
              onCardLikeClick={onCardLikeClick}
              onCardDeleteClick={onCardDeleteClick}
            />
          )
        })}
      </section>
    </main>
  )
}