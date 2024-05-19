import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import NavBar from "./util/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import NoFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./util/ForgetPasswordPage";

function App() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="App">

            <Router>
                <NavBar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/product' element={<Product/>}/>
                    <Route path='/profile/:emailAddress' element={<UserProfile/>}/>
                    <Route path='/reset-password' element={<ForgotPassword/>} />
                    <Route path='*' element={<NoFound/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
