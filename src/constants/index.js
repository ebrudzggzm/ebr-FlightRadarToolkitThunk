

export const options = {
    method: 'GET',
    url: import.meta.env.VITE_API_URL + '/flights/list-in-boundary',
    params: {
      bl_lat: '34.250146',
      bl_lng: '24.799573',
      tr_lat: '43.034665',
      tr_lng: '44.285091',
      limit: '300'
    },
    headers: {
      'X-RapidAPI-Key':  import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
  };

  export const optionsD = {
   
    headers: {
      'X-RapidAPI-Key':  import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
  };

  