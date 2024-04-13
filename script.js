let result = document.getElementById('result');

let searchBtn = document.getElementById('searchBtn');
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener('click', () => {
    let userInput = document.getElementById('userInput').value;
    if(userInput.length == 0){
        result.innerText =`Input field can't be empty`
    } else {
        fetch(url + userInput)
            .then((response) => response.json())
            .then((data) => {
                let myMeal = data.meals[0];

                let count = 1;
                let ingredients = [];
                for(let i in myMeal){
                    let ingredient = '';
                    let measure = '';

                    if(i.startsWith('strIngredient') && myMeal [i]) {
                        ingredient = myMeal[i];
                        measure = myMeal[`strMeasure` + count];
                        count += 1;

                        ingredients.push(`${measure} ${ingredient}`);
                    }
                }

                result.innerHTML = `
                    <img src="${myMeal.strMealThumb}">
                    <div class= "details">
                        <h2>${myMeal.strMeal}</h2>
                        <h3>${myMeal.strArea}</h3>
                    </div>
                    <div id= "ingreCont"></div>
                    <div id="recipe" style="display: none;">
                        <button id="hideRecipe">x</button>
                        <code id='instru'>${myMeal.strInstructions}</code>
                    </div>
                    <button id="showRecipe">View Recipe</button>
                `;

                let ingreCont = document.getElementById('ingreCont');
                let parent = document.createElement('ul');
                let recipe = document.getElementById('recipe');
                let hideRecipe = document.getElementById('hideRecipe');
                let showRecipe = document.getElementById('showRecipe');

                ingredients.forEach((i) => {
                    let child = document.createElement('li');
                    child.innerText = i;
                    parent.appendChild(child);
                    ingreCont.appendChild(parent);
                });

                hideRecipe.addEventListener('click', () => {
                    recipe.style.display = 'none';
                });

                showRecipe.addEventListener('click', () => {
                    recipe.style.display = "block";
                });
            })
            .catch(() => {
                result.innerHTML = `Invalid input`;
            });
    }
});
