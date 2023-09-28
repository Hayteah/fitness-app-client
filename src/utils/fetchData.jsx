export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ae418e3cb3mshdfa70d3604bb711p140063jsn4d5bf779d633",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  const urlWithLimit = `${url}?limit=1000`;
  
  const res = await fetch(urlWithLimit, options);
  const data = await res.json();

  return data;
};
