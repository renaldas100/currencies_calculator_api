import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from "react";

const CurrenciesCalculator = () => {

    const [currencies, setCurrencies] = useState(0);
    const [currency1, setCurrency1] = useState(0);
    const [currency2, setCurrency2] = useState(0);
    const [result, setResult] = useState(0);
    const [date,setDate]=useState(0);
    const [currency1old, setCurrency1old] = useState(0);
    const [currency2old, setCurrency2old] = useState(0);

// GAUNAME VALIUTŲ SĄRAŠĄ
    useEffect(() => {
        fetch("https://api.frankfurter.app/currencies").then(
            (result) => {
                return result.json();
            }).then(
            (data) => {
                setCurrencies(data)
                // console.log(data)
            }
        );
    }, [])

    // console.log(currencies);

// GAUNAME VALIUTŲ SĄRAŠO KEY
    let sarasas = [];
    Object.keys(currencies).forEach(key => {
        sarasas.push(key)
    });
    // console.log(sarasas.length);

// ĮTERPIAME VALIUTAS Į SELECT PASIRINKIMĄ
    let masyvasSelect = [];
    for (let i = 0; i < sarasas.length; i++) {
        masyvasSelect.push(
            <option value={sarasas[i]}>{sarasas[i]}</option>
        )
    }
    // console.log(masyvasSelect);


    //
//PRISISKIRIAME PASIRINKTAS VALIUTAS IŠ SELECT PASIRINKIMO
    const onChangeCurrency1 = (event) => {
        setCurrency1(event.target.value)
    }
    // console.log(currency1);

    const onChangeCurrency2 = (event) => {
        setCurrency2(event.target.value)
    }
    // console.log(currency2);


// SUSKAIČIUOJAME
    const suskaiciuojam = (event) => {
        event.preventDefault();
        fetch("https://api.frankfurter.app/latest?from=" + currency1 + "&to=" + currency2).then(
            (result) => {
                return result.json();
            }).then(
            (data) => {
                setResult(data.rates[currency2])
                setDate(data.date)
                // console.log(data.rates[currency2])
                // console.log(data.date)

            }
        );
        setCurrency1old(currency1);
        setCurrency2old(currency2);
        setCurrency1("");
        setCurrency2("");
    }

    // console.log(result);
    // console.log(currencies[currency1old]);


    return (
        <div className="container">
            <div>
                <h3 className="title_text">Valiutų kursų skaičiuotuvas</h3>
            </div>
            <div className="d-flex justify-content-evenly">
                <select className="select col-2" onChange={onChangeCurrency1} value={currency1}>
                    <option value={""}>{"Pasirinkti"}</option>
                    {masyvasSelect}
                </select>
                <select className="select col-2" onChange={onChangeCurrency2} value={currency2}>
                    <option value={""}>{"Pasirinkti"}</option>
                    {masyvasSelect}
                </select>

                <form onSubmit={suskaiciuojam}>
                    <button type="submit" className="btn btn-success">Skaičiuoti</button>

                </form>
            </div>
            {result==0?"":
            <div className="col-8 mx-auto mt-5" style={{ color:"gold" }}>
                <p>Jūsų pasirinkote poras:</p>
                <p className="text-center"><span style={{ fontWeight:"700", fontSize:"1.2rem"}}>{currency1old}</span> ({currencies[currency1old]}) ir <span style={{ fontWeight:"700", fontSize:"1.2rem"}}>{currency2old}</span> ({currencies[currency2old]}) </p>
                <p>{date} duomenimis, už 1 {currency1old} galite įsigyti <span style={{ fontWeight:"700", fontSize:"1.2rem"}}>{result}</span> {currency2old}</p>

                <p>Duomenys paimti iš https://www.frankfurter.app</p>
            </div>
            }


        </div>
    )

}
export default CurrenciesCalculator;