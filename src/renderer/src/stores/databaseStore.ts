import { EnumDatabase } from "@renderer/enums/enumDatabase";
import { Database } from "@renderer/interfaces/database";
import { defineStore } from "pinia";
import { ref } from "vue";

// 定义布局的 Pinia store（水平布局/垂直布局）
export const databaseStore = defineStore("databaseStore", () => {
    // 默认是水平布局
    const databaseList = ref<Database[]>([
        {
            databaseId: '1',
            databaseName: '本地MySql',
            databaseType: EnumDatabase.MYSQL,
            datebaseHost: 'localhost',
            databasePort: 3306,
            databaseUser: 'mysql',
            databasePassword: '123456'
        }
    ]);
    const database = ref<Database>();

    function addDatabase(db: Database): void {
        const dbIndex = databaseList.value.findIndex(item => item.databaseId === db.databaseId);

        if (dbIndex === -1) {
            databaseList.value.push(db);
        } else {
            databaseList.value[dbIndex] = db;
        }
    }
    function setNowApiTable(dbId: string): void {
        const db = databaseList.value.find(item => item.databaseId === dbId)
        if (db) {
            database.value = db;
        }
    }
    function deleteDatabase(dbId: string): void {
        databaseList.value = databaseList.value.filter(item => item.databaseId !== dbId);
        if (database.value?.databaseId === dbId) {
            database.value = undefined;
        }
    }
    return { databaseList, database, addDatabase, setNowApiTable, deleteDatabase };
});
