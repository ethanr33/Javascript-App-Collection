
window.onload = () => {

  const popupContainer = document.getElementById("popup-container");
  const recipeContainer = document.getElementById("recipe-container");
  const addRecipeContainer = document.getElementById("recipe-search-container");
  const recipePopupClear = document.getElementById("recipe-popup-clear");
  const recipeSearchClear = document.getElementById("recipe-search-clear");
  const addRecipeButton = document.getElementById("recipe-adder");
  const searchRecipeButton = document.getElementById("search-icon");
  const searchOutput = document.getElementById("search-output-container");
  const searchInput = document.getElementById("search-bar");
  const popupIngredientsList = document.getElementById("ingredients-list");
  const popupInstructionsList = document.getElementById("popup-instructions");
  const popupImage = document.getElementById("popup-img");
  const popupName = document.getElementById("popup-name");
  const deleteRecipeButton = document.querySelector(".delete-recipe-button");


  let recipeCards = [];

  let inputTimeout = 900;
  let inputDebounce = false;

  addRecipeButton.addEventListener("click", e => {
    addRecipeContainer.classList.remove("hidden");
  });

  recipeSearchClear.addEventListener("click", e => {
    addRecipeContainer.classList.add("hidden");
  });

  recipePopupClear.addEventListener("click", e => {
    popupContainer.classList.add("hidden");
  });

  searchRecipeButton.addEventListener("click", e => {
      checkAndRenderSearches();
  });

  searchInput.addEventListener("keyup", e => {
    if (!inputDebounce) {
      inputDebounce = true;

      setTimeout(() => {
        searchOutput.innerHTML = "Loading...";
        checkAndRenderSearches();
      }, inputTimeout);

      inputDebounce = false;
    }
  });


  deleteRecipeButton.addEventListener("click", e => {
    recipeCards.forEach(card => {
      if (card.props.meal.strMeal == popupName.innerHTML) {
        let index = recipeCards.indexOf(card);
        recipeCards.splice(index, 1);

        popupName.innerHTML = "";
        popupImage.src = "";
        popupInstructionsList.innerHTML = "";
        ReactDOM.unmountComponentAtNode(popupIngredientsList);

        ReactDOM.unmountComponentAtNode(recipeContainer);
        ReactDOM.render(recipeCards, recipeContainer);

        popupContainer.classList.add("hidden");
      }
    })
  });


  class SearchResult extends React.Component {
    constructor(props) {
      super(props);

      this.makeRecipeCard = this.makeRecipeCard.bind(this);
    }
    makeRecipeCard() {
      console.log(this.props.result)
      ReactDOM.unmountComponentAtNode(recipeContainer);
      recipeCards.push(<RecipeCard meal={this.props.result} />);
      ReactDOM.render(recipeCards, recipeContainer);
    }
    render() {
      return (
        <div id={this.props.result.idMeal} className="search-result">
          <p className="search-result-name popup-text">{this.props.result.strMeal}</p>
          <button onClick={this.makeRecipeCard} className="search-result-add">Add recipe</button>
        </div>
      );
    }
  }

  class ListItem extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <li className="popup-text">{this.props.text}</li>
      );
    }
  }

  class RecipeCard extends React.Component {
    constructor(props) {
      super(props);
    }
    togglePopup() {
      popupContainer.classList.remove("hidden");

      ReactDOM.unmountComponentAtNode(popupIngredientsList);

      let propCount = 1;
      let ingredients = [];
      while (this.props.meal[`strIngredient${propCount}`] !== "") {
        ingredients.push(<ListItem text={this.props.meal[`strIngredient${propCount}`]} />);
        propCount++;
      }

      popupInstructionsList.innerHTML = this.props.meal.strInstructions;

      popupImage.src = this.props.meal.strMealThumb;

      popupName.innerHTML = this.props.meal.strMeal;

      ReactDOM.render(ingredients, popupIngredientsList);

    }
    render() {
      return (<div id={"recipe-" + this.props.meal.mealId} className="recipe-card">
        <div className="recipe-img-container">
          <img className="recipe-img" src={this.props.meal.strMealThumb} />
        </div>
        <div className="recipe-text">
          <div className="recipe-name-container">
            <p className="recipe-name">{this.props.meal.strMeal}</p>
          </div>
          <div className="recipe-open-container">
            <button className="recipe-open-button" onClick={this.togglePopup.bind(this)}>Open Recipe</button>
          </div>
        </div>
      </div>);
    }
  }


  class SearchRecipe extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div className="search-recipe">
          <p className="popup-text">{this.props.recipeName}</p>
          <button className="recipe-choose-button">Select</button>
        </div>
      );
    }
  }

  function checkAndRenderSearches() {
    let query = searchInput.value;
    let result;

    ReactDOM.unmountComponentAtNode(searchOutput);
    if (query.length < 1) {
      searchOutput.innerHTML = "Please enter a valid recipe";
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURI(query)}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        let meals = json.meals;

        if (meals === null) {
          searchOutput.innerHTML = "No results found";
          return;
        }

        let mealsJSX = [];
        meals.forEach(meal => {
          mealsJSX.push(<SearchResult key={meal.mealId} result={meal} />);
        });
        ReactDOM.render(mealsJSX, searchOutput);
      })
    }
  }


}
