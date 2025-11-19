<template>
    <div class="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden flex flex-col h-full relative cursor-pointer"
        @click="$emit('view-detail', product)">

        <div v-if="product.isNew"
            class="absolute top-3 right-3 z-10 bg-indigo-600 text-white text-[10px] font-extrabold px-2 py-1 rounded uppercase tracking-wide shadow-md">
            Nuevo
        </div>

        <div v-if="product.stock === 0"
            class="absolute inset-0 bg-white/60 z-20 flex items-center justify-center backdrop-blur-[1px]">
            <span
                class="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-widest shadow-xl transform -rotate-12 border-2 border-white">
                Agotado
            </span>
        </div>

        <div class="relative h-56 overflow-hidden bg-gray-100">
            <img :src="product.image" :alt="product.nombre" loading="lazy"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                :class="{ 'grayscale opacity-70': product.stock === 0 }" />
            <span
                class="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full shadow-sm text-gray-800 border border-gray-100">
                {{ product.category }}
            </span>
        </div>

        <div class="p-5 flex flex-col flex-grow">
            <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{{ product.brand }}</span>

            <h3
                class="text-lg font-bold text-gray-800 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
                {{ product.nombre }}
            </h3>

            <div class="flex items-center gap-1 mb-3">
                <Star v-for="i in 5" :key="i" :size="14" class="fill-current"
                    :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-200'" />
                <span class="text-xs text-gray-400 ml-1">({{ Math.floor(Math.random() * 100) + 10 }})</span>
            </div>

            <p class="text-sm text-gray-500 mb-4 line-clamp-2 mt-auto">
                {{ product.description }}
            </p>

            <div class="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <div class="flex flex-col">
                    <div v-if="product.originalPrice" class="flex items-center gap-2">
                        <span class="text-xs text-gray-400 line-through decoration-red-400 decoration-2">${{
                            product.originalPrice }}</span>
                        <span class="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 rounded">-{{
                            calculateDiscount(product.precio, product.originalPrice) }}%</span>
                    </div>
                    <span class="text-xl font-extrabold text-gray-900">${{ product.precio }}</span>
                </div>

                <button @click.stop="$emit('add-to-cart', product)" :disabled="product.stock === 0"
                    class="p-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2" :class="product.stock === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-gray-900 text-white hover:bg-indigo-600 active:scale-95 shadow-indigo-500/20'">
                    <Plus :size="18" stroke-width="3" />
                    <span class="text-sm font-bold pr-1">Agregar</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Plus, Star } from 'lucide-vue-next';

defineProps({
    product: {
        type: Object,
        required: true
    }
});

// Se añade 'view-detail' a los eventos que este componente emite.
defineEmits(['add-to-cart', 'view-detail']);

// Función simple para calcular % descuento
const calculateDiscount = (price, original) => {
    return Math.round(((original - price) / original) * 100);
};
</script>