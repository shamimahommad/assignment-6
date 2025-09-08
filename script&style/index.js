
//All Plant From api
const allPlants = () => {
    const url = 'https://openapi.programming-hero.com/api/plants';
    fetch(url)
        .then((res) => res.json())
        .then((contents) => cardContainer(contents.plants));
}

const allTreeBtn = document.getElementById('all-tree-btn')
    .addEventListener ('click',allPlants);


const cardContainer = (plants) => {
    const cardBox = document.getElementById('card-container');
    cardBox.innerHTML = ``;
    for (let plant of plants) {
        const showAllTree = document.createElement('div');
        // console.log(plant);
        showAllTree.innerHTML = `
            <div class="card w-[370px] h-[430px] p-4 bg-white shadow-md">
                        <img class="h-[50%] object-cover rounded-lg" src="${plant.image}" alt="${plant.name}">
                        <h2 class="text-xl font-bold text-green-950">${plant.name}</h2>
                        <p class="h-[100px]">${plant.description}</p>
                        <div class="flex justify-between items-center p-2">
                            <button  class="px-3 bg-[#DCFCE7] rounded-full text-[#15803D]">${plant.category}</button>
                            <h2 class="font-bold">$<span>${plant.price}</span></h2>
                        </div>
                        <button class="btn bg-[#15803D]  rounded-3xl text-white ">Add to Cart</button>
        `;
        cardBox.append(showAllTree);
    }
} //all plant form api

const plantCategoryID = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((json) => cardContainer(json.plants));
}

//menu load
const cardCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
        .then((res) => res.json())
        .then((json) => cardMenu(json.categories));
}
const cardMenu = (categories) => {
    const cardCategory = document.getElementById('card-category');
    cardCategory.innerHTML = ``;
    for (let categorie of categories) {
        // console.log(categorie);  
        const menuDiv = document.createElement('div');
        menuDiv.innerHTML = `
        <ul class='text-left'>
            <li onclick="plantCategoryID(${categorie.id})" class=" text-xl w-full mt-2 justify-start">${categorie.category_name}</li>
        </ul>        
        `;
        cardCategory.append(menuDiv);
    }
}
//Menu Load


allPlants();
cardCategory();