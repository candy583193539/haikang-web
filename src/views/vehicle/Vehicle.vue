<template>
  <div class="content">
    <div>
      <van-search
        class="searchBox"
        v-model="keyWord"
        show-action
        placeholder="请输入车主姓名"
        @search="onSearch"
      >
        <template #action>
          <div
            @click="onSearch"
            class="search-box"
            style="color: #1a73e8; display: inline-block"
          >
            搜索
          </div>
          <div
            @click="onSync"
            class="sync-box"
            style="margin-left: 10px; color: #1a73e8; display: inline-block"
          >
            同步
          </div>
        </template>
      </van-search>
    </div>
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      > -->
    <table border="1" cellpadding="1" cellspacing="0">
      <thead>
        <tr class="tableHead">
          <th>车主姓名</th>
          <th>车牌号</th>
          <th>状态</th>
          <th>更新时间</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="
            vehicleList == null || vehicleList == undefined || vehicleList == ''
          "
        >
          <td colspan="4">无数据</td>
        </tr>

        <tr
          v-for="(item, i) in vehicleList"
          :key="i"
          @click="getVehicleRecordist(item)"
        >
          <td>
            {{
              item.personName == "" || item.personName == null
                ? item.mark == "" || item.mark == null
                  ? "无车主"
                  : item.mark
                : item.personName
            }}
          </td>
          <td>{{ item.plateNo }}</td>
          <!-- <td >
            <div v-if="item.latelyEventLog  && item.latelyEventLog.factoryState == '离厂'" style="color:red;">{{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}</div>
            <div v-if="item.latelyEventLog  && item.latelyEventLog.factoryState == '在厂'" style="color:green;" >{{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}</div>
            <div v-if="item.latelyEventLog  && item.latelyEventLog.factoryState == '超时'" style="color:orange;">{{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}</div>
          </td>  -->
          <td style="vertical-align: middle; text-align: left">
            <div
              v-if="
                item.latelyCrossRecordsLog &&
                item.latelyCrossRecordsLog.factoryState == '离厂'
              "
              class="yuan-red"
            ></div>
            <div
              v-if="
                item.latelyCrossRecordsLog &&
                item.latelyCrossRecordsLog.factoryState == '在厂'
              "
              class="yuan-green"
            ></div>
            <div
              v-if="
                item.latelyCrossRecordsLog &&
                item.latelyCrossRecordsLog.factoryState == '超时'
              "
              class="yuan-orange"
            ></div>
            <div
              v-if="
                item.latelyCrossRecordsLog &&
                item.latelyCrossRecordsLog.factoryState == '无记录'
              "
              class="yuan-grey"
            ></div>
            {{
              item.latelyCrossRecordsLog
                ? item.latelyCrossRecordsLog.factoryState
                : ""
            }}
          </td>
          <td>
            {{
              item.latelyCrossRecordsLog
                ? item.latelyCrossRecordsLog.crossTime
                : ""
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- </van-list>
    </van-pull-refresh> -->
    <!-- <el-form >
      <el-form-item class="search" prop="status" :inline="true">
        <el-input
          placeholder="请输入姓名"
          v-model="input"
          clearable>
            <template slot="append">   <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="test"
          v-preventReClick
          ></el-button
        ></template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table :data='vehicleList' style='width: 100%'>
      <el-table-column prop='vehicleName' label='姓名' > </el-table-column>
      <el-table-column prop='latelyEventLog.factoryState' label='状态' > </el-table-column>
      <el-table-column prop='updateTime' label='更新时间' > </el-table-column>
    </el-table> -->

    <van-overlay :show="showLoading">
      <div class="wrapper">
        <van-loading
          v-model="showLoading"
          vertical
          type="spinner"
          color="#fff"
          style="margin-top: 400px"
        />
      </div>
    </van-overlay>

    <van-dialog
      v-model="showDialog"
      title="历史记录"
      confirmButtonText="关闭"
      confirmButtonColor="#1a73e8"
      style="padding: 10px; padding-top: 10px"
    >
      <div style="margin-top: 10px">
        <span>姓名：</span>
        <span>{{ vehicleRecord.personName }}</span> &nbsp; | &nbsp;

        <span>车牌号：</span>
        <span>{{ vehicleRecord.plateNo }}</span>
      </div>

      <table
        border="1"
        cellpadding="1"
        cellspacing="0"
        style="margin-top: 10px"
      >
        <thead>
          <tr class="tableHead">
            <th>车牌号</th>
            <th>状态</th>
            <th>更新时间</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="
              vehicleRecord.latelyTwoCrossRecordsLogList == null ||
              vehicleRecord.latelyTwoCrossRecordsLogList == undefined ||
              vehicleRecord.latelyTwoCrossRecordsLogList == ''
            "
          >
            <td colspan="3">无数据</td>
          </tr>

          <tr
            v-for="(item, i) in vehicleRecord.latelyTwoCrossRecordsLogList"
            :key="i"
          >
            <td>{{ item.plateNo }}</td>
            <!-- <td >
            <div v-if="item.latelyEventLog  && item.latelyEventLog.factoryState == '离厂'" style="color:red;">{{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}</div>
            <div v-if="item.latelyEventLog  && item.latelyEventLog.factoryState == '在厂'" style="color:green;" >{{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}</div>
            <div v-if="item.latelyEventLog  && item.latelyEventLog.factoryState == '超时'" style="color:orange;">{{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}</div>
          </td>  -->
            <td style="vertical-align: middle; text-align: left">
              <div
                v-if="item && item.factoryState == '离厂'"
                class="yuan-red"
              ></div>
              <div
                v-if="item && item.factoryState == '在厂'"
                class="yuan-green"
              ></div>
              <div
                v-if="item && item.factoryState == '超时'"
                class="yuan-orange"
              ></div>
              <div
                v-if="item && item.factoryState == '无记录'"
                class="yuan-grey"
              ></div>
              {{ item.factoryState ? item.factoryState : "" }}
            </td>
            <td>{{ item ? item.crossTime : "" }}</td>
          </tr>
        </tbody>
      </table>
    </van-dialog>
  </div>
</template>
<script>
import {
  getVehicleList,
  syncCrossRecords,
  getVehicleRecordist
} from '@/api/vehicle'
export default {
  name: 'Car',
  data () {
    return {
      showLoading: true,
      showDialog: false,
      vehicleRecord: [],
      vehicleList: [],
      keyWord: '',
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  mounted () {
    this.onLoad()
  },
  methods: {
    onSearch () {
      this.showLoading = true
      getVehicleList({
        keyWord: this.keyWord,
        parkSyscode: '8c9b2dcd2263404cb295ebcb981d0285'
      })
        .then((res) => {
          console.log(res, '------>>>')
          this.vehicleList = res.data.data
          this.showLoading = false
        })
        .catch((e) => {
          console.log('e------->', e)
          // 危险通知
          this.$notify({ type: 'danger', message: '查询失败' })
          this.showLoading = false
        })
    },
    onSync () {
      this.showLoading = true
      console.log('test---')
      syncCrossRecords()
        .then((res) => {
          window.location.reload()
          // this.showLoading = false
        })
        .catch((e) => {
          console.log('e------->', e)
          // 危险通知
          this.$notify({ type: 'danger', message: '同步失败' })
          this.showLoading = false
        })
    },
    onLoad () {
      this.showLoading = true
      getVehicleList({
        keyWord: this.keyWord,
        parkSyscode: '8c9b2dcd2263404cb295ebcb981d0285'
      })
        .then((res) => {
          console.log(res, '------>>>')
          this.vehicleList = res.data.data
          this.showLoading = false
        })
        .catch((e) => {
          console.log('e------->', e)
          // 危险通知
          this.$notify({ type: 'danger', message: '查询失败' })
          this.showLoading = false
        })
      // getVehicleList().then((res) => {
      //   if (this.refreshing) {
      //     this.vehicleList = []
      //     this.refreshing = true
      //   }
      //   this.vehicleList.push(res.data.data)
      //   this.loading = false
      // })
    },
    getVehicleRecordist (item) {
      this.showLoading = true
      this.showDialog = false
      this.vehicleRecord = {
        latelyTwoEventLogList: []
      }
      getVehicleRecordist({ vehicleId: item.vehicleId, parkSyscode: '8c9b2dcd2263404cb295ebcb981d0285' })
        .then((res) => {
          this.vehicleRecord = res.data.data
          console.log('this.vehicleRecord------->', this.vehicleRecord)
          this.vehicleRecordList =
            this.vehicleRecord.latelyTwoCrossRecordsLogList
          console.log('this.vehicleRecordList------->', this.vehicleRecordList)
          this.showLoading = false
          this.showDialog = true
        })
        .catch((e) => {
          console.log('e------->', e)
          // 危险通知
          this.$notify({ type: 'danger', message: '查询失败' })
          this.showLoading = false
        })
    }
    // onRefresh() {
    //   // 清空列表数据
    //   this.finished = false

    //   // 重新加载数据
    //   // 将 loading 设置为 true，表示处于加载状态
    //   this.loading = true
    //   this.onLoad()
    // },
  }
}
</script>
<style scoped>
.content {
  margin-top: 49px;
  overflow: hidden;
  margin-bottom: 10px;
}
.search {
  margin-top: 60px;
}
table {
  text-align: center;
  width: 100%;
  margin-top: 60px;
}

table tr {
  height: 40px;
  line-height: 40px;
}
table td {
  border: 1px solid #dcdee0;
}
.searchBox {
  position: fixed;
  width: 100%;
}
.tableHead {
  height: 40px;
  width: 100%;
  line-height: 40px;
  border: 1px solid #dcdee0;
  background-color: #eee;
}
.van-search__action:active {
  background-color: #fff;
}
.search-box:active {
  background-color: #dcdee0;
}
.sync-box:active {
  background-color: #dcdee0;
}
.yuan-red {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: red;
  display: inline-block;
  text-align: left;
  margin-left: 5px;
}
.yuan-green {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: green;
  display: inline-block;
  text-align: left;
  margin-left: 5px;
}
.yuan-orange {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: orange;
  display: inline-block;
  text-align: left;
  margin-left: 5px;
}
.yuan-grey {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: grey;
  display: inline-block;
  text-align: left;
  margin-left: 5px;
}
</style>
