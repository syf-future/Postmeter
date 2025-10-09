import { EnumDatabase } from "@renderer/enums/enumDatabase";

export interface Database {
    databaseId: string; // 唯一标识符
    databaseName: string;   // 数据库连接名称
    databaseType: EnumDatabase;
    datebaseHost: string; // 数据库连接地址
    databasePort: number; // 数据库连接端口
    databaseUser: string; // 数据库连接用户名
    databasePassword: string; // 数据库连接密码
}