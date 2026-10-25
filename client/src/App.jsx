import { Route, Routes } from "react-router";

import Navbar from "./components/Navbar";

// GENERAL PAGES
import HomePage from "./pages/HomePage";

// ITEM PAGES
import ItemsPage from "./pages/Items/ItemsPage";
import ItemDetailPage from "./pages/Items/ItemDetailPage";
import ItemCreatePage from "./pages/Items/ItemCreatePage";
import ItemEditPage from "./pages/Items/ItemEditPage";

// ITEM TYPE PAGES
import ItemTypesPage from "./pages/ItemTypes/ItemTypesPage";
import ItemTypeDetailPage from "./pages/ItemTypes/ItemTypeDetailPage";
import ItemTypeCreatePage from "./pages/ItemTypes/ItemTypeCreatePage";
import ItemTypeEditPage from "./pages/ItemTypes/ItemTypeEditPage";

// LOCATION PAGES
import LocationsPage from "./pages/Locations/LocationsPage";
import LocationDetailPage from "./pages/Locations/LocationDetailPage";
import LocationCreatePage from "./pages/Locations/LocationCreatePage";
import LocationEditPage from "./pages/Locations/LocationEditPage";

const App = () => {
  const addedByList = [
    "Vanilla",
    "Stardew Valley Expanded",
    "Ridgeside",
    "Eastscarp",
    "Other",
  ];
  
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
            <Route path="/item/create" element={<ItemCreatePage addedByList={addedByList} />} />
            <Route path="/item/edit/:id" element={<ItemEditPage addedByList={addedByList} />} />
            
            {/* ITEM TYPE PAGES */}
            <Route path="/itemtypes" element={<ItemTypesPage />} />
            <Route path="/itemtype/:id" element={<ItemTypeDetailPage />} />
            <Route path="/itemtype/create" element={<ItemTypeCreatePage addedByList={addedByList} />} />
            <Route path="/itemtype/edit/:id" element={<ItemTypeEditPage addedByList={addedByList} />} />
            
            {/* LOCATIONS PAGES */}
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/location/:id" element={<LocationDetailPage />} />
            <Route path="/location/create" element={<LocationCreatePage addedByList={addedByList} />} />
            <Route path="/location/edit/:id" element={<LocationEditPage addedByList={addedByList} />} />
            
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
