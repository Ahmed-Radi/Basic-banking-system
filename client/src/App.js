import './App.css';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Transaction from './components/Transaction/Transaction';
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import AllTransaction from './components/AllTransaction/AllTransaction';

function App() {
    return (
        <div className="App">
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/transaction/:id" element={<Transaction />} />
                    <Route path="/transactions" element={<AllTransaction />} />
                    <Route path="*" element={<Navigate to="/" />}/>
                </Routes>
        </div>
    );
}

export default App;
