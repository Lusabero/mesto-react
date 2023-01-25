import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }
    return (
        <article className="element">
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <button className="element__button-delete"></button>
            <div className="element__wrapper">
                <h2 className="element__title">{props.card.name}</h2>
                <button className="element__like" type="button"></button>
                <p className="element__counter-like">{props.card.likes.length}</p>
            </div>
        </article>
    )
}

export default Card;