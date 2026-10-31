# GENERAL
This is mostly about how the collections are organized and notes on what certain fields are for.

Right now I need to decide just how much information I want to store/manage. I'm not trying to replicate the wiki, I'm trying to address certain "pain points" that I personally have when playing. For example "what fish are available today at what times in which locations" - I'd like to see a "day planner" style layout of that info so I can plan a fishing day. I also want to see the "minimimum viable list of loved gifts for all npcs" for that one "give 50 gifts in a week" Qi quest so I don't have to scramble for loved gifts. I want to be able to show only Vanilla information, or include information from various mods I like playing with (like Expanded, add more fish, etc.).

Personally I don't care so much about how long it takes to process wine or jelly or whatever, I don't optimize like that. I'm just a scatter-brained med-less ADHDer trying to make my fishing trips and gifting sprees a little easier for my disorganized brain bunnies.

# COLLECTIONS
The data~! And how it's all connected.

## #1. Items - DONE (with the possibility of needing edits later :D )
- name
- category -> Category
- description
- source (where does the player get it? recipe? crop/farming? etc.)
- recipeSource ([], some recipes come from multiple sources, like QoS or you can buy it at the saloon)
- ingredients [] -> Item
- equipment (what do you use to make this, if anything? cheese press?)
- sellPrice (*BASE PRICE ONLY*, other values will be calculated using MATH)
- edible (boolean, can the player eat it)
- locations [{ season: "", location: Location }] -> Location
  - **DONE** ~~TODO: update location handling (if season is blank, default to "Any")~~
- weather ((array of allowed values is available client-side))
- time [{ season: "", intervals: [{open: Number, close: Number}]}]
  - for the intervals above, this allows for multiple intervals per day
  - the expected values for open/close is 24 hour time e.g. 0900/900, 1800, etc.
- difficulty
- behavior ((array of allowed values available client-side))
- size ((this is a string, but it should be e.g. "12-14"; assumption is inches))
- ~~initialGrowthTime~~ ((this applies to how long it takes a crop to reach maturity - animals are not items!))
- ~~reproductionTime~~ ((this is for crops that keep producing after the initial growth period, like cranberries, eggplants, hot peppers, etc.))
- ~~processingTime~~
- color ((this is the color the item will produce when used in the sewing machine))
- qiColorQuest ((this is a *boolean* that just indicates if the item can be used for this specific quest, since not all items can be; the actual color is whatever color it produces in the sewing machine))
- addedBy ((this is specifically for filtering, there's a list of allowed values client-side, the default is "Vanilla" - the base game - with additional options being various mods))

### to add - DONE
- universal\* ((store it as a number, 0-5: 0 = not, 1 = loved, 2 = liked, 3 = neutral, 4 = disliked, 5 = hated))
- baseEnergy: how much Stamina is restored on consumption
- baseHealth: how much health is restored on consumption

Note that for Artisan Goods made with the Preserves Jar or the Keg, specifically Pickes, Jelly, Juice, and Wine - the baseEnergy and baseHealth are *calculated from the baseEnergy and baseHealth of the ORIGINAL ingredient*. Anything that's not considered edible is 0.625 \* sellPrice (ST) and 0.28125 \* sellPrice (HP). These 2 fields should be left empty or set to 0 for inedible items, or Artisan Goods that use these calculations. I'll be using math for these fields based on the category and edibility anyway.

### REMOVED
- processing time: this is actually more specific to *equipment* like the cheese press, keg, preserves jar, etc. with variations for certain items/categories
- initialGrowthTime & reproductionTime: removed (commented out) because I don't actually care about min/max planning my crops. Just commented them out for now because I would consider re-adding them if enough people wanted to see that data for their own planning. Could display planting/harvesting times in a "calendar" layout or something.
- Source: realized this was all over the place (do I care if you can get it from a Mystery box? not really) *and* could be a bit complicated (e.g. many fertilizers can only be purchased from Pierre's starting in Y2, and they can all be produced by the Bone Mill - but that's random). Basically there are too many options across all items, and it doesn't really matter to me. I care about gifting, which like ... if I have the item, great, if not, I probably don't want to go out of my way to make/buy that specific item!
  - note that I am keeping "recipe source" but restricting the sources to just "mail", "queen of sauce", etc. instead of detailed "queen of sauce, fall X, year 2" or whatever to keep things simple. That way if I really want say "pina colada" I know I have to ambush Gus at the island resort.

## #2. Category - DONE
- name
- associatedItems [] -> Item
- addedBy

## #3. Location - DONE
- name
- addedBy

## #4. NPC
Note that Items will now be marked for "universal loved/liked/neutral/disliked/hated" (e.g. "Prismatic Shard" is a Universal Love), so only *overrides* should be added to the arrays here. For example, Haley *hates* Prismatic Shard despite it being a "Universal Loved gift", so it would be added to "hatedGifts". Client-side, we'll want to think about getting lists of "Universal *" gifts and then putting "All Universal Loves (except x,y,z)" using the npc-specific lists for exclusions (see how the wiki does this for clarification).

- name
- gender
- birthday { season: "", day: Number }
- address
- family [] -> NPC
- marriage (boolean)
- clinicVisit { season: "", day: Number }
- lovedGifts [] -> Item
- likedGifts [] -> Item
- neuntralGifts [] -> Item
- dislikedGifts [] -> Item
- hatedGifts [] -> Item

## #5. Equipment
- ingredients [] -> Items
- recipeSource
- recipeCost

### to *consider*
**Processing Time:** this is easy for something like the cheese press, but the Keg is crazy - there are 6 items that have their own specific processing times, and then all veggies or "positive energy Forage other than mushrooms" can become "juice" (e.g. parsnip juice, leek juice) while any fruit can be made into wine (e.g. melon wine, hot chili wine) and both those have their own processing times. Right now I have "vegetable" and "fruit" as categories, but just "forage" (and "flower") - I wasn't separating out mushrooms, and of course I *definitely* don't have a separate "positive energy-only forage" category! So the means of recording this data is going to be complicated.