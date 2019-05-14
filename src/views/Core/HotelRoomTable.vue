<template>
    <div style="height: auto">
        <!--表格栏-->
        <el-table :data="data.rows" ref="table" :highlight-current-row="highlightCurrentRow" @row-click="selectRow"
                  @current-change="handleCurrentChange" v-loading="loading" :element-loading-text="$t('action.loading')"
                  :border="border" :stripe="stripe"
                  :show-overflow-tooltip="showOverflowTooltip" :size="size" :align="align"
                  style="width:100%;">
            <el-table-column :label="$t('action.operation')" width="55">
                <template slot-scope="scope">
                    <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column width="100" prop="hotelCode" header-align="center" align="center" :label="$t('hotel.hotelCode')">
            </el-table-column>
            <el-table-column width="120" prop="provinceCode" header-align="center" align="center"
                             :label="$t('hotel.provinceCode.provinceCode')">
                <template slot-scope="scope">
                    <el-tag>{{$t('hotel.'+scope.row.provinceCodeKey)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column width="120" prop="cityCode" header-align="center" align="center"
                             :label="$t('hotel.cityCode.cityCode')">
                <template slot-scope="scope">
                    <el-tag>{{$t('hotel.'+scope.row.cityCodeKey)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column width="200" :prop="language.lge=='zh_cn'?'hotelCname':'hotelEname'" header-align="center"
                             align="center" :label="$t('hotel.hotelname')">
            </el-table-column>
            <el-table-column width="120" prop="hotelType" header-align="center" align="center"
                             :label="$t('hotel.hotelType.hotelType')">
                <template slot-scope="scope">
                    <el-table-column>{{$t('hotel.'+scope.row.hotelTypeKey)}}</el-table-column>
                </template>
            </el-table-column>

            <el-table-column width="100" prop="roomTypeKey" header-align="center" align="center"
                             :label="$t('hotel.roomtype.roomtype')">
                <template slot-scope="scope">
                    <el-tag>{{$t('hotel.'+scope.row.roomTypeKey)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column width="100" prop="bedTypeKey" header-align="center" align="center"
                             :label="$t('hotel.bedtype.bedtype')">
                <template slot-scope="scope">
                    <el-tag>{{$t('hotel.'+scope.row.bedTypeKey)}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column min-width="100" prop="breakType" header-align="center" align="center"
                             :label="$t('hotel.breaktype.breaktype')">
                <template slot-scope="scope">
                    <el-tag>{{$t('hotel.'+scope.row.breakTypeKey)}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column width="80" prop="sPrice" header-align="center" align="center" :label="$t('table.sSprice')"/>

        </el-table>
        <!--分页栏-->
        <div class="toolbar" style="padding:10px;">
            <kt-button icon="fa fa-edit" type="danger" :label="$t('hotel.reservatRoom')" style="float:left;padding: 10px 20px" :perms="permsReservatRoom" :size="size"
                       :disabled="this.radio===''" @click="handleBookRoom(currentRow)" />
            <el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"
                           :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="data.total"
                           style="float:right;">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import KtButton from "@/views/Core/KtButton"

    export default {

        name: 'RoomTable',
        components: {
            KtButton
        },
        props: {
            columns: Array, // 表格列配置
            data: Object, // 表格分页数据
            permsReservatRoom: String,  // 编辑权限标识
            permsDelete: String,  // 删除权限标识
            permsPriceEdit: String, //编辑权限标识
            permsStockEdit: String, //库存编辑权限标识
            size: { // 尺寸样式
                type: String,
                default: 'mini'
            },
            align: {  // 文本对齐方式
                type: String,
                default: 'center'
            },
            maxHeight: {  // 表格最大高度
                type: Number,
                default: 820
            },
            showOperation: {  // 是否显示操作组件
                type: Boolean,
                default: true
            },
            border: {  // 是否显示边框
                type: Boolean,
                default: false
            },
            stripe: {  // 是否显示斑马线
                type: Boolean,
                default: true
            },
            highlightCurrentRow: {  // // 是否高亮当前行
                type: Boolean,
                default: true
            },
            showOverflowTooltip: {  // 是否单行显示
                type: Boolean,
                default: true
            },
            showBatchDelete: {  // 是否显示操作组件
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                // 分页信息
                pageRequest: {
                    page: 1,
                    rows: 10
                },
                radio: '',
                loading: false,  // 加载标识
                selections: [],  // 列表选中列
                currentRow:{},
                language: {},
                show: false
            }
        },
        methods: {
            // 分页查询
            findPage: function () {
                this.loading = true
                let callback = res => {
                    this.loading = false;
                    this.radio = '';
                }
                this.$emit('findPage', {pageRequest: this.pageRequest, callback: callback})
            },
            // 选择切换
            selectionChange: function (selections) {
                if(selections.length>1){
                    this.$refs['table'].clearSelection();
                    this.$refs['table'].toggleRowSelection(selections.pop())
                }
                this.selections = selections;
                // this.$emit('selectionChange', {selections: selections})
            },
            selectRow: function(row){
                this.currentRow = row;
                this.radio = this.data.rows.indexOf(row);
            },
            getCurrentRow: function(row){
                this.currentRow = row;
                // this.$emit('handleBookRoom', row)
            },
            // 选择切换
            handleCurrentChange: function (val) {
                this.$emit('handleCurrentChange', {val: val})
            },
            handleBookRoom: function (row) {
                this.$emit('handleBookRoom', {val: row})
            },
            // 换页刷新
            refreshPageRequest: function (pageNum) {
                // this.pageRequest.pageNum = pageNum
                this.pageRequest.page = pageNum

                this.findPage()
            },

            localLanguageLoad: function () {
                this.language = {lge: this.$i18n.locale}
            },

        },
        watch:{
            data: function (val) {
                console.log(val)
            }
        },
        mounted() {
            this.refreshPageRequest(1)
            this.localLanguageLoad()
        }
    }
</script>

<style>
    thead .el-table-column--selection .cell {
        display: none;
    }
</style>
