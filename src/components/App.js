import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {useState} from 'react';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }
    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard({})
    }
    const handleCardClick = (card) => {
        setSelectedCard(card)
    }
    return (
        <>
            <div className="root__wrapper">
                <Header/>
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                />
                <Footer/>
            </div>
            <PopupWithForm
                name="profile"
                title="Редактировать профиль"
                isOpen={isEditProfilePopupOpen}
                buttonTitle="Сохранить"
                onClose={closeAllPopups}
            >
                <label className="popup__label">
                    <input className="popup__field popup__field_input_name" id="popup__name" name="userName" type="text"
                           placeholder="Ваше имя" autoComplete="off" minLength="2" maxLength="40" required/>
                    <span id="popup__name-error" className="popup__error"></span>
                </label>
                <label className="popup__label">
                    <input className="popup__field popup__field_input_job" id="popup__job" name="userJob" type="text"
                           placeholder="Ваша работа" autoComplete="off" minLength="2" maxLength="200" required/>
                    <span id="popup__job-error" className="popup__error"></span>
                </label>
            </PopupWithForm>
            <PopupWithForm
                name="element"
                title="Новое место"
                isOpen={isAddPlacePopupOpen}
                buttonTitle="Создать"
                onClose={closeAllPopups}
            >
                <label className="popup__label">
                    <input className="popup__field popup__field_input_name" id="popup__elementName" name="elementName"
                           type="text"
                           placeholder="Название" autoComplete="off" minLength="2" maxLength="30" required/>
                    <span id="popup__elementName-error" className="popup__error"></span>
                </label>
                <label className="popup__label">
                    <input className="popup__field popup__field_input_job" id="popup__link" name="link" type="url"
                           autoComplete="off"
                           placeholder="Ссылка на картинку" required/>
                    <span id="popup__link-error" className="popup__error"></span>
                </label>
            </PopupWithForm>
            <PopupWithForm
                name="avatar"
                title="Обновить аватар"
                isOpen={isEditAvatarPopupOpen}
                buttonTitle="Сохранить"
                onClose={closeAllPopups}
            >
                <label className="popup__label">
                    <input className="popup__field popup__field_input_name" id="popup__avatar" name="avatar" type="url"
                           placeholder="Название" autoComplete="off" minLength="2" required/>
                    <span id="popup__avatar-error" className="popup__error"></span>
                </label>
            </PopupWithForm>
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
        </>
    );
}

export default App;
