import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { api } from '../utils/Api.js';
import * as auth from "../utils/Auth.js"
import { currentUserContext } from '../contexts/CurrentUserContext.js';
import Header from "./Header.js";
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  // useState Hooks:
  const history = useHistory()
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false)
  const [isInfoTooltip, setIsInfoTooltip] = useState(false)
  
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({ name: '', link: '' })
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [email, setEmail] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  // запросы к API:
  // загрузка начальных карточек и информации профиля
  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([initialCards, info]) => {
          setCards(initialCards.data)
          setCurrentUser(info.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [loggedIn])

  // лайк карточки
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((error) => {
        console.log(error)
      })
  }

  // удаление карточки
  const handleCardDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter((currentUser) => {
        closeAllPopups()
        return currentUser._id !== card._id
      }))
    })
      .catch((error) => {
        console.log(error)
      })
  }

  // обновить профиль
  const handleUpdateUser = (info) => {
    api.setUserInfo(info.name, info.about).then((info) => {
      setCurrentUser(info.data)
      closeAllPopups()
    })
      .catch((error) => {
        console.log(error)
      })
  }

  // обновить аватар
  const handleUpdateAvatar = (info) => {
    api.setAvatar(info.avatar).then((info) => {
      setCurrentUser(info.data)
      closeAllPopups()
    })
      .catch((error) => {
        console.log(error)
      })
  }

  // добавить новую карточку
  const handleAddPlaceSubmit = (newCard) => {
    api.addCard(newCard).then((newCard) => {
      setCards([newCard.data, ...cards])
      closeAllPopups()
    })
      .catch((error) => {
        console.log(error)
      })
  }

  // запросы к AUTH:
  const handleRegister = (data) => {
    auth.register(data).then((data) => {
      if (data.data._id || data.data.email) {
        setIsSuccess(true)
        history.push("/signin")
      }
    })
      .catch((error) => {
        console.log(error)
        setIsSuccess(false)
      })
    setIsInfoTooltip(true)
  }

  const handleAuthorize = ({email, password}) => {
    auth.authorize({email, password}).then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token)
        setLoggedIn(true)
        setEmail(email)
        history.push("/")
      }
    })
      .catch((error) => {
        console.log(error)
        setIsSuccess(false)
        setIsInfoTooltip(true)
      })
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      auth.getUserToken(jwt).then((jwt) => {
        if (jwt) {
          setEmail(jwt.data.email)
          setLoggedIn(true)
          history.push("/")
        }
      })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const signOut = ()=>{
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setEmail("")
    history.push('/signin')
  }

  // открытие попапов:
  // попап - редактировать аватар
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  // попап - редактировать профиль
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  // попап - добавить карточку
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  // попап - удалить карточку
  const handleCardDeleteClick = (card) => {
    setIsDeletePlacePopupOpen(true)
    setSelectedDeleteCard(card)
  }

  // попап - посмотреть карточку
  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  // закрытие всех попапов:
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsDeletePlacePopupOpen(false)
    setSelectedCard({ name: '', link: '' })
    setIsInfoTooltip(false)
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} signOut={signOut} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
          />

          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login handleAuthorize={handleAuthorize} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>

        </Switch>

        <Footer />

        {/* попап - редактировать аватар */}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} isClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        {/* попап - редактировать профиль */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        {/* попап - добавить карточку */}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} isClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        {/* попап - удалить карточку */}
        <DeletePlacePopup isOpen={isDeletePlacePopupOpen} isClose={closeAllPopups} card={selectedDeleteCard} onDeletePlace={handleCardDelete} />

        {/* попап - посмотреть карточку */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* попап - уведомление о ошибке */}
        <InfoTooltip isOpen={isInfoTooltip} isSuccess={isSuccess} onClose={closeAllPopups} />
      </div>
    </currentUserContext.Provider>

  );
}

export default App;
