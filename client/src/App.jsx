import { Route, Routes } from "react-router"

import HomePage from "./pages/HomePage";
import ItemDetailPage from "./pages/ItemDetailPage";
import ItemCreatePage from "./pages/ItemCreatePage";

import Navbar from "./components/Navbar"

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/item/create" element={<ItemCreatePage />} />
      </Routes>
    </>
  )
}

export default App;