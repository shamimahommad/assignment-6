
//All Plant From api
const allPlants = () => {
    manageSpinner(true);
    const url = 'https://openapi.programming-hero.com/api/plants';
    fetch(url)
        .then((res) => res.json())
        .then((contents) => {
            cardContainer(contents.plants);
            manageSpinner(false);
        });

}

// all tree button
const allTreeBtn = document.getElementById('all-tree-btn')
    .addEventListener('click', allPlants);


// modal tree details 
const treeDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => treeModal(data.plants));
}
const treeModal = (data) => {
    const detailsBox = document.getElementById('tree_modal');
    detailsBox.innerHTML = `    
            <div class="modal-box">
            <div class="card w-full h-[470px] p-2">
                <h2 class="text-2xl mb-1 font-bold text-green-950">${data.name}</h2>
                <img class="h-[45%] object-cover rounded-lg" src="${data.image}" alt="${data.name}">
                <h2 class="mt-1  text-green-950"><span class="text-lg font-bold">Category: </span>${data.category}</h2>
                <h2><span class="text-lg font-bold">Price: $</span>${data.price}</h2>
                <p><span class="text-lg font-bold">Description: </span>${data.description}</p>

                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.getElementById('tree_modal').showModal();
}
//modal end


//loading function
const manageSpinner=(status)=>{
    if(status==true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('card-container').classList.add('hidden');
    }else{
        document.getElementById('card-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}


const cardContainer = (plants) => {
    const cardBox = document.getElementById('card-container');
    cardBox.innerHTML = ``;
    for (let plant of plants) {
        const showAllTree = document.createElement('div');
        // console.log(plant);
        showAllTree.innerHTML = `
            <div class="card w-[370px] h-[430px] p-4 bg-white shadow-md">
                        <img class="h-[50%] object-cover rounded-lg" src="${plant.image}" alt="${plant.name}">
                        <h2 class="text-xl plant-name font-bold text-green-950">${plant.name}</h2>
                        <p class="h-[100px]">${plant.description}</p>
                        <div class="flex justify-between items-center p-2">
                            <button onclick="treeDetails(${plant.id})" class="px-3 border-2 rounded-full text-[#15803D]">${plant.category}</button>
                            <h2 class="font-bold">$<span>${plant.price}</span></h2>
                        </div>
                        <button onclick='addToCart(${plant.id})' class="btn bg-[#15803D] cart-btn rounded-3xl text-white ">Add to Cart</button>
        `;
        cardBox.append(showAllTree);
    };
}


//active class remove korar jonno
const removeActive=()=>{
    const menuBtns=document.querySelectorAll('.menu-btn');
    // console.log(menuBtns);
    menuBtns.forEach(btn=>btn.classList.remove('active'));    
}
const plantCategoryID = (id) => {
    manageSpinner(true);    //star spinner
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            removeActive();     //remove all active class
            const clickBtn=document.getElementById(`category-btn-${id}`)
            // console.log(clickBtn);            
            clickBtn.classList.add('active');
            cardContainer(json.plants)
            manageSpinner(false);
        });
}

//menu load
const cardCategory = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then((res) => res.json())
        .then((json) => cardMenu(json.categories));
};

const cardMenu = (categories) => {
    const cardCategory = document.getElementById('card-category');
    cardCategory.innerHTML = ``;
    const menuDiv = document.createElement('div');
    for (let categorie of categories) {
        const button = document.createElement('button');
        button.innerText = categorie.category_name;
        button.id = `category-btn-${categorie.id}`;
        button.className = "btn hover:bg-[#15803D] text-xl menu-btn mt-2 w-full justify-start";
        button.setAttribute("onclick", `plantCategoryID(${categorie.id})`);
        menuDiv.append(button);
    }
    cardCategory.append(menuDiv);
}
//Menu Load

// add to cart 
const addToCart = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((tree) => cartOption(tree.plants));
}

const addToCartData = [];
const cartOption = (tree) => {
    const treeName = `${tree.name}`;
    const treePrice = `${tree.price}`;
    const data = {
        id: Date.now().toString(),
        name: treeName,
        price: treePrice,
    }
    alert(`${treeName} has been added to cart 🛒`)
    addToCartData.push(data);

    const cartList = document.getElementById('cart-list');
    const div = document.createElement('div');
    div.setAttribute('data-id', data.id);
    div.innerHTML = `
                <div class="flex mt-3 justify-between rounded-xl items-center bg-[#F0FDF4] p-3">
                    <div>
                        <h1 class="font-bold text-green-950">${data.name}</h1>
                        <h1 class="mt-1">$ <span>${data.price}</span></h1>
                    </div>
                    <div>
                        <h1 style="cursor:pointer" onclick="removeFromCart('${data.id}')">❌</h1>
                    </div>
                </div>    
    `;
    cartList.append(div);

    // balance updating
    const cartBalance = parseInt(document.getElementById('total-cart').innerText);
    newBalance = cartBalance + parseInt(treePrice);
    document.getElementById('total-cart').innerText = newBalance;    
}//add to cart

// remove from cart 
const removeFromCart= (id)=> {
    const arrayID = addToCartData.findIndex(item => item.id === id);
    // console.log(arrayID);
    let itemPrice = 0;

    if (arrayID !== -1) {
        const price = parseInt(addToCartData[arrayID].price);
        itemPrice = isNaN(price) ? 0 : price;
        addToCartData.splice(arrayID, 1);
    }

    const row = document.querySelector(`[data-id="${id}"]`);
    if (row) row.remove();
    
    const afterRemove = document.getElementById('total-cart');
    const currentTotal = parseInt(afterRemove.innerText) || 0;
    const newTotal = currentTotal - itemPrice;
    afterRemove.innerText = newTotal;
}





allPlants();
cardCategory();