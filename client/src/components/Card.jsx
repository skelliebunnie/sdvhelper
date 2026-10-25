import { CheckIcon, XIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";

import "../styles/card.css";

const Card = ({ data, dataType, handleDelete }) => {
  return (
    <div className="card" key={data._id}>
      <div className="image">
        <img
          src={`https://picsum.photos/seed/${data.name}/300`}
          alt={data.name}
        />
      </div>
      <div className="content">
        <h3 className="name">
          {data.name}
          {data.type && <span className="type">{data.type.name}</span>}
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
          {/* We do want to show this whether or not it's true as long as it exists (it won't exist on NPCs, furniture, or equipment for example) */}
          {Object.keys(data).includes("edible") && (
            <div className="edible">
              <strong>Edible?</strong>
              {data.edible && data.edible == true ? (
                <CheckIcon size={24} />
              ) : (
                <XIcon size={24} />
              )}
            </div>
          )}
        </div>
        <div className="mod">
          <div className="icon-button">
            <Link to={`/${dataType}/edit/${data._id}`}>
              <PencilIcon size={32} />
            </Link>
          </div>
          <div className="icon-button" onClick={(e) => handleDelete(e, data.name, data._id)}>
              <TrashIcon size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
