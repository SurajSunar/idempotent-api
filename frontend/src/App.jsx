import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./home";
import CustomerListPage from "./customers/list-customer";
import Createcustomer from "./customers/create-customer";
import Editcustomer from "./customers/edit-customer";
import Viewcustomer from "./customers/view-customer";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="customers">
          <Route path="" element={<CustomerListPage />} />
          <Route path="create" element={<Createcustomer />} />
          <Route path=":id">
            <Route path="" element={<Viewcustomer />} />
            <Route path="edit" element={<Editcustomer />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
