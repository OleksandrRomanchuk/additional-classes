import { books } from './js/books.js';
import { createListIyemMarkup, createPreviewMarkup, creatFormMarkup } from './js/templates.js';

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

    outputEl.innerHTML = createListIyemMarkup(booksArray);

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

    setHandlerToInputs(bookToEdit);

    const form = elTwo.querySelector('.form');

    form.addEventListener('submit', onFormSubmit.bind(bookToEdit));
}

function onAddBtnClick(event) {
    const newBook = { id: Date.now() };

    elTwo.innerHTML = creatFormMarkup(newBook);

    elTwo.querySelector('input').focus();
    setHandlerToInputs(newBook);

    const form = elTwo.querySelector('.form');

    form.addEventListener('submit', onFormSubmit.bind(newBook));
}

function setHandlerToInputs(book) {
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

    const booksArr = JSON.parse(localStorage.getItem('books'));

    const isInBooksArray = booksArr.some(({ id }) => id === this.id);

    if (isInBooksArray) {
        for (let i = 0; i < booksArr.length; i += 1) {
            if (booksArr[i].id === this.id) booksArr[i] = this;
        }

        console.log(booksArr);

        localStorage.setItem('books', JSON.stringify(booksArr));

        renderList(list);
        showNotification('updated');
        return;
    }

    booksArr.push(this);
    localStorage.setItem('books', JSON.stringify(booksArr));

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
        }, 4000);
    }, 400);
}
