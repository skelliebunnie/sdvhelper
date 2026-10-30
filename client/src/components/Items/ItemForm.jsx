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
  saving
}) => {
  // const formKeys = [
  //   "name",
  //   "description",
  //   "type",
  //   "source",
  //   "recipeSource",
  //   "ingredients",
  //   "sellPrice",
  //   "edible",
  //   "difficulty",
  //   "behavior",
  //   "size",
  //   "initialGrowthTime",
  //   "reproductionTime",
  //   "processingTime",
  //   "color",
  //   "qiColorQuest",
  //   "addedBy",
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
    console.log(formData.locations)
    let locationsList = formData.locations;
    if(e.currentTarget.checked) {
      locationsList.push(e.target.value);
    } else {
      locationsList = formData.locations.filter((location) => location !== e.target.value);
    }
    
    setFormData({...formData, locations: locationsList});
  }
  
  const handleCategoryChange = (cat) => {
    setFormData({...formData, category: cat});
    
    // DEBATING: should fish-only data be cleared if the category is not "Fish"?
    // for now, no - the category could be changed accidentally, and we'll
    // check for the category on the detail page/card anyway
    // if(cat !== "6adcdb79d09453e0e80eaae8") {
    //   setFormData({...formData, behavior: "", size: 0, difficulty: 0, time: null});
    // }
  }

  return (
    <>
      <Link to="/items" className="icon-link"><ChevronsLeftIcon /> See All Items</Link>
      <hr />
      <small>(*) required</small>
      <form>
        {/* NAME + TYPE */}
          <fieldset>
            <legend className="required">* Name</legend>
            <div className="input-wrapper">
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

          <fieldset className="col">
            <legend className="required">* Category</legend>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <label key={category.name} htmlFor={category.name} className="radio-check">
                  <input
                    type="radio"
                    value={category._id}
                    checked={ formData.category === category._id }
                    onChange={(e) =>
                      handleCategoryChange(e.target.value)
                    }
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
        {/* end name + category section */}

        <fieldset>
          <legend>Description</legend>
          <div className="input-wrapper">
          <textarea
            name="description"
            id="description"
            rows={3}
            placeholder="What a magnificant beast."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          >
          </textarea>
          </div>
        </fieldset>

        <fieldset className="col">
          <legend>Location</legend>
          {locations && locations.length > 0 ? (
            locations.map((location) => (
              <label key={location.name} htmlFor={location.name} className="radio-check">
                <input
                  type="checkbox"
                  value={location._id}
                  checked={formData.locations && formData.locations.length > 0 ? 
                    formData.locations.includes(location._id)
                    : false
                  }
                  onChange={(e) =>
                    handleLocationUpdate(e)
                  }
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
        
        {/* Fish Stuff */}
        <fieldset className={formData.category === "6adcdb79d09453e0e80eaae8" ? "" : "hidden"}>
          <legend>Fishes</legend>
          {defaultData.fishBehavior && defaultData.fishBehavior.length > 0 ? (
            defaultData.fishBehavior.map((behavior) => (
              <label key={behavior} htmlFor={behavior} className="radio-check">
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
            <p>No Fish Behavior types available (defaulting to Mixed)</p>
          )}
        </fieldset>

        {/* ADDITIONAL INFO */}
        <fieldset>
          <legend>Other</legend>
          <div className="vertical">
            <label htmlFor="edible" className="radio-check">
              <input
                type="checkbox"
                checked={formData.edible}
                onChange={(e) =>
                  setFormData({ ...formData, edible: e.target.checked })
                }
              />
              Edible?
            </label>
            <label htmlFor="qiQuest" className="radio-check">
              <input
                type="checkbox"
                checked={formData.qiColorQuest}
                onChange={(e) =>
                  setFormData({ ...formData, qiColorQuest: e.target.checked })
                }
              />
              Can it be used for the Qi Color Quest?
            </label>
          </div>
        </fieldset>

        {/* ADDED BY (MOD) */}
        <fieldset className="col">
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
        <div>
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
