import { Link } from "react-router";

import "../../styles/form.css";
import { ChevronsLeftIcon } from "lucide-react-motion";

const LocationForm = ({ setFormData, formData, handleSubmit, addedByList, saving }) => {
  return (
    <>
      <Link to="/locations" className="icon-link"><ChevronsLeftIcon /> See All Locations</Link>
      <hr />
      <small>(*) required</small>
      <form>
        <fieldset>
          <legend className="required">* Name</legend>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            required
            disabled={saving}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </fieldset>
        <fieldset className="col">
          <legend className="required">* Added by</legend>
          {addedByList && addedByList.length > 0 ? (
            addedByList.map((source) => (
              <label key={source} htmlFor={source}>
                <input
                  type="radio"
                  value={source}
                  checked={formData.addedBy === source}
                  disabled={saving}
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
        <button type="submit" onClick={handleSubmit} disabled={saving}>
          Submit
        </button>
        {saving && (<span>Saving, please wait ...</span>)}
      </form>
    </>
  );
};

export default LocationForm;
