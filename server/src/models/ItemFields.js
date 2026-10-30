export const ITEM_FIELDS = [
	"name",
	"description",
	"category",
	"source",
	"recipeSource",
	"ingredients",
	"equipment",
	"sellPrice",
	"edible",
	"locations",
	"weather",
	"times",
	"difficulty",
	"behavior",
	"size",
	"initialGrowthTime",
	"reproductionTime",
	"processingTime",
	"color",
	"qiColorQuest",
	"addedBy"
];

export const getItemFields = (body) =>
  Object.fromEntries(
    ITEM_FIELDS.filter((key) => key in body).map((key) => [key, body[key]])
  );