<template>
    <div class="relative min-h-[300px]">

        <TransitionGroup name="list" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            <ProductCard v-for="product in products" :key="product.id" :product="product"
                @add-to-cart="$emit('add-to-cart', $event)" @view-detail="$emit('view-detail', $event)" />
        </TransitionGroup>

        <Transition name="fade">
            <div v-if="products.length === 0"
                class="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <div class="bg-gray-50 p-6 rounded-full mb-4 animate-bounce-slow">
                    <PackageOpen :size="48" class="text-gray-400" />
                </div>

                <h3 class="text-xl font-bold text-gray-900 mb-2">
                    No encontramos productos
                </h3>

                <p class="text-gray-500 max-w-xs mx-auto mb-6">
                    Parece que no hay coincidencias con tus filtros actuales. Intenta ser menos específico.
                </p>

                <button @click="$emit('clear-filters')"
                    class="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 hover:bg-indigo-50 px-5 py-2.5 rounded-xl transition-all">
                    <RefreshCcw :size="18" />
                    Limpiar búsqueda y filtros
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import ProductCard from "./ProductCard.vue";
import { PackageOpen, RefreshCcw } from "lucide-vue-next";

defineProps({
    products: {
        type: Array,
        required: true,
    },
});

// Se añade 'view-detail' a los eventos que este componente emite.
defineEmits(['add-to-cart', 'clear-filters', 'view-detail']); 
</script>

<style scoped>
/* 1. Elementos entrando y saliendo */
.list-enter-active,
.list-leave-active {
    transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
}

/* 2. MAGIC MOVE: Esto hace que los items se deslicen cuando otros desaparecen */
.list-move {
    transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 3. Posición absoluta para salida suave */
.list-leave-active {
    position: absolute;
    width: 100%;
    z-index: -1;
}

/* Animación extra para el icono del empty state */
@keyframes bounce-slow {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.animate-bounce-slow {
    animation: bounce-slow 3s infinite ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>