import { defineStore } from "pinia";
import { ref } from "vue";
import { SequenceUtil } from "@renderer/utils/SequenceUtil";
import { WorkFlow, WorkFlowHttp, WorkFlowSql } from "@renderer/interfaces/workFlow";

// 定义响应列表的 Pinia store
export const workFlowStore = defineStore("workFLowStore", () => {
    const workFlowList = ref<WorkFlow[]>([{
        workFlowId: SequenceUtil.nextId(),
        workFlowName: '新建工作流',
        wordFlowThreadNum: 1,
        wordFlowCycleNum: 1,
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
            wordFlowWorkList: []
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

    function getWorkFLowByType(type: string): WorkFlowHttp | WorkFlowSql | undefined {
        // if (!workFlow.value) return undefined;
        // const workFlowItem = workFlow.value.wordFlowWorkList.find(item => item.workFlowType === type);
        // if (workFlowItem) {
        //     return workFlowItem as WorkFlowHttp | WorkFlowSql;
        // }
        return undefined;
    }
    return { workFlowList, workFlow, addWorkFlow, setNowWorkFlow, setWorkFlowType };
})