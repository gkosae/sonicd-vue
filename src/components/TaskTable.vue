<template>
  <el-container>
    <el-header>
      <div class="flex-container">
        <h1>Tasks</h1>

        <el-button
          id="load-tasks"
          @click="loadTasks"
          :disabled="reloading"
          :icon="reloading ? 'el-icon-loading' : 'el-icon-refresh'"
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
        <el-table-column
          min-width="200"
          prop="title"
          label="Title"
        ></el-table-column>
        <el-table-column min-width="200" prop="url" label="Url">
          <template slot-scope="scope">
            <el-link :href="scope.row.url" type="primary" target="_blank">{{
              scope.row.url
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          min-width="200"
          prop="destination"
          label="Destination"
        ></el-table-column>
        <el-table-column min-width="200" prop="added" label="Added">
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
  data() {
    return {
      reloading: false,
      loadingTasks: false,
      tasks: [],
    };
  },
  methods: {
    loadTasks() {
      console.log("Loading Tasks");
      this.reloading = true;

      this.loadTasksSilently()
        .catch((err) =>
          this.$notify({
            title: "Error loading tasks",
            message: err,
          })
        )
        .finally(() => (this.reloading = false));
    },
    loadTasksSilently() {
      console.log("Loading tasks silently");
      return new Promise((resolve, reject) => {
        if (this.loadingTasks) return;
        this.loadingTasks = true;

        api
          .fetchTasks()
          .then((tasks) => {
            // const taskIds = this.tasks.map((task) => task.id);
            // tasks = tasks.filter((task) => !taskIds.includes(task.id));
            // this.tasks.unshift(...tasks);
            this.tasks = tasks;
            resolve(tasks);
          })
          .catch((err) => reject(err))
          .finally(() => (this.loadingTasks = false));
      });
    },
  },
  mounted() {
    this.loadTasks();

    setInterval(
      function () {
        this.loadTasksSilently();
      }.bind(this),
      30000
    );
  },
  created() {
    EventBus.$on("TASK_CREATED", (task) => {
      this.tasks.unshift(task);
    });
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