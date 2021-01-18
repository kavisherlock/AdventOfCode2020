const { readLines } = require('../../fileReader');

async function main() {
  const ingredientData = await readLines('../input.txt');

  const foods = [];
  const allergenFoods = {};
  ingredientData.forEach((line) => {
    const ingredients = line.split(' (contains ')[0];
    foods.push(ingredients);
    let allergies = line.split(' (contains ')[1].trim();
    allergies = allergies.substr(0, allergies.length - 1);

    allergies.split(', ').forEach(a => {
      if (allergenFoods[a]) allergenFoods[a].push(ingredients);
      else allergenFoods[a] = [ingredients];
    });
  });
  
  const possibleAllergens = new Set();
  Object.keys(allergenFoods).forEach(allergy => {
    const totalFoods = allergenFoods[allergy].length;
    const ingredientCounts = {};
    allergenFoods[allergy].forEach(food => {
      const ingredients = food.split(' ');
      ingredients.forEach(ingredient => {
        if (ingredientCounts[ingredient]) ingredientCounts[ingredient] += 1;
        else ingredientCounts[ingredient] = 1;
      });
    });

    Object.keys(ingredientCounts).forEach(ingredient => {
      if (ingredientCounts[ingredient] === totalFoods) {
        possibleAllergens.add(ingredient);
      }
    });
  });

  let nonAllergenFoodCount = 0;
  foods.forEach(food => {
    food.split(' ').forEach(i => {
      if (!possibleAllergens.has(i)) {
        nonAllergenFoodCount += 1;
      }
    });
  });

  console.log(nonAllergenFoodCount);
}

main();