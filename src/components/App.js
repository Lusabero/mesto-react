import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import { useEffect, useState } from 'react';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from "./AddPlacePopup";
import avatar from "../images/avatar.jpg";

function App() {

    const [currentUser, setCurrentUser] = useState({ name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: avatar });
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [cards, setCards] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        api.getProfile()
            .then(setCurrentUser)
            .catch(console.log)

        api.getInitialCards()
            .then(setCards)
            .catch(console.log)
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch(console.log)
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(prevState => prevState.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard({})
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleUpdateUser(user) {
        setIsLoading(true)
        api.setUserInfo(user)
            .then((user) => {
                setCurrentUser(user)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }

    function handleUpdateAvatar(avatar) {
        setIsLoading(true)
        api.changeAvatar(avatar)
            .then((avatar) => {
                setCurrentUser(avatar)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }

    function handleAddPlaceSubmit(newCard) {
        setIsLoading(true)
        api.setCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root__wrapper">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer />
            </div>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
        </CurrentUserContext.Provider>
    );
}

export default App;
