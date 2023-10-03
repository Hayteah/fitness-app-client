export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b4e87d861amsh63a63f0e46cebb4p1b22c9jsn7f4f5cd49852",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b4e87d861amsh63a63f0e46cebb4p1b22c9jsn7f4f5cd49852",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
