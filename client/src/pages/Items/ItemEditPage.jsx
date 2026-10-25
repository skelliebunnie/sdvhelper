import { useState, useEffect } from "react";
import { useParams } from "react-router";

import api from "../../lib/axios";
import toast from "react-hot-toast";

import LoadingMessage from "../../components/Messages/LoadingMessage";
import ItemForm from "../../components/Items/ItemForm";

const ItemEditPage = ({ addedByList }) => {
  const [formData, setFormData] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${id}`);
        setItemId(res.data._id); // save the id for the put request

        delete res.data["_id"]; // remove the id so we can use this as the formData
        setFormData(res.data);
      } catch (error) {
        console.error(`Failed to get item with id ${id}`, error);
        toast.error("Failed to fetch item");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name and 'Added by' values required!");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/items/edit/${itemId}`, {
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
        toast.error("Failed to update item");
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
      <h1 className="page-title">Edit Item: {formData.name}</h1>
      <div className="content-wrapper">
        <ItemForm
          setFormData={setFormData}
          formData={formData}
          handleSubmit={handleSubmit}
          addedByList={addedByList}
          saving={saving}
        />
      </div>
    </>
  );
};

export default ItemEditPage;
