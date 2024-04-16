import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import CreateCustomer from "../pages/CreateCustomer";

function App() {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
                <Route path="/create-customer" element={<CreateCustomer />} />
            </Routes>
        </BrowserRouter>
     );
}

export default App;