import { useState } from "react";

import api from "../../lib/axios";
import toast from "react-hot-toast";

import BackButton from "../../components/BackButton"
import ItemTypeForm from "../../components/ItemTypes/ItemTypeForm";

const ItemTypeCreatePage = ({ addedByList }) => {
  const defaultFormData = {
    name: "Other",
    associatedItems: [],
    addedBy: "Vanilla"
  }
  
  const [formData, setFormData] = useState(defaultFormData);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.name.trim()) {
      toast.error("Name and 'Added by' values required!");
      return;
    }
    
    setSaving(true);
    try {
      await api.post("/itemtypes", {
        ...formData
      });
      
      toast.success(`Item Type: ${formData.name}, created successfully!`);
      
      setFormData(defaultFormData);
      
    } catch(error) {
      if(error.response.status === 429) {
        toast.error("Too many submissions in a short period of time, please wait a moment", { duration: 4000, icon: "skull" });
      } else {
        toast.error("Failed to create item type");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <BackButton />
      <ItemTypeForm setFormData={setFormData} formData={formData} handleSubmit={handleSubmit} addedByList={addedByList} saving={saving} />
    </>
  );
};

export default ItemTypeCreatePage;
