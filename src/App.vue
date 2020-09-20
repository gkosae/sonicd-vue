<template>
  <div id="app">
    <h1 class="banner">SonicD</h1>
    <TaskForm></TaskForm>
    <TaskTable></TaskTable>
  </div>
</template>

<script>
import TaskTable from "@/components/TaskTable";
import TaskForm from "@/components/TaskForm";

export default {
  name: "app",
  components: { TaskTable, TaskForm },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
}
.el-main {
  background: #eef1f4;
}

.banner {
  width: 100%;
  height: 150px;
  line-height: 150px;
  text-align: center;
  font-size: 70px;
  font-family: "Segoe UI";
  background: teal;
  color: white;
  margin: 0;
}
</style>
