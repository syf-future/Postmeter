import { createRouter, createWebHistory } from 'vue-router'
import View from '@renderer/views/index.vue';
import Workbench from '@renderer/components/workbench.vue';
import Workflow from '@renderer/components/workflow.vue';
import Workbox from '@renderer/components/workbox.vue';
import EnvBench from '@renderer/components/envBench.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    // path和component对应关系的位置
    routes: [
        {
            path: '/',
            component: View,
            children: [				//嵌套路由
                {
                    path: 'workbench',
                    component: Workbench
                },
                {
                    path: 'workflow',
                    component: Workflow
                },
                {
                    path: 'workbox',
                    component: Workbox
                },
                {
                    path: 'envBench',
                    component: EnvBench
                },
            ]
        },
    ]
})

export default router
