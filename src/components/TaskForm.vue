<template>
  <el-form :inline="true" :model="task" class="form-container">
    <div class="flex-container">
      <div id="url-input-wrapper" class="form-item-wrapper">
        <el-input
          id="url-input"
          class="form-item"
          v-model="task.url"
          :clearable="true"
          placeholder="Paste URL Here"
        ></el-input>
      </div>
      <div id="destination-input-wrapper" class="form-item-wrapper">
        <el-autocomplete
          id="destination-input"
          class="form-item"
          v-model="task.destination"
          :fetch-suggestions="querySearch"
          :clearable="true"
          placeholder="Destination"
        ></el-autocomplete>
      </div>
      <div id="import-button-wrapper" class="form-item-wrapper">
        <el-button
          id="import-button"
          type="primary"
          class="form-item"
          @click="addTask"
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TaskForm",
  data() {
    return {
      task: {
        url: "",
        destination: "",
      },
      importing: false,
    };
  },
  computed: { ...mapGetters(["allDestinations"]) },
  methods: {
    ...mapActions(["fetchDestinations", "createTask"]),
    querySearch(queryString, cb) {
      let results = this.filterDestinations(queryString).map((dest) => {
        return { value: dest };
      });

      // call callback function to return suggestions
      cb(results);
    },
    filterDestinations(queryString) {
      let results = queryString
        ? this.allDestinations.filter((destination) => {
            return (
              destination.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
          })
        : this.allDestinations;

      return results;
    },
    addTask() {
      this.importing = true;

      this.createTask(this.task)
        .then(() => {
          this.$notify({
            title: "IMPORTING",
          });
        })
        .catch((err) =>
          this.$notify({
            title: "Error importing",
            message: err,
          })
        )
        .finally(() => (this.importing = false));
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
