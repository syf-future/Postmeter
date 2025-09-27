import { defineStore } from "pinia";
import { ref } from "vue";
import { SequenceUtil } from "@renderer/utils/SequenceUtil";
import { WorkFlow, WorkFlowHttp, WorkFlowSql, WorkFlowSleep } from "@renderer/interfaces/workFlow";

// 定义响应列表的 Pinia store
export const workFlowStore = defineStore("workFLowStore", () => {
    const workFlowList = ref<WorkFlow[]>([{
        workFlowId: SequenceUtil.nextId(),
        workFlowName: '新建工作流',
        wordFlowThreadNum: 1,
        wordFlowCycleNum: 1,
        wordFlowIntervalTime: 0,
        wordFlowWorkList: []
    }]);
    const workFlow = ref<WorkFlow>();
    const workFlowType = ref<string>('');

    /**
     * 新增工作流
     */
    function addWorkFlow(): void {
        const workFlow = <WorkFlow>{
            workFlowId: SequenceUtil.nextId(),
            workFlowName: '新建工作流',
            wordFlowThreadNum: 1,
            wordFlowCycleNum: 1,
        }
        workFlowList.value.push(workFlow);
    }
    /**
     * 设置当前工作流
     * @param workFlowId 工作流ID
     */
    function setNowWorkFlow(workFlowId: string): void {
        const nowWorkFlow = workFlowList.value.find(item => item.workFlowId === workFlowId);
        if (nowWorkFlow) {
            workFlow.value = nowWorkFlow;
        }
    }

    /**
     * 设置打开的工作流类型
     * @param type 工作流类型 EnumWorkFlowCode
     */
    function setWorkFlowType(type: string): void {
        workFlowType.value = type;
    }

    /**
     * 新增工作流子项
     * @param workflowSub 工作流子项任务
     */
    function addWorkflowSub(workflowSub: WorkFlowHttp | WorkFlowSql | WorkFlowSleep) {
        if (workFlow.value) {
            const workflowList = workFlow.value.wordFlowWorkList || [];
            workflowList.push(workflowSub);
            workFlow.value.wordFlowWorkList = workflowList;
        }
    }
    return { workFlowList, workFlow, workFlowType, addWorkFlow, setNowWorkFlow, setWorkFlowType, addWorkflowSub };
})