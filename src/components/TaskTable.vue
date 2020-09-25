<template>
  <el-container>
    <el-header>
      <div class="flex-container">
        <h1>Recent</h1>

        <el-button
          id="load-tasks"
          @click="loadTasks"
          :disabled="loading"
          :icon="loading ? 'el-icon-loading' : 'el-icon-refresh'"
          circle
        ></el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        class="table"
        :data="tableData"
        style="width: 100%; padding: 20px"
      >
        <el-table-column width="70" prop="status" label>
          <template slot-scope="scope">
            <TaskTableStatusTag :status="scope.row.status"></TaskTableStatusTag>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Title"></el-table-column>
        <el-table-column prop="url" label="Url">
          <template slot-scope="scope">
            <el-link :href="scope.row.url" type="primary" target="_blank">{{
              scope.row.url
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="destination"
          label="Destination"
        ></el-table-column>
        <el-table-column prop="added" label="Added">
          <template slot-scope="scope">{{
            moment(scope.row.added).format("YYYY-MM-D HH:mm:ss")
          }}</template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import api from "@/api";
import EventBus from "@/services/eventBus";
import TaskTableStatusTag from "@/components/TaskTableStatusTag";

export default {
  name: "TaskTable",
  components: { TaskTableStatusTag },
  methods: {
    loadTasks() {
      if (this.loading) {
        return;
      }

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
    this.loadTasks();

    setInterval(
      function () {
        this.loadTasks();
      }.bind(this),
      30000
    );
  },
  created() {
    EventBus.$on("TASK_CREATED", () => this.loadTasks());
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

.flex-container {
  display: flex;
  justify-content: space-between;
}

#load-tasks {
  margin: 15px 0;
}

.table {
  padding: 10px !important;
}
</style>