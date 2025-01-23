const forms = document.querySelectorAll(".order-actions form");

async function orderManage(event) {
  event.preventDefault();
  const form = event.target;

  const formData = new FormData(form);

  const csrfToken = formData.get("_csrf");
  const orderId = formData.get("orderid");
  const status = formData.get("status");

  let response;
  try {
    response = await fetch(`/admin/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: status,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("something went wrong");
    return;
  }

  if(!response.ok){
    alert('wrong');
    return;
  }

  try{
      const responseData = await response.json();
    form.parentNode.parentNode.querySelector('.badge').textContent = responseData.updatedStatus.toUpperCase();
    }
  catch(error){
    alert('failed!');
  }
}

for (const form of forms) {
  form.addEventListener("submit", orderManage);
}
