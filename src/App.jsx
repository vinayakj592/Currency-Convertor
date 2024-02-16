import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {

  const [amount,setAmount] = useState(1);
  const [fromCurrency,setFromCurrency] = useState("USD");
  const [toCurrency,setToCurrency] = useState("INR");
  const [rates,setRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(()=>{
    const url = `https://v6.exchangerate-api.com/v6/c4aa355a1ac2fd30aff8a9ba/latest/${fromCurrency}`;
    axios.get(url)
    .then(response=>{
      setRates(response.data.conversion_rates);
    })
    .catch(error => {
      console.error('Error fetching exchange rates:', error);
    });
  },[fromCurrency]);
  useEffect(()=>{
    const conversionRate = rates[toCurrency];
    if(conversionRate)
    {
      setConvertedAmount((amount*conversionRate).toFixed(2));
    }
  },[fromCurrency,toCurrency,rates,amount]);
  const changeHandler= (e)=>{
    const{name,value} = e.target;
    switch(name)
    {
      case "amount":
        setAmount(value);
        break;
      case "fromCurrency":
        setFromCurrency(value);
        break
      case "toCurrency":
        setToCurrency(value);
        break
    }
  }
  return (
    <>
      <div className="body h-screen w-screen bg-slate-100 flex items-center justify-center">
        <div className="card flex p-10 w-1/2 h-80 bg-white rounded-xl">
          <div className="flex flex-col w-full justify-between">
            <h1 className="text-3xl text-neutral-800 font-semibold">Currency Convertor</h1>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <label className="mb-2 text-sm text-gray-500 font-medium">Amount:</label>
                <input type="number" id="number-input" name= "amount" value={amount} onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-44 pl-6 p-2.5" required />
              </div>
              <div className="flex flex-col">
              <label htmlFor="countries" className="mb-2 text-sm text-gray-500 font-medium">From Currency:</label>
                <select id="number-input1" value={fromCurrency}name= "fromCurrency" onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-44 pl-6 p-2.5" required>
                {Object.keys(rates).map(currency=>(
                  <option key={currency} value={currency}>
                  {currency}
                  </option>
                ))};
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="countries" className="mb-2 text-sm text-gray-500 font-medium">To Currency:</label>
                <select id="number-input2"  value={toCurrency} name="toCurrency" onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-44 pl-6 p-2.5" required>
                {Object.keys(rates).map(currency=>(
                  <option key={currency} value={currency}>
                  {currency}
                  </option>
                ))};
                </select>
              </div>
            </div>
            <h1 className="text-md font-semibold text-neutral-600 bg-sky-100 w-fit p-6 rounded-lg">Converted Amount: <span className="font-extrabold">{convertedAmount}</span></h1>
          </div>
        </div>
      </div>
    </>
  )
}
export default App