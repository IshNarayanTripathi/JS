export const cart = [];

export function addToCart(id, name) {
  const quantity = document.querySelector(
    `.js-cart-quantity-${id} select`
  ).value;
  const product = cart.find((product) => product.id === id) ?? null;
  const buttonElement = document.querySelector(`.js-added-to-cart-${id}`);

  buttonElement.classList.add("added-to-cart-visible");
  clearTimeout(buttonElement.timeout);
  buttonElement.timeout = setTimeout(() => {
    buttonElement.classList.remove("added-to-cart-visible");
  }, 2000);
  if (product) {
    product.quantity += Number(quantity);
  } else {
    cart.push({ name, quantity: Number(quantity), id });
  }
}