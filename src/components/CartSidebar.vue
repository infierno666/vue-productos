<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm" @click="$emit('close')"></div>

    <div class="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col"
        :class="isOpen ? 'translate-x-0' : 'translate-x-full'">

        <div class="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <ShoppingBag :size="20" /> Tu Carrito
            </h2>
            <button @click="$emit('close')" class="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X :size="24" />
            </button>
        </div>

        <div class="flex-1 overflow-y-auto p-5 space-y-4">
            <div v-if="cartItems.length === 0" class="text-center py-10 text-gray-500">
                <ShoppingCart :size="48" class="mx-auto mb-3 opacity-30" />
                <p>Tu carrito está vacío</p>
            </div>

            <div v-else v-for="(item, index) in cartItems" :key="index"
                class="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                <img :src="item.image" class="w-16 h-16 object-cover rounded-md" />
                <div class="flex-1">
                    <h4 class="font-semibold text-sm text-gray-800 line-clamp-1">{{ item.nombre }}</h4>
                    <p class="text-indigo-600 font-bold mt-1">${{ item.precio }}</p>
                </div>
                <button @click="$emit('remove', index)" class="text-gray-400 hover:text-red-500 self-start">
                    <Trash2 :size="18" />
                </button>
            </div>
        </div>

        <div class="p-5 border-t border-gray-100 bg-gray-50">
            <div class="flex justify-between mb-4 text-lg font-bold text-gray-900">
                <span>Total:</span>
                <span>${{ total.toFixed(2) }}</span>
            </div>
            <button
                class="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30">
                Proceder al Pago
            </button>
        </div>

    </div>
</template>

<script setup>
import { computed } from 'vue';
import { X, Trash2, ShoppingBag, ShoppingCart } from 'lucide-vue-next';

const props = defineProps({
    isOpen: Boolean,
    cartItems: Array
});

defineEmits(['close', 'remove']);

const total = computed(() => {
    return props.cartItems.reduce((sum, item) => sum + item.precio, 0);
});
</script>