import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import api from "../../lib/axios";

import RateLimitMessage from "../Messages/RateLimitMessage";
import LoadingMessage from "../Messages/LoadingMessage";

const NoItemTypes = () => {
  return <h2>No Item Types Found</h2>;
};

const ItemTypeList = ({ data, setItemTypes }) => {
  const itemTypes = data || {};

  const handleDelete = async (e, name, itemTypeId) => {
    e.preventDefault();

    if (
      !window.confirm(`Are you sure you want to delete the item type ${name}?`)
    )
      return;

    try {
      await api.delete(`/itemtypes/${itemTypeId}`);

      setItemTypes((prev) => prev.filter((prev) => prev._id !== itemTypeId));

      toast.success(`${name} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting item type", error);
      toast.error(`Failed to delete ${name} - something went wrong`);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Added By</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
        {itemTypes
          ? itemTypes.map((itemType) => (
              <tr key={itemType._id} data-id={itemType._id}>
                <td data-label="Name">{itemType.name ? itemType.name : ""}</td>
                <td data-label="Added By">{itemType.addedBy}</td>
                <td data-label="Edit/Delete" className="mod">
                  <div className="icon-button">
                    <Link to={`/itemtype/edit/${data._id}`}>
                      <PencilIcon size={32} />
                    </Link>
                  </div>
                  <div
                    className="icon-button"
                    onClick={(e) => handleDelete(e, data.name, data._id)}
                  >
                    <TrashIcon size={32} />
                  </div>
                </td>
              </tr>
            ))
          : "No item types"}
      </tbody>
    </table>
  );
};

const AllItemTypes = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [itemTypes, setItemTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/itemtypes");
        setItemTypes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching item types");
        if (error.response.status == 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load item types");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      {isRateLimited && <RateLimitMessage type="warn" />}
      {loading && <LoadingMessage />}
      {!loading && itemTypes.length === 0 && !isRateLimited && <NoItemTypes />}
      {!loading && itemTypes.length > 0 && (
        <ItemTypeList data={itemTypes} setItemTypes={setItemTypes} />
      )}
    </>
  );
};

export default AllItemTypes;
