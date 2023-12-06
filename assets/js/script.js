const booksUrl = "https://striveschool-api.herokuapp.com/books";

const rowBooks = document.querySelector("#books-container > .row");
const ulProductsCart = document.querySelector("#products");

let bookListHtml = "";
let bookListArr = [];

fetch(booksUrl)
  .then((res) => res.json())
  .then((books) => {
    books.forEach((book) => {
      bookListHtml += `<!-- dynamic card -->
    <div class="col-3">
        <div class="card">
            <img src="${book.img}" class="card-img-top" alt="book">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="category">${book.category}</p>
                <p class="price">price: ${book.price}$</p>
                <button id="buyBtn" type="button">Compra Ora</button>
                <button id="removeBtn" type="button">Scarta</button>
            </div>
        </div>
    </div>
    <!-- end of dynamic card -->`;
    });

    rowBooks.innerHTML = bookListHtml;

    const removeBtnList = document.querySelectorAll("#removeBtn");
    const buyBtnList = document.querySelectorAll("#buyBtn");

    removeBtnList.forEach((button) =>
      button.addEventListener("click", removeBook)
    );
    buyBtnList.forEach((button) =>
      button.addEventListener("click", addBookToCart)
    );
  });

function removeBook(e) {
  e.currentTarget.parentElement.parentElement.parentElement.remove();
}

function addBookToCart(e) {
  const card = e.currentTarget.parentElement.parentElement;
  const imgBook = card.querySelector(".card-img-top").src;
  const titleBook = card.querySelector(".card-title").innerText;
  const categoryBook = card.querySelector(".category").innerText;
  const priceBook = card.querySelector(".price").innerText;

  const book = {
    img: imgBook,
    title: titleBook,
    category: categoryBook,
    price: priceBook,
  };

  bookListArr.push(book);

  localStorage.setItem("shoppingCart", JSON.stringify(bookListArr));
  bookListArr.forEach((book) => {
    const liBookCart = document.createElement("li");

    liBookCart.innerHTML = `<img src="${book.img}" alt="book cover">
    <div> 
    <h6>${book.title}</h6>
    <p>${book.category}</p>
    <p>${book.price}</p>
</div>
<button type="button">Elimina</button>`;

    liBookCart
      .querySelector("button")
      .addEventListener("click", removeBookFromCart);

    ulProductsCart.appendChild(liBookCart);
  });
}

function removeBookFromCart(e) {
  let newBookArr = [];
  const titleBook = e.currentTarget.parentElement.querySelector("div h6");

  for (let book of bookListArr) {
    if (book.title !== titleBook.innerText) {
      newBookArr.push(book);
    }
  }

  localStorage.setItem("shoppingCart", JSON.stringify(newBookArr));
  e.currentTarget.parentElement.remove();
}
