
const addBtn = document.querySelector("#product-details button");

const badge = document.querySelector(".nav-items .badge");

async function addToCart(event) {
  const productId = addBtn.dataset.productid;
  const csrfToken = addBtn.dataset.csrf;

let response
  try {
     response = await fetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken
      }),
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    alert('Something went wrong!');
    return;
  }

  if(!response.ok){
    alert('Something went wrong!');
    return;
  }

 const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalItems;
  badge.textContent = newTotalQuantity;
}

addBtn.addEventListener("click", addToCart);
