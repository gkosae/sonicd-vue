<template>
  <el-form :inline="true" :model="task" class="form-container">
    <el-form-item>
      <el-input v-model="task.url" placeholder="Paste URL Here"></el-input>
    </el-form-item>
    <el-form-item>
      <el-autocomplete
        class="inline-input"
        v-model="task.destination"
        :fetch-suggestions="querySearch"
        placeholder="Destination"
        @select="handleSelect"
      ></el-autocomplete>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="createTask" :disabled="importing">
        Import
        <i :class="importing ? 'el-icon-loading' : 'el-icon-download'"></i>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import api from "@/api";
import EventBus from "@/services/eventBus";

export default {
  name: "TaskForm",
  data() {
    return {
      task: {
        url: "",
        destination: "",
      },
      destinations: [],
      importing: false,
    };
  },
  methods: {
    querySearch(queryString, cb) {
      let destinations = this.destinations.map((dest) => {
        return { value: dest };
      });

      let results = queryString
        ? destinations.filter((destination) => {
            return (
              destination.value
                .toLowerCase()
                .indexOf(queryString.toLowerCase()) === 0
            );
          })
        : destinations;
      // call callback function to return suggestions
      cb(results);
    },
    createTask() {
      this.importing = true;

      api
        .createTask(this.task)
        .then(() => {
          this.$notify({
            title: "IMPORTING",
            // message: err,
          });

          EventBus.$emit("TASK_CREATED");
        })
        .catch((err) =>
          this.$notify({
            title: "Error importing",
            message: err,
          })
        )
        .finally(() => (this.importing = false));
    },
    fetchDestinations() {
      api
        .fetchDestinations()
        .then((destinations) => {
          this.destinations = destinations;
        })
        .catch((err) =>
          this.$notify({
            title: "Error fetching destinations",
            message: err,
          })
        );
    },
    handleSelect(item) {
      console.log(item);
    },
  },
  mounted() {
    this.fetchDestinations();
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>