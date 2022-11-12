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
elOne.classList.add('root__el--left');

const elTwo = document.createElement('div');
elTwo.classList.add('root__el--right');

rootContainer.append(elOne, elTwo);

const header = document.createElement('h1');
header.classList.add('header-one');

const list = document.createElement('ul');
list.classList.add('list');

const addBtn = document.createElement('button');
addBtn.textContent = 'Add';
addBtn.classList.add('button__add');

elOne.append(header, list, addBtn);
addBtn.addEventListener('click', onAddBtnClick);

renderList(books, list);

function renderList(data, outputEl) {
    const markup = data
        .map(
            ({ id, title }) => `<li class="list__item" data-id="${id}">
  <p class="list__item-hesder">${title}</p>
  <button class="action-button" data-action="edit" type="button">Edit</button>
  <button class="action-button" data-action="delete" type="button">Delete</button></li>
`
        )
        .join('');

    outputEl.insertAdjacentHTML('beforeend', markup);

    const allItemHeader = outputEl.querySelectorAll('.list__item-hesder');

    allItemHeader.forEach(el => el.addEventListener('click', onTitleClick));

    const deleteBtns = outputEl.querySelectorAll("[data-action='delete']");

    deleteBtns.forEach(el => el.addEventListener('click', onDeleteBtnClick));
}

function onTitleClick(event) {
    const book = books.find(book => book.title === event.currentTarget.textContent);
    console.log('book: ', book);

    const markup = createPreviewMarkup(book);

    elTwo.innerHTML = markup;
}

function createPreviewMarkup(data) {
    return `<div class="book" data-id="${data.id}">
  <h2 class="book__header">${data.title}</h2>
  <p class="book__author">${data.author}</p>
  <img  class="book__prewiev" src="${data.img}" alt="">
  <p class="book__about">${data.plot}</p>
</div>`;
}

function onDeleteBtnClick(event) {
    const itemId = event.currentTarget.closest('li').dataset.id;
    console.log('itemId: ', itemId);

    const prewievEl = elTwo.querySelector('.book');

    if (prewievEl) {
        if (itemId === prewievEl.dataset.id) elTwo.innerHTML = '';
    }

    books = books.filter(({ id }) => id != itemId);

    list.innerHTML = '';
    renderList(books, list);
}

function onAddBtnClick(event) {
    const newBook = { id: Date.now() };
    elTwo.innerHTML = creatFormMarkup();

    createDataObj(newBook);
    console.log(newBook);
}

function creatFormMarkup() {
    return `<form>
  <lable>Title: <input type="text" name="title" /></lable>
  <lable>Author: <input type="text" name="author" /></lable>
  <lable>Prewiev image: <input type="url" name="img" /></lable>
  <lable>Plot: <input type="text" name="plot" /></lable>
  <button type="submit">Save</button>
</form>`;
}

function createDataObj(book) {
    const inputEls = elTwo.querySelectorAll('input');

    inputEls.forEach(el => el.addEventListener('change', changHandler));

    console.log(book);

    function changHandler() {
        book[event.currentTarget.name] = event.currentTarget.value;

        console.log(book);
    }
}
