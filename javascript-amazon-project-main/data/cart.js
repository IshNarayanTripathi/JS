export const cart = [{
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
}, {
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
}];

export function addToCart(id) {
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
    cart.push({ id, quantity: Number(quantity)  });
  }
}