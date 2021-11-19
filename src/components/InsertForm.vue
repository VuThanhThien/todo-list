<template>
  <div class="main">
    <!-- title -->
    <input type="text" placeholder="Add new task..." class="form-title input mb-2">
    <!-- description -->
    <label class="label" for="description">Description</label>
    <textarea name="description" class="description text-area" rows="10"></textarea>
    <!-- date and prio -->
    <div class="d-flex gap-2">
      <div class="due-date-block">
        <label class="label" for="description">Due Date</label>
        <input type="date" name="due-date" class="input">
      </div>
      <div class="priority-block">
        <label class="label" for="description">Priority</label>
        <select class="select priority-select" name="priority" >
          <option v-for="i in priorityOptions" :key="i.value" :value="i.value">{{i.title}}</option>
        </select>
      </div>
    </div>
    <!-- slot button -->
    <button class="btn btn-green mt-20">
    <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "InsertForm",
  data(){
    return{
      priorityOptions:[
        {value: 1, title: "low"},
        {value: 2, title: "normal"},
        {value: 3, title: "high"},
      ]
    }
  }
};
</script>

<style scoped lang="scss">
.main{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.description{
  resize: vertical;
}
.input {
  height: 40px;
}
.due-date-block, .priority-block{
  display: flex;
  flex-direction: column;
  width: 50%;
}
.priority-select{
  height: 52px;
  padding: 5px 10px 5px 10px;
}
.mt-20{
  margin-top: 20px;
}
</style>
