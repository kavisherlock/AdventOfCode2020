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
  
  const possibleAllergens = {};
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
        if (possibleAllergens[allergy]) possibleAllergens[allergy].add(ingredient);
        else possibleAllergens[allergy] = new Set([ingredient]);
      }
    });
  });

  const definiteAllergens = {}
  const nAllergies = Object.keys(possibleAllergens).length;
  for (let i = 0; i < nAllergies; i += 1) {
    const sortedAllergies = Object.entries(possibleAllergens).sort(([_, a], [_2, b]) => a.size - b.size);
    const allergy = sortedAllergies[0][0];
    const allergen = Array.from(sortedAllergies[0][1])[0];
    definiteAllergens[allergy] = allergen;
    delete possibleAllergens[allergy];
    Object.keys(possibleAllergens).forEach(a => possibleAllergens[a].delete(allergen));
  }

  const sortedAllergies = Object.keys(definiteAllergens).sort();
  let danger = '';
  sortedAllergies.forEach(a => { danger += `${definiteAllergens[a]},` })
  console.log(danger.substr(0, danger.length - 1));
}

main();