import { useState } from "react";

import api from "../../lib/axios";
import toast from "react-hot-toast";

import LocationForm from "../../components/Locations/LocationForm";

const LocationCreatePage = ({ addedByList }) => {
  const defaultFormData = {
    name: "",
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
      await api.post("/locations", {
        ...formData
      });
      
      toast.success(`Location ${formData.name} created successfully!`);
      
      setFormData(defaultFormData);
      
    } catch(error) {
      if(error.response.status === 429) {
        toast.error("Too many submissions in a short period of time, please wait a moment", { duration: 4000, icon: "skull" });
      } else {
        toast.error("Failed to create location");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <h1 className="page-title">Create Location</h1>
      <div className="content-wrapper">
        <LocationForm setFormData={setFormData} formData={formData} handleSubmit={handleSubmit} addedByList={addedByList} saving={saving} />  
      </div>     
    </>
  );
};

export default LocationCreatePage;
