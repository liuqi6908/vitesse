<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em text-sm opacity-75>
        固执己见的 Vite 项目模板
      </em>
    </p>
    <q-btn color="primary">
      111
    </q-btn>
    <div py-4 />
    固执己见的 Vite 项目模板
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
