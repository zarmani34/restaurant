const cartBtn = document.querySelectorAll('.cart-btn');
const cartContainer = document.querySelector(".cart-container");
const cartContainerBottom = document.querySelector('.cart-bottom')
const checkOutCart = document.querySelector('.checkout-cart')
for (const cartButton of cartBtn){
    cartButton.addEventListener('click', addToCart)
    function addToCart(event){
        event.stopPropagation();
        cartButton.removeEventListener('click', addToCart);

        const itemCounter = cartButton.querySelector('.item-count');
        const imgContainer = itemCounter.parentElement.parentElement.previousElementSibling;
        const minus = itemCounter.querySelector(".minus");
        const plus = itemCounter.querySelector(".plus");
        let count = 1;
        
        itemCounter.style.display = 'flex'
        cartContainerBottom.style.display = 'block'
        imgContainer.style.border = "2px solid var(--Red)";
        cartButton.style.border = 'none'
                
        minus.addEventListener('click', (e) =>{
            e.stopPropagation
            updateItemQuantity(-1)
        });
        plus.addEventListener("click", (e) => {
            e.stopPropagation();
            updateItemQuantity(1);
        });
        // Cart manipulation
        const emptyCart = cartContainer.querySelector(".empty");
        emptyCart.style.display = "none"; //Clear the empty container

        const productName = itemCounter.parentElement.parentElement.nextElementSibling.nextElementSibling.textContent;
        const price = itemCounter.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
        const itemPrice = parseFloat(price.replace('$','')).toFixed(2);
       
        const cartItem = createCartItem(productName, count, price, itemPrice);
        cartContainer.appendChild(cartItem);
        const imgSrc = cartButton.getAttribute('data-img')
        const checkOutItem = checkOut(productName, count, price, itemPrice, imgSrc)
        checkOutCart.appendChild(checkOutItem);
        cartContainerQuantity();
        function updateItemQuantity(change){
            const quantity = itemCounter.querySelector('span');
            count = Math.max(1, count+=change);
            quantity.textContent=count;
            cartItem.querySelector('.item-quantity').innerHTML = `${count}x`;
            checkOutItem.querySelector('.item-quantity').innerHTML = `${count}x`;
            const calcItemPrice = itemPrice*count
            cartItem.querySelector('.item-total-price').innerHTML = `$${calcItemPrice.toFixed(2)}`;
            checkOutItem.querySelector('.item-total-price').innerHTML = `$${calcItemPrice.toFixed(2)}`;
            cartTotalPrice(cartContainerBottom);
        }
        cartItem.querySelector(".remove-btn").addEventListener('click', () => {
            removeCartItem(cartItem, imgContainer, itemCounter,cartButton, checkOutItem)
        });
        cartTotalPrice(cartContainerBottom);
        
    };
};
// Create cart item
function createCartItem(productName, count, price, itemPrice) {
    const cartItem = document.createElement("div");
    cartItem.innerHTML=`
        <div class="cart-item">
            <div class="item-details">
                <p>${productName}</p>
                <span class="item-quantity">${count}x</span>
                <span class="item-price">@ ${price}</span>
                <span class="item-total-price">$${itemPrice}</span>
            </div>
            <div class="remove-btn">
                &otimes;
            </div>
        </div>
        <hr>
    `
    return cartItem;
};
// Create checkout cart
function checkOut(productName, count, price, itemPrice, imgSrc) {
    const cartItem = document.createElement("div");
    cartItem.innerHTML=`
        <div class="cart-item">
            <div class="checkout-product">
                <div class="checkout-product-img"><img src="${imgSrc}"></div>
                <div class="checkout-details">
                    <p>${productName}</p>
                    <span class="item-quantity">${count}x</span>
                    <span class="item-price">@ ${price}</span>
                </div>
            </div>
                
            <span class="item-total-price">$${itemPrice}</span>
        </div>
        <hr>
    `
    return cartItem;
};
// Remove cart item on click
function removeCartItem(cartItem, imgContainer, itemCounter, cartButton, checkOutItem){
    cartContainer.removeChild(cartItem);
    checkOutCart.removeChild(checkOutItem);
    itemCounter.style.display = 'none'
    imgContainer.style.border = "none";
    cartContainerQuantity();
    cartButton.addEventListener('click', addToCart);
    cartButton.style.border = '2px solid var(--Red)'
    cartTotalPrice();
};
// Amount of items in the container
function cartContainerQuantity(){
    const cartQuantity = cartContainer.querySelectorAll('.cart-item');
    cartContainer.querySelector('.cart-length').textContent=cartQuantity.length;
    if(cartQuantity.length <= 0) {
        const emptyCart = cartContainer.querySelector(".empty");
        emptyCart.style.display = "block";
        cartContainerBottom.style.display = 'none'
    };
};
// Calculate total price
function cartTotalPrice(container){
   const cartTotal = container.querySelector('.cart-total');
   const itemTotalPrice = cartContainer.querySelectorAll('.item-total-price');
   let total=0
    for(const itemTotal of itemTotalPrice){
        total+=parseFloat(itemTotal.innerText.replace('$', ''));
    }
    total=total.toFixed(2)
    cartTotal.innerHTML = '$' + total
}
// Order confirmation
const orderBtn = document.querySelector('.order-btn')
orderBtn.addEventListener('click', (e) => {
    const confirmationModal = document.querySelector('.order-confirmation')
    confirmationModal.style.display = 'flex'
    const cartTotal = document.querySelector('.checkout-content .order-total')
    cartTotalPrice(cartTotal)
    window.onclick = function(event) {
        if (event.target == confirmationModal) {
            confirmationModal.style.display = "none";
        }
      }
})
// New order btn
const newOrderBtn = document.querySelector(".new-order-btn");
newOrderBtn.addEventListener('click', () => {
    location.reload();
})