import {useContext} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLikeClick, onCardDeleteClick}) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  return (
    <div className="photo">
      {isOwn && <button className="photo__trash" type="button" aria-label="Удалить фото"
                        onClick={() => onCardDeleteClick(card)} />}
      <img
        className="photo__item"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="photo__info">
        <h3 className="photo__description">{card.name}</h3>
        <div className="photo__like-container">
          <button className={`photo__like ${isLiked && 'photo__like_active'}`}
                  type="button" aria-label="Лайк"
                  onClick={() => onCardLikeClick(card)}/>
          { card.likes && <h4 className="photo__like-counter">{card.likes.length}</h4>}
        </div>
      </div>
    </div>
  )
}