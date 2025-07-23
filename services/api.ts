export  const TMDB_CONFIG= {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY:process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers:{
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    }
}

export const fetchMovies = async ({query}:{query : string}) => {

    const endpoint = query ?
        `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1` : `${TMDB_CONFIG.BASE_URL}/movie/popular?language=en-US&page=1`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers

    })
    if(!response.ok){
        throw new Error(response.statusText);
    }
    const json = await response.json();
    return json.results;

}
export default fetchMovies;
// const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODRiYTgxODliNGYxNTVkZTYxNDI4MWVlMzIzNWQwYSIsIm5iZiI6MTU2NTk2NjQ2OC4zLCJzdWIiOiI1ZDU2YzA4NGU4MTMxZDRhMDM4OWRjYmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yWFkoGJjngMk3yasagt8u55IaOvL67pNjZAkz0X7hL8'
//     }
// };
//
// fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.error(err));