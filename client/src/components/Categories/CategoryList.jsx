import { useState, useEffect } from "react";

import toast from "react-hot-toast";
import api from "../../lib/axios";

import RateLimitMessage from "../Messages/RateLimitMessage";
import LoadingMessage from "../Messages/LoadingMessage";
import EditDeleteButtons from "../EditDeleteButtons";

const NoCategories = () => {
  return <h2>No Categories Found</h2>;
};

const CategoryList = ({ data, setCategories }) => {
  const categories = data || {};
  
  const handleDelete = async (e, name, categoryId) => {
    e.preventDefault();

    if (
      !window.confirm(`Are you sure you want to delete the category ${name}?`)
    )
      return;

    try {
      await api.delete(`/categories/${categoryId}`);

      setCategories((prev) => prev.filter((prev) => prev._id !== categoryId));

      toast.success(`${name} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting category", error);
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
        {categories
          ? categories.map((category) => (
              <tr key={category._id} data-id={category._id}>
                <td data-label="Name">{category.name ? category.name : ""}</td>
                <td data-label="Added By">{category.addedBy}</td>
                <td data-label="Edit/Delete" className="mod">
                  <EditDeleteButtons id={category._id} name={category.name} target="category" handleDelete={handleDelete} />
                </td>
              </tr>
            ))
          : "No item categories"}
      </tbody>
    </table>
  );
};

const AllCategories = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching item categories");
        if (error.response.status == 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load item categories");
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
      {!loading && categories.length === 0 && !isRateLimited && <NoCategories />}
      {!loading && categories.length > 0 && (
        <CategoryList data={categories} setCategories={setCategories} />
      )}
    </>
  );
};

export default AllCategories;
