<template>
  <el-form :inline="true" :model="task" class="form-container">
    <div class="flex-container">
      <div id="url-input-wrapper" class="form-item-wrapper">
        <el-input
          id="url-input"
          class="form-item"
          v-model="task.url"
          placeholder="Paste URL Here"
        ></el-input>
      </div>
      <div id="destination-input-wrapper" class="form-item-wrapper">
        <el-autocomplete
          id="destination-input"
          class="form-item"
          v-model="task.destination"
          :fetch-suggestions="querySearch"
          placeholder="Destination"
          @select="handleSelect"
        ></el-autocomplete>
      </div>
      <div id="import-button-wrapper" class="form-item-wrapper">
        <el-button
          id="import-button"
          type="primary"
          class="form-item"
          @click="createTask"
          :disabled="importing"
        >
          Import
          <i :class="importing ? 'el-icon-loading' : 'el-icon-download'"></i>
        </el-button>
      </div>
    </div>
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
        .then((task) => {
          this.$notify({
            title: "IMPORTING",
          });

          EventBus.$emit("TASK_CREATED", task);
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
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
}

.form-item-wrapper {
  margin: 10px;
}

.form-item-wrapper,
.form-item {
  width: calc(100% - 10px);
}

@media only screen and (min-width: 600px) {
  .flex-container {
    max-width: 1000px;
    margin: auto;
    flex-direction: row;
    align-items: center;
    justify-items: flex-end;
  }

  #url-input-wrapper,
  #destination-input-wrapper {
    flex-grow: 4;
    flex-shrink: 1;
  }

  #import-button-wrapper {
    flex-grow: 0;
    width: 300px;
  }
}
</style>