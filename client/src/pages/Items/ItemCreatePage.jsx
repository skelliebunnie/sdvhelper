import { useState } from "react";

import api from "../../lib/axios";
import toast from "react-hot-toast";

import ItemForm from "../../components/Items/ItemForm";

const ItemCreatePage = ({ defaultData }) => {
  const defaultFormData = {
    name: "",
    description: "",
    category: "",
    source: "",
    recipeSource: "",
    ingredients: [],
    equipment: "",
    sellable: false,
    sellPrice: 0,
    edible: false,
    locations: [],
    weather: "",
    time: [],
    difficulty: 0,
    behavior: "",
    size: "",
    initialGrowthTime: 0,
    reproductionTime: 0,
    baseHealth: 0,
    baseEnergy: 0,
    dyepotColor: "",
    sewingColor: "",
    qiColorQuest: false,
    universal: 0,
    addedBy: "Vanilla"
  }
  
  const [formData, setFormData] = useState(defaultFormData);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.name.trim()) {
      toast.error("Name is required!");
      return;
    }
    
    if(!formData.category.trim()) {
      toast.error("Category is required!");
      return;
    }
    
    if(!formData.addedBy.trim()) {
      toast.error("'Added By' is required!");
      return;
    }
    
    setSaving(true);
    try {
      await api.post("/items", {
        ...formData
      });
      
      toast.success(`${formData.name} created successfully!`);
      
      setFormData(defaultFormData);
      
    } catch(error) {
      if(error.response.status === 429) {
        toast.error("Too many submissions in a short period of time, please wait a moment", { duration: 4000, icon: "skull" });
      } else {
        toast.error("Failed to create item");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <h1 className="page-title">CREATE ITEM</h1>
      <div className="content-wrapper">
        
        <ItemForm setFormData={setFormData} formData={formData} handleSubmit={handleSubmit} defaultData={defaultData} saving={saving} />
      </div>
    </>
  );
};

export default ItemCreatePage;
