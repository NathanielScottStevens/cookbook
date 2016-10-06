const recipesSample = [
  { name: 'greek', type: 'salad', img: 'salad.jpg' },
  { name: 'house', type: 'salad', img: 'salad.jpg' },
  { name: 'fish', type: 'entree', img: 'entree.jpg' },
  { name: 'pasta', type: 'entree', img: 'entree.jpg' },
  { name: 'soup', type: 'entree', img: 'entree.jpg' },
  { name: 'carrots', type: 'side', img: 'side-dish.jpg' },
  { name: 'corn', type: 'side', img: 'side-dish.jpg' },
  { name: 'pudding', type: 'dessert', img: 'dessert.jpg' },
  { name: 'cake', type: 'dessert', img: 'dessert.jpg' },
  { name: 'vegetable shepard pie',
    type: 'entree',
    img: 'entree.jpg',
    ingredients: [
      { name: 'large peeled and quartered potatoes', amt: 8, uom: null },
      { name: 'sliced carrots', amt: 2, uom: null },
      { name: 'mixed frozen vegetables', amt: 16, uom: 'ounce' },
    ],
    steps: [
      'Preheat oven to 375 degrees F (175 degrees C).',
      'Cook potatoes, covered, in a small amount of boiling water until tender. Drain and mash.',
      'While potatoes are cooking, steam or boil carrots and mixed vegetables until near tender. Drain and set aside.',
      'In a small saucepan, cook garlic powder, basil and parsley in butter or margarine for about 20 seconds (or microwave for 10 seconds).',
      'Stir into mashed potatoes along with salt and pepper. Gradually beat in enough milk to make potatoes light and fluffy, add a little more milk if necessary. Set aside',
      'In a medium saucepan, cook onion in oil until tender but not brown. Stir in kidney beans, tomatoes, tomato sauce, soy sauce, sugar and vegetable/carrot mixture. Heat through until bubbly.',
      'Transfer vegetable mixture to a 8x8x2 inch baking dish. Drop mashed potatoes in mounds over the top. Sprinkle with cheese and paprika. Bake, uncovered at 375 degrees F (175 degrees C) for 30 minutes.',
    ] },
];

export default recipesSample;
