<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="23">
          <h1>Recent</h1>
        </el-col>
        <el-col id="button-column" :span="1">
          <el-button
            id="load-tasks"
            @click="loadTasks"
            :disabled="loading"
            :icon="loading ? 'el-icon-loading' : 'el-icon-refresh'"
            circle
          ></el-button>
        </el-col>
      </el-row>
      <h1>Recent</h1>
    </el-header>
    <el-main>
      <el-table class="table" :data="tableData" style="width: 100%; padding: 20px;">
        <el-table-column prop="title" label="Title"></el-table-column>
        <el-table-column prop="url" label="Url">
          <template slot-scope="scope">
            <el-link :href="scope.row.url" type="primary" target="_blank">{{scope.row.url}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="destination" label="Destination"></el-table-column>
        <el-table-column prop="added" label="Added">
          <template slot-scope="scope">{{moment(scope.row.added).format('MMMM Do YYYY, h:mm:ss a')}}</template>
        </el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="scope">
            <el-tag effect="dark" :type="scope.row.status | elTagType">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import api from "@/api";
import EventBus from "@/services/eventBus";

export default {
  name: "TaskTable",
  methods: {
    loadTasks() {
      this.loading = true;
      api
        .fetchTasks()
        .then((tasks) => {
          this.tasks = tasks;
        })
        .catch((err) =>
          this.$notify({
            title: "Error loading tasks",
            message: err,
          })
        )
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    console.log(process.env);
    this.loadTasks();
  },
  created() {
    EventBus.$on("TASK_CREATED", () => {
      this.loadTasks();
    });
  },
  filters: {
    elTagType(status) {
      switch (status) {
        case "completed":
          return "success";
        case "in_progress":
          return "warning";
        case "failed":
          return "danger";
        default:
          return "";
      }
    },
  },
  data() {
    return {
      loading: false,
      tasks: [],
    };
  },
  computed: {
    tableData() {
      let data = this.tasks.map((task) => {
        return {
          title: task.title,
          status: task.status,
          url: task.url,
          destination: task.destination_directory,
          added: task.created_at,
        };
      });

      return data;
    },
  },
};
</script>

<style scoped>
.button-column {
  text-align: right;
}

#load-tasks {
  margin-top: 12px;
}

.table {
  padding: 10px !important;
}
</style>