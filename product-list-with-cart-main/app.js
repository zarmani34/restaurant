const btn = document.querySelectorAll(".cart-btn");
btn.forEach((button) => {
  button.addEventListener("click", addToCart);
  function addToCart() {
    button.removeEventListener("click", addToCart);
    const itemCount = button.querySelector(".item-count");
    itemCount.style.display = "flex";
    if (itemCount.style.display === "flex") {
      const imgContainer =
        itemCount.parentElement.parentElement.previousElementSibling;
      imgContainer.style.border = "2px solid var(--Red)";

      const minus = itemCount.querySelector(".minus");
      const plus = itemCount.querySelector(".plus");
      let itemQuantity = itemCount.querySelector("span");
      let count = 1;
      minus.addEventListener(
        "click",
        (decrement = (e) => {
          e.stopPropagation();
          if (count <= 1) {
            count = 2;
          }
          count -= 1;
          itemQuantity.textContent = count;
          cartItem.querySelector(".item-quantity").textContent = `${count}x`;
          cartItem.querySelector(".item-total-price").textContent = `$${count * itemTotalPrice}`;
        })
      );
      plus.addEventListener(
        "click",
        (increment = (e) => {
          e.stopPropagation();
          count += 1;
          itemQuantity.textContent = count;
          cartItem.querySelector(".item-quantity").textContent = `${count}x`;
          cartItem.querySelector(".item-total-price").textContent =`$${count * itemTotalPrice}`;
        })
      );
      const cartContainer = document.querySelector(".cart-container");
      const emptyCart = cartContainer.querySelector(".empty");
      emptyCart.style.display = "none";
      const productName =
      itemCount.parentElement.parentElement.nextElementSibling
      .nextElementSibling.textContent;
      const price =
      itemCount.parentElement.parentElement.nextElementSibling
          .nextElementSibling.nextElementSibling;
          let itemTotalPrice = parseFloat(price.textContent.replace('$',''))
          const cartItem = document.createElement("div");
          cartItem.innerHTML = `
          <div class="cart-items">
          <div class="item-details">
          <p>
          ${productName}
          </p>
          <div class="quantity-and-price">
          <span class="item-quantity"></span>
          <span class="item-price">@ ${price.textContent}</span>
          <span class="item-total-price"></span>
          </div>
          </div>
          <div class="remove-btn">
          &otimes;
          </div>
          </div>
          <hr>
          `;
          cartContainer.appendChild(cartItem);
          updateItemCount()
          // console.log()
        cartItem.querySelector(".item-quantity").textContent = `${count}x`;
      cartItem.querySelector(".item-total-price").textContent = `$${itemTotalPrice}`;
      console.log(cartContainer.querySelectorAll('.cart-items').length)
      const removeBtn = cartItem.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            cartContainer.removeChild(cartItem);
            imgContainer.style.border = "none";
            itemCount.style.display = "none";
            button.addEventListener("click", addToCart);
            count = 1;
            itemQuantity.textContent = count;
            if (!cartContainer.querySelector('.cart-items')) {
                emptyCart.style.display = 'block';
            }
        });
    }
  }
});

function updateItemCount() {
  const cartItems = document.querySelectorAll('.cart-items');
  const itemCount = cartItems.length;
  console.log(itemCount)
  document.querySelector('.cart-length').textContent = itemCount+1;
}

// Update quantity with ternary operation
{
  function updateQuantity(e) {
  e.stopPropagation();
  const increment = e.target.classList.contains('plus') ? 1 : -1;
  count = Math.max(1, count + increment);
  itemQuantity.textContent = count;
  cartItem.querySelector(".item-quantity").textContent = `${count}x`;
  cartItem.querySelector(".item-total-price").textContent = `$${count * itemTotalPrice}`;
}
minus.addEventListener("click", updateQuantity);
plus.addEventListener("click", updateQuantity);

}
{
  function updateQuantity(increment) {
    count = Math.max(1, count + increment);
    itemQuantity.textContent = count;
    cartItem.querySelector(".item-quantity").textContent = `${count}x`;
    cartItem.querySelector(".item-total-price").textContent = `$${count * itemTotalPrice}`;
}
minus.addEventListener("click", (e) => {
  e.stopPropagation();
  updateQuantity(-1);
});
plus.addEventListener("click", (e) => {
  e.stopPropagation();
  updateQuantity(1);
});

}



{const btn = document.querySelectorAll(".cart-btn");

btn.forEach(button => {
    button.addEventListener("click", addToCart);

    function addToCart() {
        button.removeEventListener("click", addToCart);
        const itemCount = button.querySelector(".item-count");
        itemCount.style.display = "flex";

        const imgContainer = itemCount.parentElement.parentElement.previousElementSibling;
        imgContainer.style.border = "2px solid var(--Red)";

        const minus = itemCount.querySelector(".minus");
        const plus = itemCount.querySelector(".plus");
        const itemQuantity = itemCount.querySelector("span");
        let count = 1;

        minus.addEventListener("click", (e) => updateQuantity(e, -1));
        plus.addEventListener("click", (e) => updateQuantity(e, 1));

        const cartContainer = document.querySelector(".cart-container");
        const emptyCart = cartContainer.querySelector(".empty");
        emptyCart.style.display = "none";

        const productName = itemCount.parentElement.parentElement.nextElementSibling.nextElementSibling.textContent;
        const priceElement = itemCount.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
        const itemTotalPrice = parseFloat(priceElement.textContent.replace('$', ''));

        const cartItem = createCartItem(productName, priceElement.textContent, count, itemTotalPrice);
        cartContainer.appendChild(cartItem);

        cartItem.querySelector(".remove-btn").addEventListener('click', () => {
            removeCartItem(cartItem, imgContainer, itemCount, emptyCart, button);
        });

        function updateQuantity(e, increment) {
          e.stopPropagation();
          count = Math.max(1, count + increment);
          itemQuantity.textContent = count;
          cartItem.querySelector(".item-quantity").textContent = `${count}x`;
          cartItem.querySelector(".item-total-price").textContent = `$${count * itemTotalPrice}`;
        }
    }
});

function createCartItem(productName, price, count, itemTotalPrice) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-items");
    cartItem.innerHTML = `
        <div class="item-details">
            <p>${productName}</p>
            <div class="quantity-and-price">
                <span class="item-quantity">${count}x</span>
                <span class="item-price">@ ${price}</span>
                <span class="item-total-price">$${itemTotalPrice}</span>
            </div>
        </div>
        <div class="remove-btn">&otimes;</div>
        <hr>
    `;
    return cartItem;
}

function removeCartItem(cartItem, imgContainer, itemCount, emptyCart, button) {
    const cartContainer = cartItem.parentElement;
    cartContainer.removeChild(cartItem);
    imgContainer.style.border = "none";
    itemCount.style.display = "none";
    button.addEventListener("click", addToCart);
    if (!cartContainer.querySelector('.cart-items')) {
        emptyCart.style.display = 'block';
    }
}
}
