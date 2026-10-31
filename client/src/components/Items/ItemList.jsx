import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../lib/axios";

import RateLimitMessage from "../Messages/RateLimitMessage";
import LoadingMessage from "../Messages/LoadingMessage";
import ItemCard from "./ItemCard";

const NoItems = () => {
  return <h2>No Items Found</h2>;
};

const ItemList = ({ data, setItems }) => {
  const items = data || {};

  const handleDelete = async (e, name, itemId) => {
    e.preventDefault();

    if (!window.confirm(`Are you sure you want to delete the item ${name}?`))
      return;

    try {
      await api.delete(`/items/${itemId}`);

      setItems((prev) => prev.filter((prev) => prev._id !== itemId));

      toast.success(`${name} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting item", error);
      toast.error(`Failed to delete ${name} - something went wrong`);
    }
  };

  return (
    <>
      <div className="col-2">
			{items
        ? items.map((item) => (
            <ItemCard data={item} dataType="item" handleDelete={handleDelete} />
          ))
        : "No items"}
			</div>
    </>
  );
};

const AllItems = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/items");
        setItems(res.data);

        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching items");
        if (error.response.status == 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load items");
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
      {!loading && items.length === 0 && !isRateLimited && <NoItems />}
      {!loading && items.length > 0 && (
        <ItemList data={items} setItems={setItems} />
      )}
    </>
  );
};

export default AllItems;
