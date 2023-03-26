import { defineStore } from "pinia";

export const useWarehouseStore = defineStore("warehouses-store", {
  state: () => {
    return {
      warehouses: useLocalStorage("warehouses", []),
      deals: useLocalStorage("deals", { total: 0 }),
      liked: useLocalStorage("liked", {}),
      search: useLocalStorage("search", ""),
      show: useLocalStorage("show", ""),

      // warehouses: [],
      // deals: {
      //   total: 0,
      // },
      // liked: {},
      // search: "",
      // show: "",
    };
  },
  getters: {
    item() {
      return (id) => this.warehouses.find((warehouse) => warehouse.id === id);
    },

    likedWarehouses() {
      return this.warehouses.filter((warehouse) => this.liked[warehouse.id]);
    },

    filteredListWarehouses() {
      return this.warehouses.filter((item) => {
        if (this.show || this.search) {
          if (this.show && this.search) {
            return (
              item.type === this.show &&
              item.name.toLowerCase().includes(this.search.toLowerCase())
            );
          }
          if (this.show) {
            return item.type === this.show;
          }
          if (this.search) {
            return item.name.toLowerCase().includes(this.search.toLowerCase());
          }
        }
        return true;
      });
    },

    filteredListDeals() {
      return this.warehouses.filter((item) => {
        if (this.deals[item.id] === undefined) {
          return false;
        }
        if (this.show || this.search) {
          if (this.show && this.search) {
            return (
              item.type === this.show &&
              item.name.toLowerCase().includes(this.search.toLowerCase())
            );
          }
          if (this.show) {
            return item.type === this.show;
          }
          if (this.search) {
            return item.name.toLowerCase().includes(this.search.toLowerCase());
          }
        }
        return true;
      });
    },

    filteredListFavourites() {
      return this.likedWarehouses.filter((item) => {
        if (this.show || this.search) {
          if (this.show && this.search) {
            return (
              item.type === this.show &&
              item.name.toLowerCase().includes(this.search.toLowerCase())
            );
          }
          if (this.show) {
            return item.type === this.show;
          }
          if (this.search) {
            return item.name.toLowerCase().includes(this.search.toLowerCase());
          }
        }
        return true;
      });
    },
  },

  actions: {
    async fetchWarehouse() {
      this.warehouses = await fetch("/api/warehouses").then((res) =>
        res.json()
      );
    },

    async setShow(show) {
      this.show = show;
    },

    async addToDeals(warehouse) {
      const item = this.deals[warehouse.id];

      if (item) {
        item.quantity++;
        item.price = (item.quantity * item.price) / (item.quantity - 1);
      } else {
        this.deals[warehouse.id] = {
          quantity: 1,
          price: parseFloat(warehouse.cost.replace(" ", "")),
        };
      }

      this.deals.total++;
    },

    async toggleLiked(id, force) {
      this.liked[id] = force === undefined ? !this.liked[id] : force;
    },
  },
});
