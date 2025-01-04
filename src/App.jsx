import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [countriesData, setCountriesData] = useState(null);
  const [input, setInput] = useState("");

  const URL = "https://0b9f457a-c7f4-4a28-9f68-2fe10314cedd.mock.pstmn.io/crio";

  // create function for handle input search box
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  // fetch api data and set data in state

  async function fetchData() {
    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        setData(response.data);
        // setCountriesData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //filter data by the country name on changing search box content
  useEffect(() => {
    console.log(input)
    const updateData = ()=>{
      if(input===""){
        setCountriesData(data);
      }else{
        const filteredData = data.filter((item) => item.common.toLowerCase().startsWith(input.toLowerCase()));
        setCountriesData(filteredData);
      }
    }
    updateData();
  }, [input, data]);

  //call fetchData function on dom loading
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <nav className="nav">
        <input
          type="text"
          className="searchBar"
          placeholder="Search for countries..."
          value={input}
          onChange={handleChange}
        />
      </nav>
      <div className="cardContainer">
        {countriesData &&
          countriesData.map((item, index) => (
            <div key={index} className="card">
              <img src={item.png} alt="country flag" />
              <div>{item.common}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
