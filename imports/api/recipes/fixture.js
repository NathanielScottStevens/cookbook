const recipesSample = [
  { name: 'fish', type: 'entree', img: 'entree.jpg' },
  { name: 'pasta', type: 'entree', img: 'entree.jpg' },
  { name: 'soup', type: 'entree', img: 'entree.jpg' },
  { name: 'carrots', type: 'side', img: 'side-dish.jpg' },
  { name: 'corn', type: 'side', img: 'side-dish.jpg' },
  { name: 'pudding', type: 'dessert', img: 'dessert.jpg' },
  { name: 'cake', type: 'dessert', img: 'dessert.jpg' },
  { name: 'garden salad',
    type: 'salad',
    img: 'salad.jpg',
    serves: 24,
    ingredients: [
      { name: 'romaine hearts', amt: 3, uom: null },
      // TODO: ask about ranged amount: 10-12 ounces
      { name: 'spinach', amt: 10, uom: 'ounce' },
      { name: 'bell pepper', amt: 2, uom: null },
      { name: 'cucumber', amt: 1, uom: null },
      // 1 pint or 3 each
      { name: 'tomatoes',	amt: 1, uom: 'pint' },
    ],
    steps: [
      'Wash and cut or tear lettuce into bite size pieces.',
      'Combine with spinach in hotel pan.',
      'Wash and dice remaining vegetables into bite size pieces.',
      'Toss with lettuce.',
      'Cover with plastic wrap or foil.',
      'Refrigerate until ready to serve.',
      'Dress before serving, not in advance.',
    ],
  },
];

export default recipesSample;
