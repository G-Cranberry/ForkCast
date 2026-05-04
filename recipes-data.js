// ==========================================
// FORKCAST - SHARED DATA (recipes-data.js)
// ==========================================

const RECIPES_DB = {
  // ---- ONION RECIPES ----
  onion: [
    { id:'on1', title:'French Onion Soup', category:'lunch', time:'45m', diet:'general', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=600', desc:'A rich, deep-flavoured classic French onion soup topped with melted cheese.', ingredients:['4 onions','2 tbsp butter','1L beef broth','Gruyère cheese','Baguette slices'], steps:['Caramelise onions in butter for 30 mins.','Add broth, simmer 10 mins.','Ladle into bowls, top with bread & cheese.','Broil until cheese is golden.'] },
    { id:'on2', title:'Onion Bhaji', category:'breakfast', time:'20m', diet:'vegan', img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600', desc:'Crispy spiced onion fritters from Indian street food tradition.', ingredients:['2 onions sliced','1 cup chickpea flour','1 tsp cumin','Chilli powder','Oil for frying'], steps:['Mix onions with flour and spices.','Add water to form thick batter.','Deep fry in batches until golden.','Drain and serve with chutney.'] },
    { id:'on3', title:'Caramelised Onion Tart', category:'dinner', time:'60m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600', desc:'A buttery pastry shell filled with sweet slow-cooked caramelised onions.', ingredients:['Puff pastry','4 onions','50g butter','100ml cream','2 eggs'], steps:['Blind bake pastry shell.','Caramelise onions 40 mins.','Mix with cream and eggs.','Fill shell, bake 25 mins.'] },
    { id:'on4', title:'Onion Salad (Laccha Pyaz)', category:'lunch', time:'10m', diet:'vegan', img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600', desc:'Tangy refreshing Indian onion salad with lemon and chaat masala.', ingredients:['2 red onions','Lemon juice','Chaat masala','Salt','Fresh coriander'], steps:['Slice onions thinly into rings.','Soak in cold water 10 mins.','Drain and mix with lemon, masala, salt.','Garnish with coriander.'] },
    { id:'on5', title:'Onion Pakora', category:'breakfast', time:'15m', diet:'vegan', img:'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600', desc:'Golden, crispy onion fritters perfect for monsoon season with chai.', ingredients:['3 onions','Gram flour','Green chillies','Ginger','Ajwain'], steps:['Mix sliced onions with flour and spices.','Let batter rest 5 mins.','Fry on medium heat until crispy.','Serve hot.'] },
    { id:'on6', title:'Onion Rice (Vengaya Sadam)', category:'lunch', time:'25m', diet:'vegan', img:'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600', desc:'South Indian style fragrant onion rice tempered with mustard and curry leaves.', ingredients:['2 cups rice','3 onions','Mustard seeds','Curry leaves','Turmeric'], steps:['Cook rice and set aside.','Temper mustard seeds in oil.','Add onions and fry till golden.','Mix in rice with spices.'] },
  ],

  // ---- PANEER RECIPES ----
  paneer: [
    { id:'pn1', title:'Palak Paneer', category:'dinner', time:'35m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600', desc:'Creamy smooth spinach curry with succulent paneer cubes.', ingredients:['300g paneer','500g spinach','2 onions','Garlic','Cream'], steps:['Blanch and puree spinach.','Sauté onion-garlic masala.','Add spinach puree, simmer.','Add paneer cubes, finish with cream.'] },
    { id:'pn2', title:'Paneer Butter Masala', category:'dinner', time:'40m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600', desc:'Rich tomato-based curry with soft paneer in a buttery gravy.', ingredients:['300g paneer','4 tomatoes','2 onions','Butter','Cream'], steps:['Make tomato onion puree.','Cook in butter with spices.','Add paneer, simmer 10 mins.','Finish with cream.'] },
    { id:'pn3', title:'Paneer Tikka', category:'lunch', time:'25m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600', desc:'Smoky grilled paneer tikka marinated in yoghurt and spices.', ingredients:['400g paneer','Yoghurt','Tandoori masala','Bell peppers','Lemon'], steps:['Marinate paneer in spiced yoghurt 1hr.','Thread on skewers with peppers.','Grill or broil 15 mins.','Serve with mint chutney.'] },
    { id:'pn4', title:'Kadai Paneer', category:'dinner', time:'35m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600', desc:'Bold kadai spiced paneer cooked with onion and capsicum.', ingredients:['300g paneer','Capsicum','Onion','Tomatoes','Kadai masala'], steps:['Roast and grind whole spices.','Cook onion-tomato masala.','Add capsicum and paneer.','Toss with fresh kadai masala.'] },
    { id:'pn5', title:'Shahi Paneer', category:'dinner', time:'45m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1645177628172-a94c1f96diag?w=600&q=80', desc:'Royal Mughlai-style paneer in a rich cashew-cream gravy.', ingredients:['300g paneer','Cashews','Cream','Cardamom','Saffron'], steps:['Soak cashews, blend to paste.','Make onion-cashew gravy.','Add cream and paneer.','Garnish with saffron milk.'] },
  ],

  // ---- POTATO RECIPES ----
  potato: [
    { id:'pt1', title:'Aloo Gobi', category:'lunch', time:'25m', diet:'vegan', img:'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=600', desc:'Classic dry Indian sabzi of potatoes and cauliflower with aromatic spices.', ingredients:['3 potatoes','1 cauliflower','Cumin','Turmeric','Dry mango powder'], steps:['Parboil potato and cauliflower.','Temper cumin in oil.','Add vegetables and all spices.','Cook dry on medium heat.'] },
    { id:'pt2', title:'Aloo Paratha', category:'breakfast', time:'30m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600', desc:'Whole wheat flatbread stuffed with spiced mashed potato filling.', ingredients:['Wheat flour','4 potatoes','Green chillies','Coriander','Ghee'], steps:['Mash boiled potatoes with spices.','Stuff into wheat dough ball.','Roll flat and cook on tawa.','Serve with butter and pickle.'] },
    { id:'pt3', title:'French Fries', category:'lunch', time:'20m', diet:'vegan', img:'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600', desc:'Golden crispy double-fried fries seasoned with sea salt.', ingredients:['4 large potatoes','Oil for frying','Sea salt','Paprika'], steps:['Cut potatoes into matchsticks.','Soak in cold water 30 mins.','First fry at 150°C for 5 mins.','Second fry at 190°C until golden.'] },
    { id:'pt4', title:'Mashed Potatoes', category:'dinner', time:'15m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1589730004886-d6c56e3bec4c?w=600', desc:'Creamy buttery mashed potatoes - the ultimate comfort side dish.', ingredients:['5 potatoes','Butter','Cream','Salt','Chives'], steps:['Boil potatoes until tender.','Drain and mash while hot.','Beat in warm butter and cream.','Season and garnish with chives.'] },
    { id:'pt5', title:'Potato Salad', category:'lunch', time:'10m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&sig=salad', desc:'A creamy, herby potato salad perfect for picnics and lunches.', ingredients:['6 potatoes','Mayonnaise','Mustard','Celery','Dill'], steps:['Boil and cube potatoes.','Cool completely.','Mix with mayo, mustard, celery.','Fold in dill and season.'] },
    { id:'pt6', title:'Aloo Sabzi', category:'dinner', time:'20m', diet:'vegan', img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600', desc:'Simple and comforting North Indian potato curry spiced with cumin.', ingredients:['3 potatoes','1 onion','2 tomatoes','Cumin','Turmeric','Coriander powder'], steps:['Heat oil and add cumin seeds.','Sauté onions until translucent.','Add tomatoes and spices, cook until soft.','Add cubed potatoes and water, simmer until tender.'] },
  ],

  // ---- TOMATO RECIPES ----
  tomato: [
    { id:'tm1', title:'Tomato Soup', category:'lunch', time:'20m', diet:'vegan', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&sig=tomato', desc:'Silky smooth roasted tomato soup with fresh basil.', ingredients:['6 tomatoes','Onion','Garlic','Basil','Cream'], steps:['Roast tomatoes and garlic.','Blend with broth.','Strain for smooth texture.','Finish with cream and basil.'] },
    { id:'tm2', title:'Tomato Bruschetta', category:'breakfast', time:'10m', diet:'vegan', img:'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600', desc:'Crispy bread topped with fresh tomato, garlic and basil.', ingredients:['Baguette','4 tomatoes','Garlic cloves','Fresh basil','Olive oil'], steps:['Toast bread slices.','Mix diced tomatoes with basil.','Rub bread with garlic.','Top with tomato mixture.'] },
    { id:'tm3', title:'Shakshuka', category:'breakfast', time:'25m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600', desc:'Eggs poached in a spiced tomato and pepper sauce.', ingredients:['6 tomatoes','4 eggs','Bell pepper','Cumin','Feta'], steps:['Make spiced tomato sauce.','Make wells in sauce.','Crack eggs into wells.','Cover and cook 8 mins.'] },
    { id:'tm4', title:'Tomato Rice', category:'lunch', time:'20m', diet:'vegan', img:'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&sig=trice', desc:'South Indian tangy tomato rice packed with flavour.', ingredients:['2 cups rice','5 tomatoes','Mustard seeds','Chillies','Curry leaves'], steps:['Cook rice separately.','Prepare tomato masala.','Mix with rice.','Temper with mustard seeds.'] },
  ],

  // ---- SPINACH RECIPES ----
  spinach: [
    { id:'sp1', title:'Spinach Smoothie', category:'breakfast', time:'5m', diet:'vegan', img:'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600', desc:'Energising green smoothie with spinach, banana and mango.', ingredients:['2 cups spinach','1 banana','1 cup mango','Almond milk','Chia seeds'], steps:['Add all ingredients to blender.','Blend until smooth.','Taste and adjust sweetness.','Serve immediately.'] },
    { id:'sp2', title:'Spinach Pasta', category:'dinner', time:'25m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=600', desc:'Creamy garlic spinach pasta that comes together in minutes.', ingredients:['Pasta','2 cups spinach','Garlic','Cream','Parmesan'], steps:['Cook pasta al dente.','Sauté garlic in olive oil.','Wilt spinach, add cream.','Toss pasta in sauce.'] },
    { id:'sp3', title:'Saag Aloo', category:'dinner', time:'30m', diet:'vegan', img:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&sig=saag', desc:'Hearty Indian potato and spinach curry with warming spices.', ingredients:['300g spinach','4 potatoes','Onion','Ginger-garlic','Garam masala'], steps:['Blanch and chop spinach.','Boil and cube potatoes.','Make onion-masala base.','Combine and simmer.'] },
  ],

  // ---- CHICKEN RECIPES ----
  chicken: [
    { id:'ch1', title:'Butter Chicken', category:'dinner', time:'50m', diet:'non-veg', img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600', desc:'The iconic creamy tomato butter chicken loved worldwide.', ingredients:['500g chicken','Butter','Cream','Tomatoes','Spices'], steps:['Marinate and grill chicken.','Make tomato-cream sauce.','Simmer chicken in sauce.','Finish with butter.'] },
    { id:'ch2', title:'Chicken Salad', category:'lunch', time:'15m', diet:'non-veg', img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', desc:'Light grilled chicken salad with avocado and lemon dressing.', ingredients:['Chicken breast','Mixed greens','Avocado','Cherry tomatoes','Lemon'], steps:['Grill seasoned chicken breast.','Slice when cooled.','Assemble salad with greens.','Drizzle with lemon dressing.'] },
    { id:'ch3', title:'Chicken Biryani', category:'dinner', time:'75m', diet:'non-veg', img:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600', desc:'Aromatic layered biryani with fragrant basmati rice and tender chicken.', ingredients:['500g chicken','Basmati rice','Fried onions','Saffron','Whole spices'], steps:['Cook chicken with spices.','Parboil rice.','Layer rice and chicken.','Dum cook 25 mins.'] },
  ],

  // ---- APPLE RECIPES ----
  apple: [
    { id:'ap1', title:'Apple Pie', category:'dinner', time:'60m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600', desc:'Classic golden-crusted apple pie with cinnamon filling.', ingredients:['6 apples','Pastry dough','Sugar','Cinnamon','Butter'], steps:['Make pastry dough.','Fill with spiced apples.','Top with pastry lid.','Bake 45 mins at 190°C.'] },
    { id:'ap2', title:'Apple Cinnamon Oatmeal', category:'breakfast', time:'10m', diet:'vegan', img:'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=600', desc:'Warm creamy oats topped with caramelised cinnamon apples.', ingredients:['1 cup oats','2 apples','Almond milk','Cinnamon','Maple syrup'], steps:['Cook oats in almond milk.','Sauté diced apple with cinnamon.','Top oats with apple.','Drizzle maple syrup.'] },
    { id:'ap3', title:'Apple Walnut Salad', category:'lunch', time:'10m', diet:'vegan', img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&sig=apple', desc:'Crisp apple with walnuts and greens in a honey vinaigrette.', ingredients:['2 apples','Walnuts','Baby spinach','Feta','Honey vinaigrette'], steps:['Slice apple thinly.','Toast walnuts lightly.','Assemble salad.','Dress with honey vinaigrette.'] },
  ],

  // ---- EGG RECIPES ----
  egg: [
    { id:'eg1', title:'Masala Omelette', category:'breakfast', time:'10m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600', desc:'Spicy Indian-style omelette with onion, chilli and coriander.', ingredients:['3 eggs','Onion','Green chilli','Tomato','Coriander'], steps:['Beat eggs with spices.','Sauté veggies in pan.','Pour egg mixture over.','Cook both sides until done.'] },
    { id:'eg2', title:'Egg Fried Rice', category:'lunch', time:'15m', diet:'vegetarian', img:'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600', desc:'Quick takeaway-style egg fried rice with veggies and soy sauce.', ingredients:['2 cups rice','4 eggs','Soy sauce','Spring onions','Garlic'], steps:['Cook and chill rice.','Scramble eggs.','Fry garlic in wok.','Add rice, eggs, soy sauce.'] },
  ],

  // ---- FRUIT RECIPES ----
  fruit: [
    { id:'fr1', title:'Fruit Chaat', category:'breakfast', time:'10m', diet:'vegan', img:'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=600', desc:'A vibrant, tangy Indian fruit salad with chaat masala.', ingredients:['Mixed fruits (apple, banana, pomegranate)','Lemon juice','Chaat masala','Black salt'], steps:['Chop all fruits into bite-sized pieces.','Add lemon juice and chaat masala.','Toss well and serve chilled.'] },
    { id:'fr2', title:'Healthy Smoothie', category:'breakfast', time:'5m', diet:'vegan', img:'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=600', desc:'A thick and creamy blended fruit smoothie.', ingredients:['1 banana','1/2 cup berries','1 cup almond milk','1 tbsp honey or maple syrup'], steps:['Combine all ingredients in a blender.','Blend on high until smooth.','Pour into a glass and enjoy.'] },
  ]
};

// Flatten all for "All Recipes" view
const ALL_RECIPES = Object.values(RECIPES_DB).flat();

// Utility: find recipes by ingredient keyword
function searchRecipes(query) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  // Exact key match
  for (let key of Object.keys(RECIPES_DB)) {
    if (q.includes(key) || key.includes(q)) {
      return RECIPES_DB[key];
    }
  }
  // Fallback: search titles
  return ALL_RECIPES.filter(r => r.title.toLowerCase().includes(q) || r.ingredients.some(i => i.toLowerCase().includes(q)));
}
