import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountTypeSelection from "./components/accounts-type";
import PersonalMainPage from "./components/personal-main-page";
import BusinessMainPage from "./components/business-main-page";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<AccountTypeSelection />}></Route>
          <Route exact path="/personalPage" element={<PersonalMainPage />}></Route>
          <Route exact path="/businessPage" element={<BusinessMainPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
