import { useState, useEffect } from "react";
import { Link } from "react-router";

import toast from "react-hot-toast";
import api from "../../lib/axios";
import { SearchAlert, ChevronsLeftIcon } from "lucide-react-motion";

import "../../styles/form.css";

const ItemForm = ({
  setFormData,
  formData,
  handleSubmit,
  defaultData,
  saving,
}) => {
  // const formKeys = [
  // "name",
  // "description",
  // "category",
  // "source", // removed because I don't care about specifics
  // "recipeSource",
  // "ingredients",
  // "equipment",
  // "sellable",
  // "sellPrice",
  // "edible",
  // "locations",
  // FISH ONLY
  // "weather",
  // "time",
  // "difficulty",
  // "behavior",
  // "size",
  // /FISH ONLY
  // "initialGrowthTime", // removed for now
  // "reproductionTime", // removed for now
  // "baseHealth",
  // "baseEnergy",
  // "dyepotColor",
  // "sewingColor",
  // "qiColorQuest",
  // "universal",
  // "addedBy"
  // ];

  const [categories, setCategories] = useState();
  const [locations, setLocations] = useState();
  const [categoriesFound, setCategoriesFound] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
        setCategoriesFound(true);
      } catch (error) {
        console.error("Error fetching categories", error);
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();

    const fetchLocations = async () => {
      try {
        const res = await api.get("/locations");
        setLocations(res.data);
      } catch (error) {
        console.error("Error fetching categories", error);
        toast.error("Failed to load categories");
      } finally {
        setLoadingLocations(false);
      }
    };
    fetchLocations();
  }, [formData]);

  const handleLocationUpdate = (e) => {
    let locationsList = formData.locations;
    if (e.currentTarget.checked) {
      locationsList.push(e.target.value);
    } else {
      locationsList = formData.locations.filter(
        (location) => location !== e.target.value,
      );
    }

    setFormData({ ...formData, locations: locationsList });
  };

  const handleCategoryChange = (cat) => {
    setFormData({ ...formData, category: cat });

    // DEBATING: should fish-only data be cleared if the category is not "Fish"?
    // for now, no - the category could be changed accidentally, and we'll
    // check for the category on the detail page/card anyway
    // if(cat !== "6adcdb79d09453e0e80eaae8") {
    //   setFormData({...formData, behavior: "", size: 0, difficulty: 0, time: null});
    // }
  };

  return (
    <>
      <Link to="/items" className="icon-link">
        <ChevronsLeftIcon /> See All Items
      </Link>
      <hr />
      <small>(*) required</small>
      <form>
        <div className="main">
          <div className="field-wrapper">
            <fieldset>
              <legend className="required">* Name</legend>
              <div className="input-wrapper full-width">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  placeholder="Majestic Frog"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </fieldset>

            <fieldset>
              <legend>Description</legend>
              <div className="input-wrapper full-width">
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  placeholder="What a magnificant beast."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>
            </fieldset>

            <fieldset>
              <legend>Universal (*) Gift</legend>
              <p>
                <small>
                  Whether or not this item is a universal gift, and what kind -
                  loved, liked, neutral, disliked, hated.
                </small>
              </p>
              <div className="field-wrapper flex">
                {defaultData.universal && defaultData.universal.length > 0 ? (
                  defaultData.universal.map((type, i) => (
                    <label key={type} htmlFor={type} className="radio-check">
                      <input
                        type="radio"
                        name={type}
                        value={i}
                        checked={formData.universal === i}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            universal: Number(e.target.value),
                          })
                        }
                      />
                      {type}
                    </label>
                  ))
                ) : (
                  <p>No Dyepot Colors available</p>
                )}
              </div>
            </fieldset>

            <fieldset className="vertical">
              <legend>Sell Price (base)</legend>
              <p>
                <small>
                  This is the <em>base</em> sell price of the item. Quality
                  value changes will be done via math and applied automatically.
                </small>
              </p>
              <label htmlFor="sellable" className="input-wrapper">
                <input
                  type="checkbox"
                  name="sellable"
                  value={formData.sellable}
                  onChange={(e) =>
                    setFormData({ ...formData, sellable: e.target.checked })
                  }
                />
                Can this item be sold?
              </label>
              <label
                htmlFor="salePrice"
                className={formData.sellable ? "input-wrapper title-case" : "hidden"}
              >
                base price:
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={(e) =>
                    setFormData({ ...formData, salePrice: e.target.value })
                  }
                />
              </label>
            </fieldset>
          </div>

          <div className="field-wrapper">
            <fieldset className="col">
              <legend className="required">* Category</legend>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <label
                    key={category.name}
                    htmlFor={category.name}
                    className="radio-check"
                  >
                    <input
                      type="radio"
                      value={category._id}
                      checked={formData.category === category._id}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    />
                    {category.name}
                  </label>
                ))
              ) : loadingCategories ? (
                <p>
                  <SearchAlert /> Loading Categories, please wait ...{" "}
                </p>
              ) : (
                <p>
                  No categories available - please{" "}
                  <Link to="/category/create">create a category</Link> before
                  continuing!
                </p>
              )}
            </fieldset>
            <fieldset className="col">
              <legend>Location</legend>
              {locations && locations.length > 0 ? (
                locations.map((location) => (
                  <label
                    key={location.name}
                    htmlFor={location.name}
                    className="radio-check"
                  >
                    <input
                      type="checkbox"
                      value={location._id}
                      checked={
                        formData.locations && formData.locations.length > 0
                          ? formData.locations.includes(location._id)
                          : false
                      }
                      onChange={(e) => handleLocationUpdate(e)}
                    />
                    {location.name}
                  </label>
                ))
              ) : loadingLocations ? (
                <p>
                  <SearchAlert /> Loading Locations, please wait ...{" "}
                </p>
              ) : (
                <p>
                  No locations available - you can{" "}
                  <Link to="/location/create">create a location here</Link> (not
                  required to create item)
                </p>
              )}
            </fieldset>
          </div>
          <div className="field-wrapper">
            <fieldset className="vertical">
              <legend>HP / Energy Regen</legend>
              <p>
                <small>
                  This is the amount of health and energy restored by a
                  no-quality version of the item. An item <strong>must</strong>{" "}
                  be marked "edible" to set these values.
                </small>
              </p>
              <label htmlFor="edible" className="radio-check">
                <input
                  type="checkbox"
                  name="edible"
                  checked={formData.edible}
                  onChange={(e) =>
                    setFormData({ ...formData, edible: e.target.checked })
                  }
                />
                Edible?
              </label>
              {formData.edible && (
                <div className="vertical">
                  <hr/>
                  <label htmlFor="baseHealth" className="input-wrapper">
                    <img src="/assets/other_icons/Health_Icon.png" alt="Base Health Regeneration" title="Base Health Regeneration" />
                    <input
                      name="baseHealth"
                      type="number"
                      value={formData.baseHealth}
                      onChange={(e) =>
                        setFormData({ ...formData, baseHealth: e.target.value })
                      }
                    />
                  </label>
                  <label htmlFor="baseEnergy" className="input-wrapper">
                    <img src="/assets/other_icons/Energy_Icon.png" alt="Base Energy Regeneration" title="Base Energy Regeneration" />
                    <input
                      name="baseEnergy"
                      type="number"
                      value={formData.baseEnergy}
                      onChange={(e) =>
                        setFormData({ ...formData, baseEnergy: e.target.value })
                      }
                    />
                    
                  </label>
                </div>
              )}
            </fieldset>
          </div>

          {/* Fish Stuff */}
          <div
            className={
              formData.category === "6adcdb79d09453e0e80eaae8"
                ? "field-wrapper"
                : "field-wrapper hidden"
            }
          >
            <h2>Fish Info</h2>
            <fieldset>
              <legend>Size</legend>
              <p>
                <small>This is how long the fish can get, in inches.</small>
              </p>
              <label htmlFor="fish-size">
                <input
                  type="number"
                  placeholder="1-17"
                  value={formData.size}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                />
              </label>
            </fieldset>
            <fieldset>
              <legend>Weather</legend>
              {defaultData.weather && defaultData.weather.length > 0 ? (
                defaultData.weather.map((type) => (
                  <label key={type} htmlFor={type} className="radio-check">
                    <input
                      type="radio"
                      value={type}
                      checked={formData.weather === type}
                      onChange={(e) =>
                        setFormData({ ...formData, weather: e.target.value })
                      }
                    />
                    <p>
                      {type !== "Any" && (
                        <img
                          src={`/assets/weather_icons/${type}Animated.gif`}
                          alt={`Weather type ${type}`}
                          title={`Weather type ${type}`}
                        />
                      )}{" "}
                      {type}
                    </p>
                  </label>
                ))
              ) : (
                <p>No Fish Behavior types available</p>
              )}
            </fieldset>
            <fieldset>
              <legend>Behavior</legend>
              {defaultData.fishBehavior &&
              defaultData.fishBehavior.length > 0 ? (
                defaultData.fishBehavior.map((behavior) => (
                  <label
                    key={behavior}
                    htmlFor={behavior}
                    className="radio-check"
                  >
                    <input
                      type="radio"
                      value={behavior}
                      checked={formData.behavior === behavior}
                      onChange={(e) =>
                        setFormData({ ...formData, behavior: e.target.value })
                      }
                    />
                    {behavior}
                  </label>
                ))
              ) : (
                <p>No Fish Behavior types available</p>
              )}
            </fieldset>
            <fieldset>
              <legend>Difficulty</legend>
              <label htmlFor="fish-difficulty">
                <input
                  type="number"
                  placeholder={0}
                  value={formData.difficulty}
                  onChange={(e) =>
                    setFormData({ ...formData, difficulty: e.target.value })
                  }
                />
              </label>
            </fieldset>
          </div>

          {/* ADDITIONAL INFO */}
          
          <div className="field-wrapper">
          <fieldset className="col">
              <legend>Recipe Source</legend>
              {defaultData.recipeSources &&
              defaultData.recipeSources.length > 0 ? (
                defaultData.recipeSources.map((source) => (
                  <label
                    key={source}
                    htmlFor={source}
                    className="radio-check"
                  >
                    <input
                      type="radio"
                      value={source}
                      checked={formData.recipeSource === source}
                      onChange={(e) =>
                        setFormData({ ...formData, recipeSource: e.target.value })
                      }
                    />
                    {source}
                  </label>
                ))
              ) : (
                <p>No recipe sources available</p>
              )}
            </fieldset>
            <fieldset className="vertical">
              <legend>Color</legend>
              <label htmlFor="qiQuest" className="radio-check">
                <input
                  type="checkbox"
                  name="qiColorQuest"
                  checked={formData.qiColorQuest}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      qiColorQuest: e.target.checked,
                    })
                  }
                />
                Can it be used for the Qi Color Quest?
              </label>
              <h2>Dyepot Color</h2>
              <div className="flex">
                {defaultData.dyepotColors &&
                defaultData.dyepotColors.length > 0 ? (
                  defaultData.dyepotColors.map((color) => (
                    <label key={color} htmlFor={color} className="radio-check">
                      <input
                        type="radio"
                        name={color}
                        value={color}
                        checked={formData.color === color}
                        onChange={(e) =>
                          setFormData({ ...formData, color: e.target.value })
                        }
                      />
                      {color}
                    </label>
                  ))
                ) : (
                  <p>No Dyepot Colors available</p>
                )}
              </div>
              <h2>Sewing Machine Color</h2>
              <div className="col">
                {defaultData.sewingColors &&
                defaultData.sewingColors.length > 0 ? (
                  defaultData.sewingColors.map((color) => (
                    <label key={color} htmlFor={color} className="radio-check title-case">
                      <input
                        type="radio"
                        name={color}
                        value={color}
                        checked={formData.color === color}
                        onChange={(e) =>
                          setFormData({ ...formData, color: e.target.value })
                        }
                      />
                      {color}
                    </label>
                  ))
                ) : (
                  <p>No Dyepot Colors available</p>
                )}
              </div>
            </fieldset>
          </div>
        </div>{" "}
        {/* end of "main" */}
        
        <div className="field-wrapper">
            {/* ADDED BY (MOD) */}
            <fieldset>
              <legend className="required">* Added by</legend>
              {defaultData.addedByList && defaultData.addedByList.length > 0 ? (
                defaultData.addedByList.map((source) => (
                  <label key={source} htmlFor={source} className="radio-check">
                    <input
                      type="radio"
                      value={source}
                      checked={formData.addedBy === source}
                      onChange={(e) =>
                        setFormData({ ...formData, addedBy: e.target.value })
                      }
                    />
                    {source}
                  </label>
                ))
              ) : (
                <p>No sources available (defaulting to Vanilla)</p>
              )}
            </fieldset>
          </div>
          
        <div className="footer">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={saving || !categoriesFound}
          >
            Submit
          </button>
          {!categoriesFound && (
            <span>
              Please create at least one TYPE before creating any items.
            </span>
          )}
          {saving && <span>Saving, please wait ...</span>}
        </div>
      </form>
    </>
  );
};

export default ItemForm;
