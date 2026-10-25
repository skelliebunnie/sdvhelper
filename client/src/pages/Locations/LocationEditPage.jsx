import { useState, useEffect } from "react";
import { useParams } from "react-router";

import api from "../../lib/axios";
import toast from "react-hot-toast";

import LoadingMessage from "../../components/Messages/LoadingMessage";
import LocationForm from "../../components/Locations/LocationForm";

const LocationEditPage = ({ addedByList }) => {
  const [formData, setFormData] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/locations/${id}`);
		setLocationId(res.data._id); // save the id for the put request
		
		delete res.data["_id"]; // remove the id so we can use this as the formData
        setFormData(res.data);
		
      } catch (error) {
        console.error(`Failed to get location with id ${id}`, error);
        toast.error("Failed to fetch location");
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
		
      await api.put(`/locations/edit/${locationId}`, {
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
        toast.error("Failed to update location");
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
      <h1 className="page-title">Edit Location: {formData.name}</h1>
      <div className="content-wrapper">
        <LocationForm setFormData={setFormData} formData={formData} handleSubmit={handleSubmit} addedByList={addedByList} saving={saving} />  
      </div>     
    </>
  );
};

export default LocationEditPage;
