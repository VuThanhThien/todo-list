<template>
  <div class="form-body">
    <!-- title -->
    <input
      type="text"
      placeholder="Add new task..."
      class="form-title input mb-2"
      v-model="tempObject.title"
    />
    <!-- description -->
    <label class="label" for="description">Description</label>
    <textarea
      name="description"
      class="description text-area"
      rows="10"
      v-model="tempObject.description"
    ></textarea>
    <!-- date and prio -->
    <div class="d-flex gap-2">
      <div class="due-date-block">
        <label class="label" for="description">Due Date</label>
        <input
          type="date"
          name="due-date"
          class="input"
          pattern="\d{4}-\d{2}-\d{2}"
          v-model="tempObject.dueDate"
        />
      </div>
      <div class="priority-block">
        <label class="label" for="description">Priority</label>
        <select
          class="select priority-select"
          name="priority"
          v-model="tempObject.prioriry"
        >
          <option v-for="i in priorityOptions" :key="i.value" :value="i.value">
            {{ i.title }}
          </option>
        </select>
      </div>
    </div>
    <!-- slot button -->
    <button class="btn btn-green mt-20" @click="onSubmitForm">
      <slot></slot>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "InsertForm",
  data() {
    return {
      priorityOptions: [
        { value: 1, title: "low" },
        { value: 2, title: "normal" },
        { value: 3, title: "high" },
      ],
      tempObject: {
        title: "",
        description: "",
        dueDate: "",
        prioriry: 0,
      },
    };
  },
  props: ["workDetail"],
  computed: {
    ...mapGetters(["listWork"]),
    editMode() {
      // co data workdetail thi la mode sua
      if (!!this.workDetail) {
        return 1;
      } else {
        // khong thi la mode them moi
        return 0;
      }
    },
  },
  methods: {
    ...mapActions(["loadWork"]),
    /**Hàm submit */
    onSubmitForm() {
      if (this.validate() == 1) {
        //Nếu là mode thêm mới 
        //Thì tạo id mới, thêm vào mảng
        if (this.editMode == 0) {
          this.tempObject.id = this.makeid(8);
          this.listWork.push(this.tempObject);
          this.loadWork(this.listWork);
          this.tempObject = {};
        } else {
          // call api update this object
          let index = this.listWork.findIndex((x) => x.id === this.tempObject.id);
          this.listWork[index] = this.tempObject;
          this.loadWork(this.listWork);
        }
      };
    },
    validate(){
      if(!this.tempObject.title){
        alert("title is required !!");
        return 0;
      }
      return 1;
    }
  },
  mounted() {
    if (this.editMode) {
      this.tempObject = this.workDetail;
    }
  },
};
</script>

<style scoped lang="scss">
.form-body {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: solid 1px #7e7e7e;
  background-color: #e8e8e8;
}
.description {
  resize: vertical;
}
.input {
  height: 40px;
}
.due-date-block,
.priority-block {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.priority-select {
  height: 52px;
  padding: 5px 10px 5px 10px;
}
.mt-20 {
  margin-top: 20px;
}
</style>
