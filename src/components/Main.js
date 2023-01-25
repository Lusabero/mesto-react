import React from "react";
import {useEffect, useState} from 'react';
import avatar from "../images/avatar.jpg";
import api from "../utils/Api.js"
import Card from "./Card";

function Main(props) {
    const [userName, setUserName] = useState('Жак - Ив Кусто');
    const [userDescription, setUserDescription] = useState('Исследователь океана');
    const [userAvatar, setUserAvatar] = useState(avatar);
    const [cards, setCards] = useState([])
    useEffect(() => {
        api.getProfile()
            .then(res => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])
    useEffect(() => {
        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
            <main className="main">
                <section className="profile">
                    <div className="profile__container">
                        <div className="profile__wrapper-avatar" onClick={props.onEditAvatar}>
                            <img className="profile__avatar" src={userAvatar} alt="фото пользователя"/>
                            <span className="profile__editAvatar"></span>
                        </div>

                        <div className="profile__wrapper">
                            <div className="profile__info">
                                <h1 className="profile__name">{userName}</h1>
                                <p className="profile__description">{userDescription}</p>
                            </div>
                            <button className="profile__button-edit" type="button"
                                    onClick={props.onEditProfile}></button>
                        </div>
                    </div>

                    <button className="profile__button-add" type="button" onClick={props.onAddPlace}></button>
                </section>

                <section className="elements">
                    {
                        cards.map((card) => (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={props.onCardClick}
                            />
                        ))
                    }
                </section>
            </main>
    )
}

export default Main;