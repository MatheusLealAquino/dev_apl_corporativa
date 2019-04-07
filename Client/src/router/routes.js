
const routes = [
  {
    path: '/',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/question',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/Question.vue') }
    ]
  },
  {
    path: '/question/subject',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/Subject.vue') }
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
