<template>
  <div class="main">
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
      <div v-for="item in resultQuery" :key="item.id" >
        <div class="list-work-wrapper">
          <div class="work-element">
            <input type="checkbox" />
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
      a: null,
    };
  },
  methods: {
    ...mapActions(["loadWork"]),
    onClickRemove(id){
      let index = this.listWork.findIndex((x) => x.id === id);
      this.listWork.splice(index, 1);
      this.loadWork(this.listWork);
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
.main {
  height: auto;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  border: solid 1px #e4e4e4;
  .new-tab-side,
  .list-work-side {
    width: 50%;
    padding: 30px;
  }
}
.input {
  height: 40px;
  width: 100%;
}
.input-search:focus {
  border: solid 1px #b7ffcd;
  outline: none;
  height: 40px;
}
.list-work-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.input {
  height: 40px;
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
</style>