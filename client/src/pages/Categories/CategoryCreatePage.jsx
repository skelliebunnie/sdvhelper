import { useState } from "react";

import api from "../../lib/axios";
import toast from "react-hot-toast";

import CategoryForm from "../../components/Categories/CategoryForm";

const CategoryCreatePage = ({ defaultData }) => {
  const defaultFormData = {
    name: "",
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
      await api.post("/categories", {
        ...formData
      });
      
      toast.success(`Category: ${formData.name}, created successfully!`);
      
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
      <h1 className="page-title">Create Category</h1>
      <div className="content-wrapper">
        <CategoryForm setFormData={setFormData} formData={formData} handleSubmit={handleSubmit} addedByList={defaultData.addedByList} saving={saving} />
      </div>
    </>
  );
};

export default CategoryCreatePage;
