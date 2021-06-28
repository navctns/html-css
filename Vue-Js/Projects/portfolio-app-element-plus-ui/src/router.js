import {createRouter, createWebHistory} from 'vue-router';
// const TheHome = () => import('./pages/sample/TheHome.vue');
const TheAbout = () => import('./pages/sample/TheAbout.vue');
const HomePage = () => import('./pages/HomePage.vue');
const SkillsPage = () => import('./pages/SkillsPage.vue');
const ExperienceAndAcademics = () => import('./pages/ExperienceAndAcademics.vue');

const router = createRouter({
  history:createWebHistory(),
  routes:[
    { path:'/',
      component:HomePage,
    },
    {
      path:'/about',
      component:TheAbout,
    },
    {
      path:'/skills',
      component:SkillsPage,
    },
    {
      path:'/exp_academics',
      component:ExperienceAndAcademics,
    },

  ],
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition;
    }
    return { left:0, top:0 };
  }
});

export default router
