
const routes = [
  {
    path: '/',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: 'signIn', component: () => import('pages/auth/SignIn.vue') },
      { path: 'signUp', component: () => import('pages/auth/SignUp.vue') }
    ]
  },
  {
    path: '/question',
    component: () => import('layouts/Header.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/question/SelectTypeOfQuestion.vue') },
      { path: 'subject', component: () => import('pages/question/Subject.vue') },
      { path: 'tender', component: () => import('pages/question/Tender.vue') },
      { path: 'begin/:id?', component: () => import('pages/question/Question.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
