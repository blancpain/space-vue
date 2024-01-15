<template>
  <div class="quote">
    <p class="quote-text">
      {{ quoteText }}
    </p>
    <p class="quote-author">— The Space View Team</p>
  </div>
</template>

<style scoped>
.quote {
  text-align: center;
  margin-bottom: 20px;
}

.quote-text {
  font-style: italic;
  font-size: 1.2em;
  color: #555;
}

.quote-author {
  margin-top: 5px;
  font-size: 1em;
  color: #888;
}
</style>

<script setup lang="ts">
defineProps({
  quoteText: {
    type: String,
    required: true
  }
});
</script>
