const deleteButtons = document.querySelectorAll('.product-item button');

async function deleteProduct(event){
    const btnElement = event.target; // event.target 은 이벤트가 발생되는 요소를 리턴한다?
    const productId = btnElement.dataset.productid; // product-item 뷰에서 설정한 delete button의 dataset을 할당함.
    const csrfToken = btnElement.dataset.csrf;
    console.log(csrfToken);

    // 프론트엔드에서 해당 productId를 백엔드로 보내기 위한 코드
    const response = await fetch('/admin/products/' + productId + '/?_csrf=' + csrfToken, { 
        method: "DELETE"
    });

    if(!response.ok){
        alert('Something went wrong!');
        return;
    }

    btnElement.parentElement.parentElement.parentElement.parentElement.remove();

}


for (const btn of deleteButtons){
    btn.addEventListener('click', deleteProduct);
}