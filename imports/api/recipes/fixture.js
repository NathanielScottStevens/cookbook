const recipesSample = [
  { name: 'garden salad',
    type: 'salad',
    img: 'garden-salad.jpg',
    slug: 'garden-salad',
    serves: 24,
    ingredients: [
      { name: 'romaine hearts', amt: 3, uom: null },
      // TODO: ask about ranged amount: 10-12 ozs
      { name: 'spinach', amt: 10, uom: 'oz' },
      { name: 'bell pepper', amt: 2, uom: null },
      { name: 'cucumber', amt: 1, uom: null },
      // 1 pnt or 3 each
      { name: 'tomatoes',	amt: 1, uom: 'pnt' },
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
  { name: 'spanish rice',
    type: 'side',
    img: 'spanish-rice.jpg',
    slug: 'spanish-rice',
    serves: 24,
    ingredients: [
      { name: 'Long Grain Brown Rice', amt: 6, uom: 'cup' },
      { name: 'Red Salsa', amt: 3, uom: 'cup' },
      { name: 'Water', amt: 9, uom: 'cup' },
      { name: 'Dried Oregano', amt: 1, uom: 'Tbs' },
      { name: 'Paprika', amt: 1, uom: 'Tbs' },
      { name: 'Salt', amt: 1, uom: 'tsp' },
    ],
    steps: [
      'Preheat oven to 375F.',
      'Bring water to a simmer in a pot.',
      'Pour all dry ingredients into a large hotel pan and mix together.',
      'Add salsa, and simmering water. Stir carefully.',
      'Cover pans securely with foil. You also may want to set pans on a large sheet pan in case of any leakage or overflow.',
      'Bake at 375 degrees F. for 1-2 hours, until liquid is absorbed and rice is tender. Allow to sit covered for 30 minutes before serving for best texture.',
      'Gently stir and fluff each pan of rice to mix ingredients before serving.',
    ],
  },
  { name: 'fish', type: 'entree', img: 'entree.jpg' },
  { name: 'pasta', type: 'entree', img: 'entree.jpg' },
  { name: 'soup', type: 'entree', img: 'entree.jpg' },
  { name: 'carrots', type: 'side', img: 'side-dish.jpg' },
  { name: 'corn', type: 'side', img: 'side-dish.jpg' },
  { name: 'pudding', type: 'dessert', img: 'dessert.jpg' },
  { name: 'cake', type: 'dessert', img: 'dessert.jpg' },
];

export default recipesSample;
