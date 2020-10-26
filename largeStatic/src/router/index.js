import Vue from 'vue'
import Router from 'vue-router'
import userOverview from '@/components/userOverview'
import userDevelopment from '@/components/userDevelopment'
import businessQuality from '@/components/businessQuality'
import businessOrder from '@/components/businessOrder'
import businessRatings from '@/components/businessRatings' // 业务收视


Vue.use(Router)

export default new Router({

    routes: [{
            path: '/',
            name: 'userOverview',
            component: userOverview
        },
        {
            path: '/userDevelopment',
            name: 'userDevelopment',
            component: userDevelopment
        },
        {
            path: '/businessQuality',
            name: 'businessQuality',
            component: businessQuality
        },
        {
            path: '/businessOrder',
            name: 'businessOrder',
            component: businessOrder
        },
        {
            path: '/businessRatings',
            name: 'businessRatings',
            component: businessRatings
        }
    ]
})