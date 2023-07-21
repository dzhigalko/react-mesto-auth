import {useContext, useEffect, useState} from 'react';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mestoApi from "../../utils/mestoApi";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import {useOutletContext} from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import AppContext from "../../contexts/AppContext";
import Popup from "../Popup/Popup";
import PopupWithConfirmation from "../PopupWithConfirmation/PopupWithConfirmation";

export default function Index() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const { setMenu } = useOutletContext()
  const { logout, user } = useContext(AuthContext)
  const [ isLoading, setIsLoading ] = useState(false)
  const [isCardDeleteConfirmationOpen, setIsCardDeleteConfirmationOpen] = useState(false)
  const [cardForDelete, setCardForDelete] = useState({})

  useEffect(() => {
    Promise.all([mestoApi.getUserProfile(), mestoApi.getInitialCards()])
      .then(([profile, cards]) => {
        setCurrentUser(profile)
        setCards(cards)
      }).catch(err => console.log(`Ошибка ${err}`));

    // Menu
    setMenu([
      <h2 className='header__user'>{user && user.data.email}</h2>,
      <div className="header__sign header__sign_out" onClick={() => logout()}>Выйти</div>
    ])
  },[setMenu, user, logout])

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopup(false)
    setIsCardDeleteConfirmationOpen(false)
    setSelectedCard({})
    setCardForDelete({})
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card){
    setSelectedCard(card)
    setImagePopup(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const request = isLiked ? mestoApi.deleteCardLike : mestoApi.addCardLike

    request.apply(mestoApi, [card._id]).then((newCard) => {
      setCards((currentCards) => currentCards.map((c) => c._id === card._id ? newCard : c))
    }).catch(err => console.log(`Ошибка ${err}`));
  }

  function handlePopupSubmit(makeRequest) {
    setIsLoading(true)

    makeRequest()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  function handleAddPlace(params) {
    const { name, link } = params

    handlePopupSubmit(() => {
      return mestoApi.addCard(name, link).then((newCard) => {
        setCards([newCard, ...cards])
      })
    })
  }

  function handleCardDeleteConfirm(card) {
    handlePopupSubmit(() => {
      return mestoApi.deleteCard(card._id).then(() => {
        setCards((currentCards) => currentCards.filter((c) => c._id !== card._id))
      })
    })
  }

  function handleUpdateUser(params) {
    const {name, about} = params

    handlePopupSubmit(() => {
      return mestoApi.changeUserProfile(name, about).then((user) => {
        setCurrentUser({
          ...currentUser,
          name: user.name,
          about: user.about
        })
      })
    })
  }

  function handleUpdateAvatar(params) {
    const { avatar } = params;

    handlePopupSubmit(() => {
      return mestoApi.changeAvatar(avatar).then(function(user) {
        setCurrentUser({
          ...currentUser,
          avatar: user.avatar
        })
      })
    })
  }

  function handleCardDelete(card) {
    setCardForDelete(card)
    setIsCardDeleteConfirmationOpen(true)
  }

  return (
    <AppContext.Provider value={{ isLoading }}>
      <CurrentUserContext.Provider value={currentUser}>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLikeClick={handleCardLike}
          onCardDeleteClick={handleCardDelete}
          cards={cards}
        />

        <Footer/>

        <PopupWithConfirmation isOpen={isCardDeleteConfirmationOpen} onClose={closeAllPopups}
                               onConfirm={() => handleCardDeleteConfirm(cardForDelete)}/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <PopupWithForm
          name='delete-photo'
          title='Вы уверены?'
          titleButton='Да'
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}
