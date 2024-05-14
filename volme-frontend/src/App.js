import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from "./util/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import NoFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";

function App() {
    return (
        <div className="App">

            <Router>
                <NavBar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/product' element={<Product/>}/>
                    <Route path='/profile/:username' element={<UserProfile/>}/>
                    <Route path='*' element={<NoFound/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
