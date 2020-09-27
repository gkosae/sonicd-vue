<template>
  <el-tag effect="dark" :type="tag.type" class="circle">
    <i :class="tag.icon"></i>
  </el-tag>
</template>

<script>
export default {
  name: "TaskTableStatusTag",
  props: ["status"],
  data() {
    return {
      tags: {
        queued: {
          type: "info",
          icon: "el-icon-info",
        },

        in_progress: {
          type: "warning",
          icon: "el-icon-loading",
        },

        completed: {
          type: "success",
          icon: "el-icon-check",
        },

        failed: {
          type: "danger",
          icon: "el-icon-minus",
        },
      },
    };
  },
  computed: {
    tag() {
      return this.tags[this.status];
    },
  },
};
</script>

<style>
.circle {
  border-radius: 100% !important;
}
</style>