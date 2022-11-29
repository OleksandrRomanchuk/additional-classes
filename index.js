import { books } from './js/books.js';

localStorage.setItem('books', JSON.stringify(books));

const refs = {
    rootContainer: document.querySelector('#root'),
    notificationEl: document.querySelector('.notification'),
};

const elOne = document.createElement('div');
elOne.classList.add('root__library');

const elTwo = document.createElement('div');
elTwo.classList.add('root__auxiliary');

refs.rootContainer.append(elOne, elTwo);

const header = document.createElement('h1');
header.textContent = 'Library';
header.classList.add('library__title');

const list = document.createElement('ul');
list.classList.add('library__list');

const addBtn = document.createElement('button');
addBtn.textContent = '+';
addBtn.classList.add('button__add');

elOne.append(header, list, addBtn);

addBtn.addEventListener('click', onAddBtnClick);

renderList(list);

function renderList(outputEl) {
    const booksArray = JSON.parse(localStorage.getItem('books'));

    if (!booksArray) return;

    const markup = booksArray
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

    outputEl.innerHTML = markup;

    const allItemsHeader = outputEl.querySelectorAll('.item__header');
    const deleteBtns = outputEl.querySelectorAll("[data-action='delete']");
    const editBtns = outputEl.querySelectorAll('[data-action="edit"]');

    allItemsHeader.forEach(el => el.addEventListener('click', onTitleClick));
    deleteBtns.forEach(el => el.addEventListener('click', onDeleteBtnClick));
    editBtns.forEach(el => el.addEventListener('click', onEditBtnClick));
}

function onTitleClick(event) {
    const book = JSON.parse(localStorage.getItem('books')).find(
        book => book.title === event.target.textContent
    );

    elTwo.innerHTML = createPreviewMarkup(book);
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

function onDeleteBtnClick(event) {
    const itemId = event.target.closest('li').dataset.id;

    const previewEl = elTwo.querySelector('.book');

    if (previewEl) {
        if (itemId === previewEl.dataset.id) elTwo.innerHTML = '';
    }

    const booksArray = JSON.parse(localStorage.getItem('books')).filter(
        ({ id }) => id.toString() !== itemId
    );

    localStorage.setItem('books', JSON.stringify(booksArray));

    renderList(list);

    showNotification('deleted');
}

function onEditBtnClick(event) {
    const chosenElId = event.target.closest('li').dataset.id;

    const bookToEdit = JSON.parse(localStorage.getItem('books')).find(
        ({ id }) => id.toString() === chosenElId.toString()
    );

    elTwo.innerHTML = creatFormMarkup(bookToEdit);

    setHanlerToInputs(bookToEdit);

    const form = elTwo.querySelector('.form');

    form.addEventListener('submit', onFormSubmit.bind(bookToEdit));
}

function onAddBtnClick(event) {
    const newBook = { id: Date.now() };

    elTwo.innerHTML = creatFormMarkup(newBook);

    elTwo.querySelector('input').focus();
    setHanlerToInputs(newBook);

    const form = elTwo.querySelector('.form');

    form.addEventListener('submit', onFormSubmit.bind(newBook));
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

function setHanlerToInputs(book) {
    const inputEls = elTwo.querySelectorAll('input');

    inputEls.forEach(el => el.addEventListener('change', changeHandler.bind(book)));
}

function changeHandler(event) {
    this[event.target.name] = event.target.value;
}

function onFormSubmit(event) {
    event.preventDefault();

    const isFullFilled = [...event.target.querySelectorAll('.form__input')].some(el => !el.value);

    if (isFullFilled) {
        alert('A-та-та!');
        return;
    }

    elTwo.innerHTML = createPreviewMarkup(this);

    const booksArray = JSON.parse(localStorage.getItem('books'));

    const isInBooksArray = booksArray.some(({ id }) => id === this.id);

    if (isInBooksArray) {
        for (let i = 0; i < booksArray.length; i += 1) {
            if (booksArray[i].id === this.id) booksArray[i] = this;
        }

        localStorage.setItem('books', JSON.stringify(booksArray));

        renderList(list);
        showNotification('updated');
        return;
    }

    books.push(this);
    localStorage.setItem('books', JSON.stringify(books));

    renderList(list);

    showNotification('added');
}

function notificationAlert(text) {
    classToggle('add');
    refs.notificationEl.firstElementChild.textContent = `Book was successfully ${text}!`;
}

function classToggle(action) {
    refs.notificationEl.classList[action]('notification--show');
}

function showNotification(text) {
    setTimeout(() => {
        notificationAlert(text);

        setTimeout(() => {
            classToggle('remove');
        }, 3000);
    }, 400);
}
