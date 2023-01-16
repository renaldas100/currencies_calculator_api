import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Currencies_calculator from "./components/currencies_calculator";

function App() {
    return (
        <div className="background">
            <div className="">
                <Currencies_calculator></Currencies_calculator>
            </div>
        </div>
    );
}

export default App;
