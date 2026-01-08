const basketEl = document.getElementById("tbody-container");
let cart = {};

// Функция обновления корзины
function updateBasket() {
  basketEl.innerHTML = "";
  let total = 0;

  for (let name in cart) {
    if (cart[name].quantity > 0) {
      const itemEl = document.createElement("tr");
      const itemCost = cart[name].price;
      total += cart[name].quantity * itemCost;

      itemEl.innerHTML = `
        <td class="product-name">${name}</td>
        <td class="product-quant">${cart[name].quantity}</td>
        <td class="product-cost"><span class="cost-value">${itemCost}</span> BYN</td>
      `;
      basketEl.appendChild(itemEl);
    }
  }

  document.getElementById("res-cost").innerHTML = `Итого: <span class="cost-value">${total}</span> BYN`;
}

// Обработчики "+"
document.querySelectorAll(".inc").forEach(button => {
  button.addEventListener("click", () => {
    const price = parseInt(button.value);
    const card = button.closest(".card");
    const name = card.querySelector(".card-name").textContent;
    const quantityEl = card.querySelector(".card-quantity");

    let quantity = parseInt(quantityEl.textContent);
    quantity++;
    quantityEl.textContent = quantity;

    if (!cart[name]) cart[name] = { quantity: 0, price: price };
    cart[name].quantity = quantity;

    updateBasket();
  });
});

// Обработчики "-"
document.querySelectorAll(".dec").forEach(button => {
  button.addEventListener("click", () => {
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

// Переключение на корзину
document.getElementById("busket-button").addEventListener("click", () => {
  document.querySelector("main").style.display = "none";
  document.querySelector(".busket-container").style.display = "block";
});
