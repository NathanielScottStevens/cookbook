const recipesSample = [
  { label: 'garden salad',
    type: 'salad',
    img: 'garden-salad.jpg',
    slug: 'garden-salad',
    serves: 24,
    ingredients: [
      { label: null,
        list: [
          { label: 'romaine hearts', amt: 3, uom: null },
          // TODO: ask about ranged amount: 10-12 ozs
          { label: 'spinach', amt: 10, uom: 'oz' },
          { label: 'bell pepper', amt: 2, uom: null },
          { label: 'cucumber', amt: 1, uom: null },
          // 1 pnt or 3 each
          { label: 'tomatoes',	amt: 1, uom: 'pnt' },
        ],
      },
    ],
    steps: [
      { label: null,
        list: [
          'Wash and cut or tear lettuce into bite size pieces.',
          'Combine with spinach in hotel pan.',
          'Wash and dice remaining vegetables into bite size pieces.',
          'Toss with lettuce.',
          'Cover with plastic wrap or foil.',
          'Refrigerate until ready to serve.',
          'Dress before serving, not in advance.',
        ],
      },
    ],
  },
  { label: 'spanish rice',
    type: 'side',
    img: 'spanish-rice.jpg',
    slug: 'spanish-rice',
    serves: 24,
    ingredients: [
      { label: null,
        list: [
          { label: 'Long Grain Brown Rice', amt: 6, uom: 'cup' },
          { label: 'Red Salsa', amt: 3, uom: 'cup' },
          { label: 'Water', amt: 9, uom: 'cup' },
          { label: 'Dried Oregano', amt: 1, uom: 'Tbs' },
          { label: 'Paprika', amt: 1, uom: 'Tbs' },
          { label: 'Salt', amt: 1, uom: 'tsp' },
        ],
      },
    ],
    steps: [
      { label: null,
        list: [
          'Preheat oven to 375F.',
          'Bring water to a simmer in a pot.',
          'Pour all dry ingredients into a large hotel pan and mix together.',
          'Add salsa, and simmering water. Stir carefully.',
          'Cover pans securely with foil. You also may want to set pans on a large sheet pan in case of any leakage or overflow.',
          'Bake at 375 degrees F. for 1-2 hours, until liquid is absorbed and rice is tender. Allow to sit covered for 30 minutes before serving for best texture.',
          'Gently stir and fluff each pan of rice to mix ingredients before serving.',
        ],
      },
    ],
  },
  { label: 'enchilada casserole',
    type: 'entree',
    img: 'spanish-rice.jpg',
    slug: 'enchilada-casserole',
    serves: 20,
    ingredients: [
      { label: 'shredded chicken',
        list: [
          // 3-4 pounds
          { label: 'Boneless Chicken Breasts', amt: 4, uom: 'lb' },
          { label: 'Salt', amt: 2, uom: 'tsp' },
          { label: 'Ground Pepper', amt: 2, uom: 'tsp' },
          { label: 'Garlic Powder', amt: 2, uom: 'tsp' },
          { label: 'Water', amt: 2, uom: 'cup' },
          { label: 'Dried Oregano', amt: 1, uom: 'tsp' },
          { label: 'Onion Powder', amt: 1, uom: 'tsp' },
        ],
      },
      { label: 'casserole',
        list: [
          // 2 -(28 ounce) Cans
          { label: 'Red Enchilada Sauce', amt: 48, uom: 'oz' },
          { label: 'Corn Tortillas', amt: 30, uom: null },
          // 4-(15 ounce) Cans
          { label: 'Black Beans, drain, rinse', amt: 60, uom: 'oz' },
          // 2-(15 ounce) Cans
          { label: 'Corn, drain, rinse, or defrost', amt: 30, uom: 'oz' },
          // 12 (2 Bunches)
          { label: 'Green Onions (Whites and Greens)', amt: 12, uom: null },
          // 8 Cups, (3 pounds), 6-10 Breasts -- This is confusing since it's less than the above recipe
          { label: 'Shredded Cooked Chicken', amt: 3, uom: 'lb' },
          { label: 'Shredded Mexican Blend Cheese', amt: 6, uom: 'cup' },
        ],
      },
    ],
    steps: [
      { label: 'chicken instuctions',
        list: [
          'Place all ingredients in a crock pot.  Cook on high for 3-4 hours or low 5-6 hours.',
          'Chicken should stred easily with a fork when finished.  Layer into cassserole immedietely.',
        ],
      },
      { label: 'casserole instructions',
        list: [
          'Prepare shredded chicken.',
          'Heat oven to 375 degrees F.  Spray a large hotel pan with cooking spray.',
          'Layer ingredients in pan as listed below.',
          'Cover the pan with foil.',
          'Bake casserole covered for 40-50 minutes.',
          'Remove the pan from the oven,  and remove foil.  Sprinkle the top with about 1 1/2 cups shredded cheese.  Bake uncovered for about 10 minutes until the cheese is melted.',
          'Sprinkle the top with chopped cilantro and remaining green onions.  (Optional)',
          'To prepare this gluten free, purchase gluten free certified corn tortillas and enchilada sauce.',
        ],
      },
      { label: 'layering (beggining at bottom)',
        list: [
          // Why are there measurements here!?
          'End with a 4th layer of tortillas and remaining enchilada sauce.',
          'Repeat this layering 2 more times.',
          '1 1/2 Cups Shredded Cheese',
          '2 Heaping Cups of Chicken',
          '1/4 of Green Onions',
          '1 Cup Corn',
          '2 Cups Black Beans',
          '8 Tortillas',
          '1 1/2 Cups Enchilada Sauce',
        ],
      },
    ],
  },
  { label: 'fish', type: 'entree', img: 'entree.jpg' },
  { label: 'pasta', type: 'entree', img: 'entree.jpg' },
  { label: 'soup', type: 'entree', img: 'entree.jpg' },
  { label: 'carrots', type: 'side', img: 'side-dish.jpg' },
  { label: 'corn', type: 'side', img: 'side-dish.jpg' },
  { label: 'pudding', type: 'dessert', img: 'dessert.jpg' },
  { label: 'cake', type: 'dessert', img: 'dessert.jpg' },
];

export default recipesSample;
