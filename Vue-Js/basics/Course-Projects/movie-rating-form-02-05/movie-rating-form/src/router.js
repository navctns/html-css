import {createRouter, createWebHistory} from 'vue-router';
import TheMovies from './pages/TheMovies.vue';
import AdminPanel from './pages/AdminPanel.vue';
import MovieForm from './components/movie-items/MovieForm.vue';
import StoredMovies from './components/movie-items/StoredMovies.vue';
import MovieDetails from './components/movie-items/MovieDetails.vue';

const router = createRouter({
  history:createWebHistory(),
  routes:[
    { path:'/', component:TheMovies},
    { path:'/:movieId', component:MovieDetails, props:true, name:"movie-details"},
    { path:'/panel', component: AdminPanel, name:'main-panel', redirect:'/panel/addMovie',
      children:[
        // {path:'/panel/:section', name:"add-movie", component:MovieForm}
        {path:'/panel/addMovie', name:"add-movie", component:MovieForm},
        {path:'/panel/storedMovies', name:"stored-movies", component:StoredMovies},
      ]
    }
  ],
  scrollBehavior(to,from,savedPosition){
    console.log('scroll-beh',to, from, savedPosition);
    if(savedPosition){
      return savedPosition;
    }
    return { left:0, top:0 };
  }
});

export default router
