let books = [
    {
        id: '1',
        title: `Apple. Эволюция компьютера`,
        author: `Владимир Невзоров`,
        img: `https://bukva.ua/img/products/449/449532_200.jpg`,
        plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
    },
    {
        id: '2',
        title: `Как объяснить ребенку информатику`,
        author: `Кэрол Вордерман`,
        img: `https://bukva.ua/img/products/480/480030_200.jpg`,
        plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
    },
    {
        id: '3',
        title: `Путь скрам-мастера. #ScrumMasterWay`,
        author: `Зузана Шохова`,
        img: `https://bukva.ua/img/products/480/480090_200.jpg`,
        plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
    },
];

const rootContainer = document.querySelector('#root');

const elOne = document.createElement('div');
elOne.classList.add('root__library');

const elTwo = document.createElement('div');
elTwo.classList.add('root__auxiliary');

rootContainer.append(elOne, elTwo);

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

renderList(books, list);

function renderList(data, outputEl) {
    const markup = data
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

    const allItemHeader = outputEl.querySelectorAll('.item__header');

    allItemHeader.forEach(el => el.addEventListener('click', onTitleClick));

    const deleteBtns = outputEl.querySelectorAll("[data-action='delete']");

    deleteBtns.forEach(el => el.addEventListener('click', onDeleteBtnClick));
}

function onTitleClick(event) {
    const book = books.find(book => book.title === event.currentTarget.textContent);

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
    const itemId = event.currentTarget.closest('li').dataset.id;

    const previewEl = elTwo.querySelector('.book');

    if (previewEl) {
        if (itemId === previewEl.dataset.id) elTwo.innerHTML = '';
    }

    books = books.filter(({ id }) => id != event.currentTarget.closest('li').dataset.id);

    renderList(books, list);
}

function onAddBtnClick() {
    const newBook = { id: Date.now() };

    elTwo.innerHTML = creatFormMarkup();

    elTwo.querySelector('input').focus();
    createDataObj(newBook);
    console.log(newBook);
}

function creatFormMarkup() {
    return `<div class="form-wrapper">
    <h2 class="form__title">Add a new book</h2>
    <p class="form__description">Enter information about the new book below, then click Save-button</p>
    <form class="form">
    <div class="inputs-wrapper">
    <div class="group-wrapper"><input id="title" class="form__input" type="text" name="title" /><lable for="title" class="form__label">Title</lable>
    </div>
<div class="group-wrapper"><input id="author" class="form__input" type="text" name="author" /><lable for="author" class="form__label">Author</lable>
  </div>
<div class="group-wrapper"><input id="img" class="form__input" type="url" name="img" /><lable for="img" class="form__label">Preview</lable>
  </div>
<div class="group-wrapper"><input id="plot" class="form__input" type="text" name="plot" /><lable for="plot" class="form__label">Plot</lable>
  </div>
  </div>
  <button class="button__save" type="submit" data-action="save"><span>Save</span></button>
</form>
</div>`;
}

function createDataObj(book) {
    const inputEls = elTwo.querySelectorAll('input');

    inputEls.forEach(el => el.addEventListener('change', changeHandler));

    console.log(book);

    function changeHandler(event) {
        book[event.currentTarget.name] = event.currentTarget.value;

        console.log(book);
    }
}
