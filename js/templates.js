function createListIyemMarkup(array) {
    return array
        .map(
            ({ id, title }) => `<li class="item" data-id="${id}">
  <p class="item__header">${title}</p>
  <div class="buttons-wrapper">
  <button class="action-button" data-action="edit" type="button">
  <svg class="action-button__icon" width="13" height="13">
    <use href="./images/icons.svg#icon-pen"></use>
</svg>
</button>
  <button class="action-button" data-action="delete" type="button">
  <svg class="action-button__icon" width="13" height="13">
    <use href="./images/icons.svg#icon-trash"></use>
</svg>
</button>
  </div>
  </li>
`
        )
        .join('');
}

function createPreviewMarkup(data) {
    return `<div class="book" data-id="${data.id}">
  <div class="book-info__wrapper">
  <h2 class="book__title">${data.title}</h2>
  <p class="book__author">${data.author}</p>
  <p class="book__about">${data.plot}</p>
  </div>
  <img  class="book__preview" src="${data.img}" alt="${data.title}">
</div>`;
}

function creatFormMarkup({ title = '', author = '', img = '', plot = '' }) {
    return `<div class="form-wrapper">
    <h2 class="form__title">Add a new book</h2>
    <p class="form__description">Enter information about the new book below, then click Save-button</p>
    <form class="form">
    <div class="inputs-wrapper">
    <div class="group-wrapper"><input id="title" class="form__input" type="text" name="title" value="${title}"/><lable for="title" class="form__label">Title</lable>
    </div>
<div class="group-wrapper"><input id="author" class="form__input" type="text" name="author" value="${author}"/><lable for="author" class="form__label">Author</lable>
  </div>
<div class="group-wrapper"><input id="img" class="form__input" type="url" name="img" value="${img}"/><lable for="img" class="form__label">Preview</lable>
  </div>
<div class="group-wrapper"><input id="plot" class="form__input" type="text" name="plot" value="${plot}"/><lable for="plot" class="form__label">Plot</lable>
  </div>
  </div>
  <button class="button__save" type="submit" data-action="save"><span>Save</span></button>
</form>
</div>`;
}

export { createListIyemMarkup, createPreviewMarkup, creatFormMarkup };
