const addCard = document.querySelector('#addCard');
const formAddCard = addCard.querySelector('#formAddCard');
const inputSourceImg = addCard.querySelectorAll('.form__input-text')[1];
const inputNameCard = addCard.querySelectorAll('.form__input-text')[0];
const buttonAdd = document.querySelector('.profile-section__add');

const editProfile = document.querySelector('#editProfile');
const formEditProfile = document.querySelector('#formEditPofile');
const inputNameOfEditProfile = editProfile.querySelectorAll('.form__input-text')[0];
const inputTextOfEditProfile = editProfile.querySelectorAll('.form__input-text')[1];
const buttonEdit = document.querySelector('.profile-section__edit');

const profileName = document.querySelector('.profile-section__name');
const profileText = document.querySelector('.profile-section__text');
const openImage = document.querySelector('#openImage');
const popupImage = openImage.querySelector('.popup__image');
const popupImageCaption = openImage.querySelector('.popup__image-caption');
const cardItemsList = document.querySelector('.photo-grid__items');
const allCloseButtons = document.querySelectorAll('.popup__close');


function addEventOpenImagePopup(typeEvent, cardImg, cardName) {
    cardImg.addEventListener(typeEvent, () => {
        openPopup(openImage);
        popupImage.src = cardImg.src;
        popupImage.alt = cardImg.alt;
        popupImageCaption.textContent = cardName.textContent;
    });
}


function getCloneNode(template, desiredNode) {
    const photoGridItemTemplate = document.querySelector(template).content;
    return photoGridItemTemplate.querySelector(desiredNode).cloneNode(true);
}


function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}


function addEventLikeButton(typeEvent, cardObj, className) {
        cardObj.likeButton.addEventListener(typeEvent, function() {
            cardObj.likeButton.classList.toggle(className);
        });
}


function addEventButtonDelete(typeEvent, cardObj, parentClassName) {

        cardObj.buttonDelete.addEventListener(typeEvent, function(evt) {
            const currentButtonDelete = evt.target;
            const cardElement = currentButtonDelete.closest(parentClassName);
            cardElement.remove();
        });
}

function getCardObject(initialData, params = {
    template: '#photo-grid__item', 
    node:'.photo-grid__element-container', 
    classOfImage:'.photo-grid__image', 
    classOfName:'.photo-grid__name', 
    classOfLike:'.photo-grid__like-icon', 
    classOfDelete:'.photo-grid__delete', 
    }) {

    const cardItem = getCloneNode(params.template, params.node);
    const cardImg = cardItem.querySelector(params.classOfImage);
    const cardName = cardItem.querySelector(params.classOfName);
    const likeButton = cardItem.querySelector(params.classOfLike);
    const buttonDelete = cardItem.querySelector(params.classOfDelete);
    const cardObject = {
        cardItem, 
        cardImg,
        cardName,
        likeButton,
        buttonDelete,
    } 

    cardObject.cardImg.src = initialData.link;
    cardObject.cardImg.alt = initialData.name;
    cardObject.cardName.textContent = initialData.name;

    addEventLikeButton('click', cardObject, 'photo-grid__like-icon_active');
    addEventButtonDelete('click', cardObject, '.photo-grid__element-container')
    addEventOpenImagePopup('click', cardObject.cardImg, cardObject.cardName);
    insertCardinsideList(cardObject);    
    return cardObject;
}

function insertCardinsideList (card) {
    cardItemsList.prepend(card.cardItem);
}


function addCardOnPage(evt) {
    evt.preventDefault();
    getCardObject({
        link: inputSourceImg.value, 
        name: inputNameCard.value
    });
    closePopup(addCard);
}


function handleProfileEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputNameOfEditProfile.value;
    profileText.textContent = inputTextOfEditProfile.value;
    closePopup(editProfile);
}

function openPopupForAdd() {
    openPopup(addCard);
    formAddCard.reset();
}

function openPopupForEdit() {
    openPopup(editProfile);
    inputNameOfEditProfile.value = profileName.textContent;
    inputTextOfEditProfile.value = profileText.textContent;
}


initialCards.forEach(function(item) {
    getCardObject(item);
});

allCloseButtons.forEach(popupCloseButton => popupCloseButton.addEventListener('click', closePopup));
formAddCard.addEventListener('submit', addCardOnPage);
formEditProfile.addEventListener('submit', handleProfileEditFormSubmit);
buttonAdd.addEventListener('click', openPopupForAdd);
buttonEdit.addEventListener('click', openPopupForEdit);







