import { PencilIcon, TrashIcon } from "lucide-react-motion";
import { Link } from "react-router";

const EditDeleteButtons = ({ id, name, target, handleDelete = null }) => {
  return (
    <div className="mod-buttons">
      <div className="icon-button">
        <Link to={`/${target}/edit/${id}`}>
          <PencilIcon size={32} />
        </Link>
      </div>
      <div className="icon-button" onClick={(e) => handleDelete(e, name, id)}>
        <TrashIcon size={32} />
      </div>
    </div>
  );
};

export default EditDeleteButtons;
