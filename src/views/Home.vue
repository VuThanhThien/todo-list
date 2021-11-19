<template>
  <div class="main">
    <div class="new-tab-side">
      <InsertForm>
        Add
    </InsertForm>
    </div>
    <div class="list-work-side">
      <List/>
    </div>
  </div>
</template>
<script>
import InsertForm from "@/components/InsertForm.vue"
import List from "@/components/ListWork.vue"
export default {
  name: "Home",
  components: {InsertForm, List },
};
</script>
<style lang="scss" scoped>
.main{
  height: auto;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  border: solid 1px #e4e4e4;
  background-color: #e4e4e4;
  .new-tab-side, .list-work-side{
    width: 50%;
    padding: 30px;
    
  }
}
</style>