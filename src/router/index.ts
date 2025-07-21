import { createRouter, createWebHistory } from 'vue-router'

import IntroPage from '@/pages/Intro.vue'
import Dashboard from '@/pages/Dashboard.vue'
import GenEnglish from '@/pages/GenEnglish.vue'
import DetailPage from '@/pages/[id].vue'
import Computer from '@/pages/Computer.vue'
import ElectiveEnglish from '@/pages/ElectiveEnglish.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: IntroPage,
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        { path: '/dashboard/', redirect: '/dashboard/genral-english' },
        { path: '/dashboard/general-english', component: GenEnglish },
        { path: '/dashboard/elective-english', component: ElectiveEnglish },
        { path: '/dashboard/computer', component: Computer },
        { path: '/dashboard/docs/:id', component: DetailPage },
      ],
    },
  ],
})

export default router
