<template>
  <div class="content">
    <van-search
      v-model="keyWord"
      class="searchBox"
      placeholder="请输入姓名"
      show-action
      @search="onSearch"
    >
      <template #action>
        <div
          class="search-box"
          style="color: #1a73e8; display: inline-block"
          @click="onSearch"
        >
          搜索
        </div>
        <div
          class="sync-box"
          style="margin-left: 10px; color: #1a73e8; display: inline-block"
          @click="onSync"
        >
          同步
        </div>
      </template>
    </van-search>
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
          <th>姓名</th>
          <th>状态</th>
          <th>更新时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="personList == null || personList == undefined || personList == ''  ">
            <td colspan="3">无数据</td>
        </tr>
        <tr v-for="(item, i) in personList" :key="i" @click="getPersonRecordist(item)">
          <td>{{ item.personName }}</td>
          <!-- <td >
            <div v-if="item.latelyEventLog  && item.latelyEventLog.factoryState == '离厂'" style="color:red;">{{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}</div>
            <div v-if="item.latelyEventLog  && item.latelyEventLog.factoryState == '在厂'" style="color:green;" >{{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}</div>
            <div v-if="item.latelyEventLog  && item.latelyEventLog.factoryState == '超时'" style="color:orange;">{{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}</div>
          </td>  -->
          <td style="text-align: left">
            <div
              v-if="
                item.latelyEventLog &&
                item.latelyEventLog.factoryState == '离厂'
              "
              class="yuan-red"
            ></div>
            <div
              v-if="
                item.latelyEventLog &&
                item.latelyEventLog.factoryState == '在厂'
              "
              class="yuan-green"
            ></div>
            <div
              v-if="
                item.latelyEventLog &&
                item.latelyEventLog.factoryState == '超时'
              "
              class="yuan-orange"
            ></div>
            <div
              v-if="
                item.latelyEventLog &&
                item.latelyEventLog.factoryState == '无记录'
              "
              class="yuan-grey"
            ></div>
            {{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}
          </td>
          <td>
            {{ item.latelyEventLog ? item.latelyEventLog.receiveTime : "" }}
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
    <el-table :data='personList' style='width: 100%'>
      <el-table-column prop='personName' label='姓名' > </el-table-column>
      <el-table-column prop='latelyEventLog.factoryState' label='状态' > </el-table-column>
      <el-table-column prop='updateTime' label='更新时间' > </el-table-column>
    </el-table> -->
    <van-overlay :show="showLoading" >
      <div class="wrapper">
        <van-loading v-model="showLoading" vertical type="spinner" color="#fff" style="margin-top: 400px;" />
      </div>
  </van-overlay>
    <van-dialog
      v-model="showDialog"
      title="历史记录"
      confirmButtonText="关闭"
      confirmButtonColor="#1a73e8"
      style="padding: 10px;"
    >
      <div style="margin-top: 10px;">
        <span>姓名：</span>
        <span>{{personRecord.personName}}</span>
      </div>

      <table border="1" cellpadding="1" cellspacing="0" style="margin-top: 10px;">
        <thead>
          <tr class="tableHead">
            <th>状态</th>
            <th>更新时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="personRecordList == null || personRecordList == undefined || personRecordList == ''  ">
            <td colspan="2">无数据</td>
          </tr>
          <tr v-for="(item, i) in personRecordList" :key="i">
            <!-- <td >
            <div v-if="item.latelyEventLog  && item.latelyEventLog.factoryState == '离厂'" style="color:red;">{{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}</div>
            <div v-if="item.latelyEventLog  && item.latelyEventLog.factoryState == '在厂'" style="color:green;" >{{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}</div>
            <div v-if="item.latelyEventLog  && item.latelyEventLog.factoryState == '超时'" style="color:orange;">{{ item.latelyEventLog ? item.latelyEventLog.factoryState : "" }}</div>
          </td>  -->
            <td style="text-align: left">
              <div
                v-if="
                  item &&
                  item.factoryState == '离厂'
                "
                class="yuan-red"
              ></div>
              <div
                v-if="
                  item &&
                  item.factoryState == '在厂'
                "
                class="yuan-green"
              ></div>
              <div
                v-if="
                  item &&
                  item.factoryState == '超时'
                "
                class="yuan-orange"
              ></div>
              <div
                v-if="
                  item &&
                  item.factoryState == '无记录'
                "
                class="yuan-grey"
              ></div>
              {{ item.factoryState ? item.factoryState : "" }}
            </td>
            <td>
              {{ item.receiveTime ? item.receiveTime : "" }}
            </td>
          </tr>
        </tbody>
      </table>
    </van-dialog>
  </div>
</template>
<script>
import { listActivity, syncEvents, getPersonRecordList } from '@/api/person'
export default {
  name: 'Person',
  data () {
    return {
      showLoading: true,
      showDialog: false,
      personList: [],
      personRecord: [],
      personRecordList: [],
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
      listActivity({ personName: this.keyWord }).then((res) => {
        this.personList = res.data.data
        this.showLoading = false
      }).catch((e) => {
        console.log('e------->', e)
        // 危险通知
        this.$notify({ type: 'danger', message: '查询失败' })
        this.showLoading = false
      })
    },
    onSync () {
      this.showLoading = true
      syncEvents().then((res) => {
        window.location.reload()
        // this.showLoading = false
      }).catch((e) => {
        console.log('e------->', e)
        // 危险通知
        this.$notify({ type: 'danger', message: '同步失败' })
        this.showLoading = false
      })
    },
    onLoad () {
      this.showLoading = true
      listActivity().then((res) => {
        this.personList = res.data.data
        this.showLoading = false
      }).catch((e) => {
        console.log('e------->', e)
        // 危险通知
        this.$notify({ type: 'danger', message: '查询失败' })
        this.showLoading = false
      })
      // listActivity().then((res) => {
      //   if (this.refreshing) {
      //     this.personList = []
      //     this.refreshing = true
      //   }
      //   this.personList.push(res.data.data)
      //   this.loading = false
      // })
    },
    getPersonRecordist (item) {
      this.showLoading = true
      this.showDialog = false
      this.personRecord = {
        latelyTwoEventLogList: []
      }
      getPersonRecordList(item.personId).then((res) => {
        this.personRecord = res.data.data
        this.personRecordList = this.personRecord.latelyTwoEventLogList
        console.log('this.personRecordList------->', this.personRecordList)
        this.showLoading = false
        this.showDialog = true
      }).catch((e) => {
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
.van-search__action:active {
  background-color: #fff;
}
.search-box:active {
  background-color: #dcdee0;
}
.sync-box:active {
  background-color: #dcdee0;
}
.tableHead {
  height: 40px;
  width: 100%;
  line-height: 40px;
  border: 1px solid #dcdee0;
  background-color: #eee;
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
