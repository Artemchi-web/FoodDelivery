// Получаем ссылку на блок корзины
const basketEl = document.getElementById("basket");

// Объект для хранения выбранных товаров
// Структура: { "Пеперони": { quantity: 2, price: 15 } }
let cart = {};

// Функция обновления корзины
function updateBasket() {
  basketEl.innerHTML = ""; // очищаем корзину перед перерисовкой
  let total = 0;

  for (let name in cart) {
    if (cart[name].quantity > 0) {
      // создаём элемент строки корзины
      const itemEl = document.createElement("div");
      itemEl.classList.add("basket-item");

      // считаем стоимость позиции
      const itemCost = cart[name].quantity * cart[name].price;
      total += itemCost;

      // заполняем HTML для строки
      itemEl.innerHTML = `
        <div class = "res-name"><b>${name}</b> <b>(${cart[name].quantity})</b></div>
        <div class = "res-cost"><b>${itemCost}</b> BYN</div>
      `;

      basketEl.appendChild(itemEl);
    }
  }

  // Добавляем итоговую сумму
  const totalEl = document.createElement("p");
  totalEl.innerHTML = `<strong>Итого: ${total}</strong> BYN`;
  basketEl.appendChild(totalEl);
}

// Навешиваем обработчики на кнопки "+"
document.querySelectorAll(".inc").forEach(button => {
  button.addEventListener("click", () => {
    const price = parseInt(button.value); // цена из атрибута value
    const card = button.closest(".card"); // находим карточку товара
    const name = card.querySelector(".card-name").textContent; // название товара
    const quantityEl = card.querySelector(".card-quantity"); // элемент количества

    let quantity = parseInt(quantityEl.textContent);
    quantity++;
    quantityEl.textContent = quantity;

    // обновляем объект cart
    if (!cart[name]) cart[name] = { quantity: 0, price: price };
    cart[name].quantity = quantity;

    updateBasket();
  });
});

// Навешиваем обработчики на кнопки "-"
document.querySelectorAll(".dec").forEach(button => {
  button.addEventListener("click", () => {
    const price = Math.abs(parseInt(button.value)); 
    const card = button.closest(".card");
    const name = card.querySelector(".card-name").textContent;
    const quantityEl = card.querySelector(".card-quantity");

    let quantity = parseInt(quantityEl.textContent);
    if (quantity > 0) {
      quantity--;
      quantityEl.textContent = quantity;

      cart[name].quantity = quantity;
      updateBasket();
    }
  });
});


// отправка данных боту
let tg = window.Telegram.WebApp;
let order_but = document.getElementById("order-button")

order_but.addEventListener("click", () => {
  if (total > 0){
    tg.sendData(JSON.stringify(cart));
  }else{
    alert("В корзине ничего нету")
  }
});

