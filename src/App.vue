<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900 relative">

    <header
      class="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50 h-16 transition-all duration-300"
      :class="{ 'shadow-sm': scrolled }">
      <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

        <div class="flex items-center gap-4">
          <button @click="showMobileFilters = true"
            class="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Menu :size="24" />
          </button>

          <div class="flex items-center gap-2 cursor-pointer group" @click="handleLogoClick">
            <div class="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Store :size="20" class="text-white" />
            </div>
            <h1 class="text-xl font-extrabold tracking-tight text-gray-900">
              TechShop<span class="text-indigo-600">.pro</span>
            </h1>
          </div>
        </div>

        <button @click="isCartOpen = true"
          class="relative p-2 hover:bg-indigo-50 rounded-full transition-all duration-200 group">
          <ShoppingCart :size="24" class="text-gray-600 group-hover:text-indigo-600 transition-colors" />

          <Transition name="bounce">
            <span v-if="cart.length > 0" :key="cart.length"
              class="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
              {{ cart.length }}
            </span>
          </Transition>
        </button>
      </div>
    </header>

    <div class="max-w-7xl mx-auto pt-24 pb-12 px-4 flex flex-col lg:flex-row gap-8">

      <aside
        class="fixed inset-0 z-40 lg:z-0 lg:static lg:block lg:w-64 flex-shrink-0 transition-transform duration-300 lg:translate-x-0 bg-white/90 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none"
        :class="showMobileFilters ? 'translate-x-0' : '-translate-x-full'">
        <div class="flex lg:hidden justify-between items-center p-4 border-b border-gray-200 bg-white">
          <span class="font-bold text-lg">Filtros</span>
          <button @click="showMobileFilters = false" class="p-2 bg-gray-100 rounded-full">
            <X :size="20" />
          </button>
        </div>

        <div class="h-full overflow-y-auto p-4 lg:p-0 lg:overflow-visible lg:sticky lg:top-24 scrollbar-hide">
          <ProductFilter v-model:searchQuery="filters.search" v-model:selectedCategory="filters.category"
            v-model:maxPrice="filters.maxPrice" v-model:minRating="filters.minRating" :categories="uniqueCategories"
            @reset="resetFilters" />
        </div>
      </aside>

      <div v-if="showMobileFilters" @click="showMobileFilters = false"
        class="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"></div>

      <main class="flex-1 min-w-0">

        <Transition name="fade-scale" mode="out-in">
          <div v-if="selectedProduct" class="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <button @click="selectedProduct = null"
              class="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">
              <ArrowLeft :size="16" /> Volver a la colección
            </button>

            <ProductDetail :product="selectedProduct" @add-to-cart="addToCart" />
          </div>

          <div v-else>
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
              <div>
                <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Explora</h2>
                <p class="text-sm text-gray-500 mt-1 font-medium">
                  Mostrando <span class="text-indigo-600 font-bold">{{ sortedProducts.length }}</span> productos
                </p>
              </div>

              <div class="relative group">
                <ArrowUpDown :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select v-model="sortBy"
                  class="pl-10 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm cursor-pointer appearance-none hover:border-gray-300 transition-colors">
                  <option value="default">Relevancia</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="rating-desc">Mejor Valorados</option>
                </select>
              </div>
            </div>

            <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="n in 6" :key="n"
                class="bg-white rounded-2xl h-[340px] shadow-sm border border-gray-100 p-4 animate-pulse flex flex-col">
                <div class="bg-gray-200 h-48 rounded-xl mb-4 w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2 mb-auto"></div>
                <div class="h-10 bg-gray-200 rounded-lg w-full mt-4"></div>
              </div>
            </div>

            <ProductList v-else :products="sortedProducts" @add-to-cart="addToCart" @clear-filters="resetFilters"
              @view-detail="showProductDetail" />
          </div>
        </Transition>
      </main>
    </div>

    <CartSidebar :isOpen="isCartOpen" :cartItems="cart" @close="isCartOpen = false" @remove="removeFromCart" />

    <Transition name="toast">
      <div v-if="toast.visible"
        class="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl z-[60] flex items-center gap-4 max-w-sm">
        <div class="bg-green-500 rounded-full p-1">
          <Check :size="14" stroke-width="4" class="text-white" />
        </div>
        <div>
          <h4 class="font-bold text-sm">¡Producto añadido!</h4>
          <p class="text-xs text-gray-300 mt-0.5 line-clamp-1">{{ toast.message }}</p>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { Store, ShoppingCart, Menu, X, ArrowUpDown, Check, ArrowLeft } from 'lucide-vue-next';

