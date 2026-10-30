import { Route, Routes } from "react-router";
// import { useState } from "react";

import Navbar from "./components/Navbar";

// GENERAL PAGES
import HomePage from "./pages/HomePage";

// ITEM PAGES
import ItemsPage from "./pages/Items/ItemsPage";
import ItemDetailPage from "./pages/Items/ItemDetailPage";
import ItemCreatePage from "./pages/Items/ItemCreatePage";
import ItemEditPage from "./pages/Items/ItemEditPage";

// ITEM TYPE PAGES
import CategoriesPage from "./pages/Categories/CategoriesPage";
import CategoryDetailPage from "./pages/Categories/CategoryDetailPage";
import CategoryCreatePage from "./pages/Categories/CategoryCreatePage";
import CategoryEditPage from "./pages/Categories/CategoryEditPage";

// LOCATION PAGES
import LocationsPage from "./pages/Locations/LocationsPage";
import LocationDetailPage from "./pages/Locations/LocationDetailPage";
import LocationCreatePage from "./pages/Locations/LocationCreatePage";
import LocationEditPage from "./pages/Locations/LocationEditPage";


const App = () => {
  const defaultData = {
    "addedByList": [
      "Vanilla",
      "Stardew Valley Expanded",
      "Ridgeside",
      "Eastscarp",
      "Other",
    ],
    "seasons": [
      "Spring",
      "Summer",
      "Fall",
      "Winter",
      "Any"
    ],
    "weather": [
      "Rain",
      "Sunny",
      "Any"
    ],
    "fishBehavior": [
      "Mixed",
      "Smooth",
      "Sinker",
      "Floater",
      "Dart"
    ]
  }
  
  // const [isEditing, setIsEditing] = useState(false);
  
  return (
    <>
      <div className="page-wrapper">
        <Navbar />
        <main className="page-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* ITEM PAGES */}
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/item/:id" element={<ItemDetailPage />} />
            <Route path="/item/create" element={<ItemCreatePage defaultData={defaultData} />} />
            <Route path="/item/edit/:id" element={<ItemEditPage defaultData={defaultData} />} />
            
            {/* ITEM TYPE PAGES */}
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:id" element={<CategoryDetailPage />} />
            <Route path="/category/create" element={<CategoryCreatePage defaultData={defaultData} />} />
            <Route path="/category/edit/:id" element={<CategoryEditPage defaultData={defaultData} />} />
            
            {/* LOCATIONS PAGES */}
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/location/:id" element={<LocationDetailPage />} />
            <Route path="/location/create" element={<LocationCreatePage defaultData={defaultData} />} />
            <Route path="/location/edit/:id" element={<LocationEditPage defaultData={defaultData} />} />
            
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
