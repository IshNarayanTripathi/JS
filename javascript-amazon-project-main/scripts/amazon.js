let productsHTML = "";

products.forEach((product) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container js-cart-quantity-${product.id}">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-name="${product.name}" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});

document.querySelector(".js-product-grid").innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    
    const name = button.dataset.productName;
    const { productId: id } = button.dataset;
    const quantity = document.querySelector(`.js-cart-quantity-${id} select`).value;
    const product = cart.find(product => product.id === id) ?? null;
    const buttonElement = document.querySelector(`.js-added-to-cart-${id}`);

    buttonElement.classList.add('added-to-cart-visible');
    clearTimeout(buttonElement.timeout);
    buttonElement.timeout = setTimeout(() => {
      buttonElement.classList.remove('added-to-cart-visible');
    }, 2000);
    if (product){
      product.quantity += Number(quantity);
    }
    else{
      cart.push({name, quantity: Number(quantity), id});
    }
    let totalItems = 0;
    cart.forEach(items => totalItems += items.quantity);
    console.log(`You have ${totalItems} items in your cart.`);
    document.querySelector('.js-cart-quantity').innerHTML = totalItems;
    console.log(cart);
  });
});

