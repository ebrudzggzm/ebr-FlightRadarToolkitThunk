import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constants";

export const getFlights = createAsyncThunk("flights/getFlights", async () => {
  const res = await axios.request(options);
//console.log(res) //app de çağırki çalışsın

const formatted = res.data.aircraft.map((item)=>({
    id:item[0],
    code:item[1],
    lat:item[2],
    lng:item[3]
}));

//console.log(formatted) 
return formatted;
});