// Importación de componentes
import ProductFilter from './components/ProductFilter.vue';
import ProductList from './components/ProductList.vue';
import CartSidebar from './components/CartSidebar.vue';
import ProductDetail from './components/ProductDetail.vue'; // <--- NUEVO COMPONENTE
import { getProducts } from './mocks/products';

// --- ESTADO ---
const products = ref([]);
const cart = ref([]);
const isCartOpen = ref(false);
const isLoading = ref(true);
const showMobileFilters = ref(false);
const scrolled = ref(false);
const sortBy = ref('default');
const selectedProduct = ref(null); // <--- NUEVO ESTADO PARA EL DETALLE

// Estado para el Toast
const toast = reactive({
  visible: false,
  message: ''
});

// Estado de Filtros
const filters = reactive({
  search: '',
  category: '',
  maxPrice: 2000,
  minRating: 0
});

// --- PERSISTENCIA & CICLO DE VIDA ---
onMounted(async () => {
  window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 10 });
  const savedCart = localStorage.getItem('techshop_cart');
  if (savedCart) { cart.value = JSON.parse(savedCart); }
  try {
    const data = await getProducts();
    products.value = data;
  } catch (e) { console.error(e); }
  finally { isLoading.value = false; }
});

watch(cart, (newCart) => {
  localStorage.setItem('techshop_cart', JSON.stringify(newCart));
}, { deep: true });

// --- COMPUTADOS ---
const uniqueCategories = computed(() => [...new Set(products.value.map(p => p.category))]);

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchSearch = product.nombre.toLowerCase().includes(filters.search.toLowerCase());
    const matchCategory = filters.category === '' || product.category === filters.category;
    const matchPrice = product.precio <= filters.maxPrice;
    const matchRating = (product.rating || 0) >= filters.minRating;
    return matchSearch && matchCategory && matchPrice && matchRating;
  });
});

const sortedProducts = computed(() => {
  const items = [...filteredProducts.value];
  switch (sortBy.value) {
    case 'price-asc':
      return items.sort((a, b) => a.precio - b.precio);
    case 'price-desc':
      return items.sort((a, b) => b.precio - a.precio);
    case 'rating-desc':
      return items.sort((a, b) => b.rating - a.rating);
    default:
      return items;
  }
});

// --- MÉTODOS ---

// NUEVO MÉTODO: Mostrar el detalle de un producto
const showProductDetail = (product) => {
  selectedProduct.value = product;
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll al inicio
};

// NUEVO MÉTODO: Manejar clic en el logo
const handleLogoClick = () => {
  selectedProduct.value = null; // Cerrar vista de detalle
  resetFilters();              // Resetear filtros
};

const addToCart = (product) => {
  cart.value.push(product);
  showToast(product.nombre);
};

const removeFromCart = (index) => {
  cart.value.splice(index, 1);
};

const resetFilters = () => {
  filters.search = '';
  filters.category = '';
  filters.maxPrice = 2000;
  filters.minRating = 0;
  sortBy.value = 'default';
};

// Sistema de Toast simple
let toastTimeout;
const showToast = (productName) => {
  toast.message = productName;
  toast.visible = true;

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.visible = false;
  }, 3000);
};
</script>

<style>
/* Animación de Entrada/Salida de la vista de Detalle */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

/* Animación del Badge del carrito */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}

/* Animación del Toast */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

/* Ocultar scrollbar en sidebar sticky pero permitir scroll */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>