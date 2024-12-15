// Material UI
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
//Axios
import axios from "axios";

let cancelAxios = null;
export default function SearchBarComponent() {
  const [city, setCity] = useState(""); // For selected value
  const [data, setData] = useState({
    cname: "",
    description: "",
    cuName: "",
    temp: null,
    win: null,
    icon: null,
  });
  const [buttonClick, setButtonClick] = useState(true);
  useEffect(() => {
    // console.log("this is from the useEffect ");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c7bce941bb31f9757642c1e2e9cb505f`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        console.log("this is the resp" + response);
        // Replace with your API URL
        const cityName = response.data.name;
        const desc = response.data.weather[0].description;
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const wind = (response.data.wind.speed * 3.6).toFixed(0);
        const countryName = response.data.sys.country;
        const responseIcon = response.data.weather[0].icon;
        setData({
          cname: cityName,
          description: desc,
          cuName: countryName,
          temp: responseTemp,
          win: wind,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        }); // Update state with fetched data
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      cancelAxios();
    };
  }, [buttonClick]);
  return (
    <div style={{ padding: "20px" }}>
      <div
        className="searching"
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        {" "}
        <TextField
          style={{
            width: "100%",
            color: "white",
            fontSize: "30px",
            margin: "10px",
          }}
          id="standard-basic"
          label="City_Name"
          variant="standard"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          variant="contained"
          value={buttonClick}
          onClick={(e) => setButtonClick(!buttonClick)}
        >
          Search
        </Button>
      </div>
      <div className="content" style={{ color: "white", margin: "" }}>
        <div>
          <div
            className="Name-Icon"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {" "}
            <div>
              {" "}
              <img
                src={data.icon}
                style={{ width: "200px", height: "200px" }}
              />
              <p>{data.description}</p>
            </div>
            {/* <div>{dateAndTime}</div> */}
            <p style={{ fontSize: "40px" }}>Temp : {data.temp}°C</p>
            <h1 style={{}}>City : {data.cname}</h1>
          </div>
          <div
            className="info"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            {" "}
            <p>Country : {data.cuName}</p>
            <p>Wind speed : {data.win} Km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
