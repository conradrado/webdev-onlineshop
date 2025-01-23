const updateForms = document.querySelectorAll(".cart-item-action");

async function updateCartItem(event) {
  event.preventDefault(); //이벤트가 기본값으로 동작(get요청)하는 것을 막아준다.
  const form = event.target; // 이벤트가 발생되는 form을 할당
  const cartBadge = document.querySelector(".nav-items .badge");
  const cartTotal = document.querySelector("#cart-total #cartTotal");

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const newQuantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
        quantity: newQuantity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("something went wrong");
    return;
  }

  if (!response.ok) {
    alert("error");
    return;
  }
  const responseData = await response.json();

  // 항목의 가격이 0이면 해당 항목을 삭제한다.
  if (responseData.updatedItemPrice === 0) {
    form.parentNode.parentNode.remove();
  } else {
    const cartItemTotalPriceElement = form.parentNode.querySelector(
      ".cart-item-info #cart-item-total"
    );
    const cartItemTotalPriceText = cartItemTotalPriceElement.childNodes[0];
    cartItemTotalPriceText.textContent =
      "$" + responseData.updatedItemPrice.toFixed(2);
  }

  cartTotal.textContent = responseData.updatedPrice.toFixed(2);
  cartBadge.textContent = responseData.updatedQuantity;
}

for (const updateForm of updateForms) {
  updateForm.addEventListener("submit", updateCartItem);
}
