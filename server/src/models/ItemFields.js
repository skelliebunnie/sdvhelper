export const ITEM_FIELDS = [
	"name",
	"description",
	"category",
	// "source",
	"recipeSource",
	"ingredients",
	"equipment",
	"sellable",
	"sellPrice",
	"edible",
	"locations",
	"weather",
	"time",
	"difficulty",
	"behavior",
	"size",
	// "initialGrowthTime",
	// "reproductionTime",
	"baseHealth",
	"baseEnergy",
	"dyepotColor",
	"sewingColor",
	"qiColorQuest",
	"universal",
	"addedBy"
];

export const getItemFields = (body) =>
  Object.fromEntries(
    ITEM_FIELDS.filter((key) => key in body).map((key) => [key, body[key]])
  );