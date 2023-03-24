<script setup>
import { useWarehouseStore } from "@/stores/index.js";
const warehouseStore = useWarehouseStore();
</script>

<template>
  <div v-if="warehouseStore.likedWarehouses.length > 0">
    <div>
      <TransitionGroup name="list">
        <WarehouseCard
          v-for="warehouse in warehouseStore.filteredListFavourites"
          :key="warehouse.id"
          :warehouse="warehouse"
        />
      </TransitionGroup>
    </div>
  </div>

  <section v-else>
    <p class="info-sent">У вас еще нет ни одной любимой позиции!</p>
  </section>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.info-sent {
  padding: 10px;
  font-size: 13px;
}
</style>
