<template>
    <div class="list-work-wrapper">
        <input type="text" placeholder="Search..." class="input-search input mb-2">
        <div class="work-element">
            <input type="checkbox" >
            <div class="title-work">aaaaaaa</div>
            <button class="btn btn-cyan">Detail</button>
            <button class="btn btn-red">Remove</button>
        </div>
    </div>
</template>

<script>
import { listWork } from "../../public/mock-list.js";
export default {
    name: "List",
    data(){
        return{
            listWork: listWork,
        }
    },
    created(){
        this.listWork = listWork;
    }
}
</script>

<style lang="scss" scoped>
.list-work-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .input-search:focus{
        border: solid 1px #b7ffcd;
        outline: none;
    }
}
.input {
    height: 40px;
}
.work-element{
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: #fff;
    padding: 20px;
}
.title-work{
    flex: 1;
    height: auto;
}
input[type="checkbox" i]{
    height: 20px;
    width: 20px;
}
</style>