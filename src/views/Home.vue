<template>
  <div class="container">
    <div class="new-tab-side">
      <InsertForm> Add </InsertForm>
    </div>
    <div class="list-work-side">
      <input
        type="text"
        placeholder="Search..."
        class="input-search input mb-2"
        v-model="searchQuery"
      />
      <!-- #region list work -->
      <div v-for="item in resultQuery" :key="item.id" >
        <div class="work-element-wrapper">
          <div class="work-element" :class="{'bottom-none' : onClickDetail == item.id }">
            <input type="checkbox" v-model="listSelectedID" :value="item.id"/>
            <div class="title-work">{{ item.title }}</div>
            <button
              class="btn btn-cyan"
              @click="onClickDetail = (onClickDetail == item.id ? null: item.id)"
            >
              Detail
            </button>
            <button class="btn btn-red" @click="onClickRemove(item.id)">Remove</button>
          </div>
          <InsertForm v-if="onClickDetail == item.id" :workDetail="item">
            Update
          </InsertForm>
        </div>
      </div>
      <!-- #endregion list work -->
      <!-- #region bulk action -->
      <div class="work-element-wrapper fixed" v-if="this.listSelectedID.length > 0">
        <div class="work-element">
          <div class="title-work text-left">Bulk Action:</div>
          <button class="btn btn-cyan">
            Done
          </button>
          <button class="btn btn-red" @click="onClickRemoveMultiTask">Remove</button>
        </div>
      </div>
      <!-- #endregion bulk action -->
    </div>
  </div>
</template>
<script>
import InsertForm from "@/components/InsertForm.vue";
import { mapActions } from "vuex";
import { listWork } from "../../public/mock-list.js";
export default {
  name: "Home",
  components: { InsertForm },
  data() {
    return {
      listWork: [],
      onClickDetail: null,
      searchQuery: null,
      listSelectedID: [],
    };
  },
  methods: {
    ...mapActions(["loadWork"]),
    onClickRemove(id){
      let index = this.listWork.findIndex((x) => x.id === id);
      this.listWork.splice(index, 1);
      this.loadWork(this.listWork);
    },
    onClickRemoveMultiTask(){
      this.listSelectedID.forEach(element => {
        let index = this.listWork.findIndex((x) => x.id === element);
        if(index > -1){
          this.listWork.splice(index, 1);
        }
      });
      this.clearSelectedID();
      this.loadWork(this.listWork);
    },
    clearSelectedID(){
      this.listSelectedID = [];
    }
  },
  computed:{
    resultQuery(){
      if(this.searchQuery){
      return this.listWork.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
      })
      }else{
        return this.listWork;
      }
    }
  },
  watch: {
    listWork: function () {
      for (let i = 0; i < this.listSelectedID.length; i++) {
        const element = this.listSelectedID[i];
        let index = this.listWork.findIndex((x) => x.id === element);
        if(index < 0){
          this.listSelectedID.splice(i, 1);
        }
      }
    }
  },
  created() {
    /**Lấy từ local storage ra, nếu không có thì gán mặc định mảng bằng giá trị fix tự tạo */
    let list = JSON.parse(localStorage.getItem("listWork")) ;
    if (!!list) {
      this.listWork = list;
    } else {
      this.listWork = listWork;
    }
    if (this.listWork) {
      let payload = this.listWork;
      this.loadWork(payload);
    }
  },
};
</script>
<style lang="scss" scoped>
.container {
  height: auto;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  border: solid 1px #e4e4e4;
  .new-tab-side,
  .list-work-side {
    width: 50%;
    padding: 30px 30px 100px 30px;
  }
}
.input {
  height: 40px;
  width: 100%;
}
.input-search{
  margin-top: 20px;
}
.input-search:focus {
  border: solid 1px #b7ffcd;
  outline: none;
  height: 40px;
}
.work-element-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.work-element {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #fff;
  padding: 20px;
  border: solid 1px #7e7e7e;
  background-color: #e8e8e8;
}
.title-work {
  flex: 1;
  height: auto;
}
input[type="checkbox" i] {
  height: 20px;
  width: 20px;
}
.text-left{
  text-align: left;
}
.fixed{
  position: fixed;
  bottom: 0;
  right: 0;
}
.bottom-none{
  border-bottom: none;
}
@media screen and (max-width: 992px) {
  .container {
    display: flex;
    flex-direction: column;
  }
  .new-tab-side,
  .list-work-side {
    width: auto !important;
  }
}
</style>