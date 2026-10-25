import { useState, useEffect } from "react"
import { Link } from "react-router"

import toast from "react-hot-toast"
import api from "../../lib/axios";
import { SearchAlert } from "lucide-react-motion";

const ItemForm = ({ setFormData, formData, handleSubmit, addedByList, saving }) => {
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
  
	const [types, setTypes] = useState();
	const [locations, setLocations] = useState();
  const [typesFound, setTypesFound] = useState(false);
  const [locationsFound, setLocationsFound] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);
	
	useEffect(() => {
		const fetchTypes = async () => {
			try {
				const res = await api.get("/itemtypes");
				setTypes(res.data);
        setTypesFound(true);
				
			} catch(error) {
				console.error("Error fetching types", error);
				toast.error("Failed to load types");

			} finally {
        setLoadingTypes(false);
      }
		}
		
		fetchTypes();
    
    const fetchLocations = async () => {
			try {
				const res = await api.get("/locations");
				setLocations(res.data);
        setLocationsFound(true);
				
			} catch(error) {
				console.error("Error fetching types", error);
				toast.error("Failed to load types");

			} finally {
        setLoadingLocations(false);
      }
		}
		
		fetchLocations();
	}, [formData]);

  return (
    <>
      <small>(*) required</small>
      <form>
        {/* NAME + TYPE */}
        <div className="input-group">
        <fieldset>
          <legend>* Name:</legend>
          <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
        </fieldset>
        
        <fieldset>
          <legend>* Type:</legend>
          {types && types.length > 0 ? (
            types.map(type => (
              <label key={type.name} htmlFor={type.name}>
                <input
                  type="radio"
                  value={type._id}
                  checked={(formData.type === type._id) || (formData.type === type.name)}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                />
                {type.name}
              </label>
            ))
          ) : loadingTypes ? (
            <p><SearchAlert /> Loading Types, please wait ... </p>
          ) : (
            <p>No types available - please <Link to="/itemtype/create">create a type</Link> before continuing!</p>
          )}
        </fieldset>
        </div>
        {/* end name + type section */}
        
        <fieldset>
          <legend>Description</legend>
          <textarea 
            name="description" 
            id="description" 
            rows={3} cols={50}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          >
            {formData.description}
          </textarea>
        </fieldset>
        
        <fieldset>
          <legend>Location:</legend>
          {locations && locations.length > 0 ? (
            locations.map(location => (
              <label key={location.name} htmlFor={location.name}>
                <input
                  type="checkbox"
                  value={location._id}
                  checked={(formData.location === location._id) || (formData.location === location.name)}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
                {location.name}
              </label>
            ))
          ) : loadingLocations ? (
            <p><SearchAlert /> Loading Locations, please wait ... </p>
          ) : (
            <p>No locations available - you can <Link to="/location/create">create a location here</Link> (not required to create item)</p>
          )}
        </fieldset>
        
        {/* ADDITIONAL INFO */}
        <fieldset>
          <legend>Other:</legend>
          <label htmlFor="edible">
          <input 
            type="checkbox"
            checked={formData.edible}
            onChange={(e) => setFormData({ ...formData, edible: e.target.checked })}
          />
          Edible?
        </label>
        <label htmlFor="qiQuest">
          <input 
            type="checkbox"
            checked={formData.qiColorQuest}
            onChange={(e) => setFormData({ ...formData, qiColorQuest: e.target.checked })}
          />
          Can it be used for the Qi Color Quest?
        </label>
        </fieldset>
        
        {/* ADDED BY (MOD) */}
        <fieldset>
          <legend>* Added by:</legend>
          {addedByList && addedByList.length > 0 ? (
            addedByList.map((source) => (
              <label key={source} htmlFor={source}>
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
          <button type="submit" onClick={handleSubmit} disabled={saving || !typesFound}>
            Submit
          </button>
          {saving && (<span>Saving, please wait ...</span>)}
        </div>
      </form>
    </>
  );
};

export default ItemForm;
