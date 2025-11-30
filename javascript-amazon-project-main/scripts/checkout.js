import { cart, deleteFromCart, localStorageCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatMoney } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

console.log(dayjs());

let cartHTML = "";
let totalQuantity = 0;
cart.forEach((cartItem) => {
  const productId = cartItem.id;
  const product = products.find((p) => p.id === productId);
  totalQuantity += cartItem.quantity;
  cartHTML += `<div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: ${dayjs().add(7, "day").format("dddd, MMMM D")}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${formatMoney(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                    product.id
                  }">
                    Update
                  </span>
                  <input class="input-quantity" type="number" min="1" max="10" value="${
                    cartItem.quantity
                  }">
                  <span class="save-quantity-link link-primary js-save-link">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                    product.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      ${dayjs().add(7, "day").format("dddd, MMMM D")}
                    </div>
                    <div class="delivery-option-price" data-price-cents="0">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      ${dayjs().add(3, "day").format("dddd, MMMM D")}
                    </div>
                    <div class="delivery-option-price" data-price-cents="499">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      ${dayjs().add(1, "day").format("dddd, MMMM D")}
                    </div>
                    <div class="delivery-option-price" data-price-cents="999">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
});
updateTotalQuantity();
document.querySelector(".js-order-summary").innerHTML = cartHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    console.log(productId);
    deleteFromCart(productId);
    updateTotalQuantity();
    link.closest(".cart-item-container").remove();
    updatepaymentSummary();
  });
});

updatepaymentSummary(0);

function updateTotalQuantity() {
  let quantity = 0;
  cart.forEach((item) => {
    quantity += item.quantity;
  });
  document.querySelector(
    ".js-checkout"
  ).innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${quantity} items</a
          >)`;
}

document.querySelectorAll(".js-update-link").forEach((updateLink) => {
  updateLink.addEventListener("click", () => {
    const { productId } = updateLink.dataset;
    const itemContainer = updateLink.closest(".cart-item-container");
    itemContainer.classList.add("updating-enabled");
    const cartItem = cart.find((item) => item.id === productId);
    const saveLink = itemContainer.querySelector(".js-save-link");
    saveLink.addEventListener("click", () => {
      const inputQuantity =
        itemContainer.querySelector(".input-quantity").value;
      if (Number(inputQuantity) < 1 || Number(inputQuantity) > 10) {
        alert("Please enter a value between 1 and 10");
        return;
      }
      itemContainer.querySelector(".quantity-label").innerHTML = inputQuantity;
      cartItem.quantity = Number(inputQuantity);
      itemContainer.classList.remove("updating-enabled");
      updateTotalQuantity();
      localStorageCart();
    });
  });
});

document.querySelectorAll(".delivery-option").forEach((dateElement) => {
  dateElement.addEventListener("change", () => {
    const deliveryDate = dateElement.querySelector(".delivery-option-date");
    console.log(deliveryDate.innerHTML);
    const containerElement = dateElement.closest(".cart-item-container");
    containerElement.querySelector(
      ".delivery-date"
    ).innerHTML = `Delivery date: ${deliveryDate.innerHTML}`;
    
    updatepaymentSummary()
  });
});

function updatepaymentSummary() {
  let totalItems = 0;
  let totalCostCents = 0;
  let totalDeliveryPriceCents = 0;
  document.querySelectorAll(".delivery-option-input").forEach(radioElement => {
    if (radioElement.checked) {
      const priceCents = radioElement.nextElementSibling.querySelector(".delivery-option-price").dataset.priceCents;
      totalDeliveryPriceCents += Number(priceCents);
    }
  });
  cart.forEach(cartItem => {
    totalItems += cartItem.quantity;
    const product = products.find(p => p.id === cartItem.id);
    totalCostCents += product.priceCents * cartItem.quantity;
  });
  const paymentSummaryHTML = `
  <div class="payment-summary-title">Order Summary</div>

  <div class="payment-summary-row">
    <div>Items (${totalItems}):</div>
    <div class="payment-summary-money">$${formatMoney(totalCostCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatMoney(totalDeliveryPriceCents)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatMoney(totalCostCents + totalDeliveryPriceCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatMoney((totalCostCents + totalDeliveryPriceCents) * 0.1)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatMoney((totalCostCents + totalDeliveryPriceCents) * 1.1)}</div>
  </div>

  <button class="place-order-button button-primary">Place your order</button>
`;

  document.querySelector(".payment-summary").innerHTML = paymentSummaryHTML;
}
