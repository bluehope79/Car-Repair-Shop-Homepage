import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Question from '@/components/Question'
import Review from '@/components/Review'
import Reservation from '@/components/Reservation'
import Quest_add from '@/components/Quest_add'
import Login_em from '@/components/Login_em'
import Review_add from '@/components/Review_add'
import Reserv_add from '@/components/Reserv_add'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/question',
      name:'Question',
      component: Question
    },
    {
      path:'/review',
      name:'Review',
      component: Review
    },
    {
      path:'/reservation',
      name:'Reservation',
      component: Reservation
    },
    {
      path:'/quest_add',
      name:'Quest_add',
      component: Quest_add
    },{
      path:'/login_em',
      name:'Login_em',
      component: Login_em
    },{
      path:'/review_add',
      name:'Review_add',
      component: Review_add
    },{
      path:'/reserv_add',
      name:'Reserv_add',
      component: Reserv_add
    }
  ]
})
