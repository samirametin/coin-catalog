import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import CoinsByCategory from "./Pages/CoinsByCategory/CoinsByCategory";
import CoinDescription from "./Pages/CoinsDescription/CoinDescription";
import ListOfCoins from "./Pages/ListOfCoins/ListOfCoins";
import AdvancedSearchPage from "./Pages/AdvancedSearchPage/AdvancedSearchPage";
import AdminPanelAdd from "./Pages/AdminPage/AdminPanelAddCoins/AdminPanelAdd";
import AdminPanelLogin from "./Pages/AdminPage/AdminPanelLogin/AdminPanelLogin";
import AdminPanelEdit from "./Pages/AdminPage/AdminPanelEdit/AdminPanelEdit";
import EditCoin from "./Pages/AdminPage/EditCoin/EditCoin";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/adv-search" element={<AdvancedSearchPage />} />
          <Route path="/coins/:category" element={<CoinsByCategory />} />
          <Route path="/coin/:id" element={<CoinDescription />} />
          <Route path="/search" element={<ListOfCoins />} />
          <Route path="/admin-panel/login" element={<AdminPanelLogin />} />
          <Route path="/admin-panel/editCoin" element={<AdminPanelEdit />} />
          <Route path="/admin-panel/editCoin/:id" element={<EditCoin />} />
          <Route path="/admin-panel/addCoin" element={<AdminPanelAdd />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
