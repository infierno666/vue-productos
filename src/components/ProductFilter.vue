<template>
    <div class="space-y-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">

        <div class="pb-6 border-b border-gray-100 mb-6">
            <div class="relative group">
                <Search
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors"
                    :size="20" />
                <input :value="searchQuery" @input="$emit('update:searchQuery', $event.target.value)" type="text"
                    placeholder="Buscar producto..."
                    class="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400 font-medium" />
                <button v-if="searchQuery" @click="$emit('update:searchQuery', '')"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-0.5 transition-colors">
                    <X :size="16" />
                </button>
            </div>
        </div>

        <div class="border-b border-gray-100 pb-6 mb-6">
            <button @click="toggleSection('category')"
                class="flex justify-between items-center w-full mb-4 text-left group">
                <h3
                    class="text-sm font-bold text-gray-900 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">
                    Categoría
                </h3>
                <ChevronDown :size="18" class="text-gray-400 transition-transform duration-300"
                    :class="{ 'rotate-180': !sections.category }" />
            </button>

            <Transition name="slide">
                <div v-show="sections.category" class="space-y-1">
                    <label
                        class="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group"
                        :class="selectedCategory === '' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-600'">
                        <div class="flex items-center gap-3">
                            <div class="w-4 h-4 rounded-full border flex items-center justify-center transition-colors"
                                :class="selectedCategory === '' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 group-hover:border-indigo-400'">
                                <div v-if="selectedCategory === ''" class="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                            <span class="text-sm font-medium">Todas</span>
                        </div>
                        <input type="radio" name="category" value="" :checked="selectedCategory === ''"
                            @change="$emit('update:selectedCategory', '')" class="hidden" />
                    </label>

                    <label v-for="cat in categories" :key="cat"
                        class="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group"
                        :class="selectedCategory === cat ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-600'">
                        <div class="flex items-center gap-3">
                            <div class="w-4 h-4 rounded-full border flex items-center justify-center transition-colors"
                                :class="selectedCategory === cat ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 group-hover:border-indigo-400'">
                                <div v-if="selectedCategory === cat" class="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                            <span class="text-sm font-medium">{{ cat }}</span>
                        </div>
                        <input type="radio" name="category" :value="cat" :checked="selectedCategory === cat"
                            @change="$emit('update:selectedCategory', cat)" class="hidden" />
                    </label>
                </div>
            </Transition>
        </div>

        <div class="border-b border-gray-100 pb-6 mb-6">
            <button @click="toggleSection('price')"
                class="flex justify-between items-center w-full mb-4 text-left group">
                <h3
                    class="text-sm font-bold text-gray-900 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">
                    Rango de Precio</h3>
                <ChevronDown :size="18" class="text-gray-400 transition-transform duration-300"
                    :class="{ 'rotate-180': !sections.price }" />
            </button>

            <Transition name="slide">
                <div v-show="sections.price">
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">$0</span>
                        <span
                            class="text-sm font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
                            ${{ maxPrice }}
                        </span>
                    </div>
                    <div class="relative h-6 flex items-center">
                        <input type="range" min="0" max="2000" step="50" :value="maxPrice"
                            @input="$emit('update:maxPrice', Number($event.target.value))"
                            class="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 z-10" />
                        <div class="absolute h-2 bg-indigo-600 rounded-l-lg pointer-events-none"
                            :style="{ width: (maxPrice / 2000) * 100 + '%' }"></div>
                    </div>
                </div>
            </Transition>
        </div>

        <div class="mb-8">
            <button @click="toggleSection('rating')"
                class="flex justify-between items-center w-full mb-4 text-left group">
                <h3
                    class="text-sm font-bold text-gray-900 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">
                    Valoración</h3>
                <ChevronDown :size="18" class="text-gray-400 transition-transform duration-300"
                    :class="{ 'rotate-180': !sections.rating }" />
            </button>

            <Transition name="slide">
                <div v-show="sections.rating" class="space-y-1">
                    <button v-for="star in [5, 4, 3, 2, 1]" :key="star"
                        @click="$emit('update:minRating', star === minRating ? 0 : star)"
                        class="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group"
                        :class="minRating === star ? 'bg-indigo-50 ring-1 ring-indigo-200' : 'hover:bg-gray-50'">
                        <div class="flex items-center gap-2">
                            <div class="flex text-yellow-400">
                                <Star v-for="n in 5" :key="n" :size="16"
                                    :class="n <= star ? 'fill-current' : 'text-gray-300'" class="drop-shadow-sm" />
                            </div>
                            <span class="text-xs font-medium text-gray-500 group-hover:text-gray-700">& más</span>
                        </div>
                        <div v-if="minRating === star" class="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    </button>
                </div>
            </Transition>
        </div>

        <button @click="$emit('reset')"
            class="w-full py-3 text-sm font-semibold text-gray-600 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all flex items-center justify-center gap-2 group shadow-sm">
            <RotateCcw :size="16" class="group-hover:-rotate-180 transition-transform duration-500" />
            Limpiar Filtros
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Search, Star, X, ChevronDown, RotateCcw } from "lucide-vue-next";

defineProps({
    searchQuery: String,
    selectedCategory: String,
    categories: Array,
    maxPrice: Number,
    minRating: Number,
});

defineEmits([
    "update:searchQuery",
    "update:selectedCategory",
    "update:maxPrice",
    "update:minRating",
    "reset",
]);

// Estado local para manejar los acordeones
const sections = ref({
    category: true,
    price: true,
    rating: true
});

const toggleSection = (section) => {
    sections.value[section] = !sections.value[section];
};
</script>

<style scoped>
/* Animación suave para los acordeones */
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease-out;
    max-height: 500px;
    /* Un valor seguro más alto que el contenido */
    opacity: 1;
    overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
    max-height: 0;
    opacity: 0;
    margin-bottom: 0;
    padding-bottom: 0;
}

/* Personalización del Range Slider */
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #4f46e5;
    /* Indigo 600 */
    cursor: pointer;
    margin-top: -6px;
    box-shadow: 0 2px 6px rgba(79, 70, 229, 0.4);
    border: 2px solid white;
}

input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: #e5e7eb;
    /* Gray 200 */
    border-radius: 4px;
}
</style>