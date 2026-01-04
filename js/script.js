const addBtn = document.getElementById("addRestaurant");
const restaurantList = document.getElementById("restaurantList");

// 讀取 Local Storage 的餐廳資料
let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];

// 將餐廳資料渲染到列表
function renderList() {
    restaurantList.innerHTML = "";
    restaurants.forEach((r, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<strong>${r.name}</strong> - ${r.address} <br>特色: ${r.feature} 
                        <button class="btn btn-sm btn-danger float-end delete-btn">刪除</button>`;
        restaurantList.appendChild(li);

        // 刪除功能
        li.querySelector(".delete-btn").addEventListener("click", () => {
            restaurants.splice(index, 1);
            localStorage.setItem("restaurants", JSON.stringify(restaurants));
            renderList();
        });
    });
}

// 新增餐廳
addBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const feature = document.getElementById("feature").value;

    if(name && address && feature){
        const newRestaurant = { name, address, feature };
        restaurants.push(newRestaurant);
        localStorage.setItem("restaurants", JSON.stringify(restaurants));
        renderList();

        // 清空輸入框
        document.getElementById("name").value = "";
        document.getElementById("address").value = "";
        document.getElementById("feature").value = "";
    } else {
        alert("請填寫完整餐廳資訊！");
    }
});

// 初始渲染
renderList();
