import { CheckIcon, XIcon } from "lucide-react";

import EditDeleteButtons from "./EditDeleteButtons";
import Asset from "./Asset";

import "../styles/card.css";

const Card = ({ data, dataType, handleDelete }) => {
  const isFish = data.category.name === "Fish" ? true : false;
  console.log(data);
  
  return (
    <div className="card" key={data._id}>
      <div className="image">
        <Asset name={data.name} type={data.category.name} alt={`${data.name} Icon`} />
      </div>
      <div className="content">
        <h3 className="name">
          {data.name}
          {data.category && <span className="category">{data.category.name}</span>}
        </h3>
        <div className="details">
          {data.locations && data.locations.length > 0 && (
            <div className="locations list">
							<strong>Locations: </strong>
              {data.locations.map((location) => (
                <span key={location._id}>{location.name}</span>
              ))}
            </div>
          )}
          {isFish && (
            <>
            <hr/>
            <h3>Details</h3>
            <ul>
              <li className={data.size ? "" : "hidden"}><strong>Size:</strong> {data.size}</li>
              <li className={data.difficulty > 0 ? "" : "hidden"}><strong>Difficulty:</strong> {data.difficulty}</li>
              <li className={data.behavior ? "" : "hidden"}><strong>Behavior:</strong> {data.behavior}</li>
            </ul>
            </>
          )}
        </div>
        <div className="footer">
        {/* We do want to show this whether or not it's true as long as it exists (it won't exist on NPCs, furniture, or equipment for example) */}
          {Object.keys(data).includes("edible") && (
            <div className="edible">
              <strong>Edible?</strong>
              {data.edible && data.edible == true ? (
                <CheckIcon size={24} color="var(--forest)" />
              ) : (
                <XIcon size={24} color="var(--orange)" />
              )}
            </div>
          )}
          <EditDeleteButtons id={data._id} name={data.name} target={dataType} handleDelete={handleDelete} />
          {/* <div className="icon-button">
            <Link to={`/${dataType}/edit/${data._id}`}>
              <PencilIcon size={32} />
            </Link>
          </div>
          <div className="icon-button" onClick={(e) => handleDelete(e, data.name, data._id)}>
              <TrashIcon size={32} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
