import Vue from 'vue'
import Router from 'vue-router'
// import Recommend from 'components/recommend/recommend'
// import Singer from 'components/singer/singer'
// import Rank from 'components/rank/rank'
// import Search from 'components/search/search'
// import SingerDetaul from 'components/singer-detail/singer-detail'
// import Disc from 'components/disc/disc'
// import TopList from 'components/top-list/top-list'
// import UserCenter from '../components/user-center/user-center'

Vue.use(Router)

const Recommend = (resolve) => {
  import('components/recommend/recommend').then((moudule) => {
    resolve(moudule)
  })
}

const Singer = (resolve) => {
  import('components/singer/singer').then((moudule) => {
    resolve(moudule)
  })
}

const Rank = (resolve) => {
  import('components/rank/rank').then((moudule) => {
    resolve(moudule)
  })
}

const Search = (resolve) => {
  import('components/search/search').then((moudule) => {
    resolve(moudule)
  })
}

const SingerDetaul = (resolve) => {
  import('components/singer-detail/singer-detail').then((moudule) => {
    resolve(moudule)
  })
}

const Disc = (resolve) => {
  import('components/disc/disc').then((moudule) => {
    resolve(moudule)
  })
}

const TopList = (resolve) => {
  import('components/top-list/top-list').then((moudule) => {
    resolve(moudule)
  })
}

const UserCenter = (resolve) => {
  import('../components/user-center/user-center').then((moudule) => {
    resolve(moudule)
  })
}

export default new Router({
  routes: [
    {
      // 根目录，页面默认进入的
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetaul
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetaul
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
