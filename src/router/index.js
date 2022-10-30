import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharPrueba from '../views/CharPrueba.vue'
import CharacterIdView from '../views/CharacterIdView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/character',
    name: 'character',
    component: CharPrueba
  },
  {
    path: '/character/:id',
    name: 'CharacterIdView',
    component: CharacterIdView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
