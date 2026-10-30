import { useState, useEffect } from "react";
import { useParams } from "react-router";

import api from "../../lib/axios";
import toast from "react-hot-toast";

import LoadingMessage from "../../components/Messages/LoadingMessage";
import CategoryForm from "../../components/Categories/CategoryForm";

const CategoryEditPage = ({ defaultData }) => {
  const [formData, setFormData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get(`/categories/${id}`);
        setCategoryId(res.data._id); // save the id for the put request

        delete res.data["_id"]; // remove the id so we can use this as the formData
        console.log(res.data)
        setFormData(res.data);
      } catch (error) {
        console.error(`Failed to get category with id ${id}`, error);
        toast.error("Failed to fetch category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name and 'Added by' values required!");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/categories/edit/${categoryId}`, {
        ...formData,
      });

      toast.success(`${formData.name} updated successfully!`);
    } catch (error) {
      if (error.response.status === 429) {
        toast.error(
          "Too many submissions in a short period of time, please wait a moment",
          { duration: 4000, icon: "skull" },
        );
      } else {
        toast.error("Failed to update item type");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingMessage />;
  }

  return (
    <>
      <h1 className="page-title">Edit Category: {formData.name}</h1>
      <div className="content-wrapper">
        <CategoryForm
          setFormData={setFormData}
          formData={formData}
          handleSubmit={handleSubmit}
          addedByList={defaultData.addedByList}
          saving={saving}
        />
      </div>
    </>
  );
};

export default CategoryEditPage;
