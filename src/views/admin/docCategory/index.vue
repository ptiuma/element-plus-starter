<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
					<el-option key="1" label="广东省" value="广东省"></el-option>
					<el-option key="2" label="湖南省" value="湖南省"></el-option>
				</el-select>
				<el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="Plus" @click="addRecord">Добавить</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="name" label="用户名"></el-table-column>
				<el-table-column label="账户余额">
					<template #default="scope">￥{{ scope.row.money }}</template>
				</el-table-column>
				<el-table-column label="头像(查看大图)" align="center">
					<template #default="scope">
						<el-image
							class="table-td-thumb"
							:src="scope.row.thumb"
							:z-index="10"
							:preview-src-list="[scope.row.thumb]"
							preview-teleported
						>
						</el-image>
					</template>
				</el-table-column>
				<el-table-column prop="address" label="地址"></el-table-column>
				<el-table-column label="状态" align="center">
					<template #default="scope">
						<el-tag :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''">
							{{ scope.row.state }}
						</el-tag>
					</template>
				</el-table-column>

				<el-table-column prop="date" label="注册时间"></el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15"> 编辑 </el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="16"> 删除 </el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ElNotification } from "element-plus";
import { Delete, Edit, Search, Plus } from "@element-plus/icons-vue";
//import { getDocTypeApi } from "@api/modules/docType";
import http from "@/api";

const query = reactive({
	address: "",
	name: "",
	pageIndex: 1,
	pageSize: 10
});
const tableData = [
	{
		id: 1,
		name: "张三",
		money: 123,
		address: "广东省东莞市长安镇",
		state: "成功",
		date: "2019-11-1",
		thumb: "https://lin-xin.gitee.io/images/post/wms.png"
	},
	{
		id: 2,
		name: "李四",
		money: 456,
		address: "广东省广州市白云区",
		state: "成功",
		date: "2019-10-11",
		thumb: "https://lin-xin.gitee.io/images/post/node3.png"
	},
	{
		id: 3,
		name: "王五",
		money: 789,
		address: "湖南省长沙市",
		state: "失败",
		date: "2019-11-11",
		thumb: "https://lin-xin.gitee.io/images/post/parcel.png"
	},
	{
		id: 4,
		name: "赵六",
		money: 1011,
		address: "福建省厦门市鼓浪屿",
		state: "成功",
		date: "2019-10-20",
		thumb: "https://lin-xin.gitee.io/images/post/notice.png"
	}
];
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	http.get("http://127.0.0.1:8008/api/json").then(res => {
		console.log(res.data.list);
		pageTotal.value = res.data.pageTotal || 50;
	});
};
//getData();
// 查询操作
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};
// 删除操作
const handleDelete = (index: number) => {
	// 二次确认删除
	ElMessageBox.confirm("确定要删除吗？", "提示", {
		type: "warning"
	})
		.then(() => {
			ElMessage.success("删除成功");
			tableData.value.splice(index, 1);
		})
		.catch(() => {});
};
// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
	name: ""
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	form.name = row.name;
	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	tableData.value[idx].name = form.name;
};
const addRecord = () => {
	ElMessage.success(`add`);
	ElNotification({
		title: "rt",
		message: "Ошибка авторизации",
		type: "warning",
		duration: 3000
	});
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
