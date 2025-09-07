

const allPlants = () => {
    const url = 'https://openapi.programming-hero.com/api/plants';
    fetch(url)
        .then((res) => res.json())
        .then((plant) => cardContainer(plant.plants));
}

const cardContainer = (plant) => {
    const cardBox = document.getElementById('card-container');
    // cardBox.innerHTML=``;
    console.log(plant);

}

const cardCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
        .then((res) => res.json())
        .then((json) => cardMenu(json.categories));
}

//menu load
const cardMenu=(categories)=>{
    const cardCategory=document.getElementById('card-category');
    cardCategory.innerHTML=``;
    for(let categorie of categories){
        // console.log(categorie);  
        const menuDiv=document.createElement('div')      ;
        menuDiv.innerHTML=`
        <ul class='text-left'>
            <li class="  text-xl btn bg-[#15803D] w-full text-white justify-start">${categorie.category_name}</li>
        </ul>        
        `;
        cardCategory.append(menuDiv);
    }
}

// ২. যেই বাটনে ক্লিক করবেন সেই বাটনকে ধরে bg-blue-500 এই ক্লাস এড করে দিবেন। কালার এড করলেও সেটাতে এড হয়ে যাবে এবং দেখা যাবে।

allPlants();
cardCategory();
// {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
// }