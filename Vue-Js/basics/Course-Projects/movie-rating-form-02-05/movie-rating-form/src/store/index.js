
import { createStore } from 'vuex';

const store = createStore({
  state(){
    return{
        movies:[],
      genres:null,
      selectedMovie:null,
      currentMovieReviews:[],
      languages:null,
    }

  },
  mutations:{
    addNewMovie(state,movieObj){
      console.log('add new movie');
      state.movies.unshift(movieObj);
    },
    deleteMovieFromList(state,id){
      console.log('delete from app');
      // this.movies = this.movies.filter(movie => movie.id !== id);
      const idx = state.movies.findIndex(movie => movie.id === id);
      state.movies.splice(idx,1);
      console.log(state.movies);
    },
    sortMoviesByGenre(state, payload){
      // console.log(state.movies,state.movies[0].genre_ids,'movie-genre-eg');
      console.log(payload);
      state.movies = state.movies.filter(movie => movie.genre_ids.includes(payload));
      const sortedIndexes = state.movies.findIndex(movie => movie.genre_ids.includes(payload));
      console.log('sorted movies', sortedIndexes);

      console.log(state.movies);
    },
    setSelectedMovie(state, payload){
      //Set movie selected by the user to show details
      state.selectedMovie = payload;
    },
    setReviews(state, payload){
      //Set Reviews for current movie
      state.currentMovieReviews = payload;
    },
    setLanguages(state, payload){
      state.languages = payload;
    }
  },
  actions:{
    addMovie(context, payload){
      context.commit('addNewMovie', payload);
    },
    deleteMovie(context, payload){
      console.log('delete movie');
      context.commit('deleteMovieFromList', payload);
    },
    async setMovies(context){
      //TOP Rated MOVIES
      // const moviesResponse = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=c9a2fdad68cf48b2893d6e9ab30ad18a&language=en-US');
      //NOW PLAYING
      // const moviesResponse = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=c9a2fdad68cf48b2893d6e9ab30ad18a&language=en-US&page=2');
      //POPULAR
      // const moviesResponse = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=c9a2fdad68cf48b2893d6e9ab30ad18a&language=en-US&page=2');
      //UPCOMING MOVIES
      const moviesResponse = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=c9a2fdad68cf48b2893d6e9ab30ad18a&language=en-US&page=2');
      const responseData = await moviesResponse.json();
      console.log(responseData.results);
      // return state.movies;
      if(!moviesResponse.ok){
        console.log('Error while lading movies');
      }
      context.state.movies = responseData.results;
      // return responseData.results;
    },
    async fetchGenres(context){
      const genresRes = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=c9a2fdad68cf48b2893d6e9ab30ad18a&language=en-US');
      const genresData = await genresRes.json();
      console.log('genres data',genresData);
      console.log('genres data',genresData.genres);
      if(!genresRes.ok){
        console.log('Error while fetching genres');
      }
      context.state.genres = genresData.genres;
    },
    async getMovieData(context, payload){
      console.log('payload', payload, typeof payload);
      const movieResponse = await fetch(payload);
      const responseData = await movieResponse.json();
      console.log('movie details', responseData);
      context.commit('setSelectedMovie', responseData);
    },
    async getFromAPI(context, payload){
      const movieResponse = await fetch(payload.link);
      const responseData = await movieResponse.json();
      console.log('Data Retrieved:', responseData.results);
      if(!movieResponse.ok){
        console.log('Something went wrong, on getting data');
      }
      console.log('res',payload.toDo);
      if(payload.toDo === 'reviews'){
        console.log('setReviews');
        context.commit('setReviews',responseData.results);
      }else if(payload.toDo === 'langs'){
        context.commit('setLanguages', responseData);
        console.log('langs fetched', responseData);
      }
    },
  },
  getters:{
    movies(state){
      return state.movies;
    },
    genres(state){
      return state.genres;
    },
    getSelectedMovie(state){
      return state.selectedMovie;
    },
    getMovieReviews(state){
      return state.currentMovieReviews;
    },
    getLanguages(state){
      return state.languages;
    }
  }
});

export default store;
