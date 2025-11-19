<template>
    <div class="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

        <div class="flex flex-col lg:flex-row gap-12">

            <div class="lg:w-1/2 flex-shrink-0 relative">
                <div class="h-[400px] sm:h-[550px] overflow-hidden rounded-xl bg-gray-50 shadow-md">
                    <img :src="product.image" :alt="product.nombre" class="w-full h-full object-cover" />
                </div>

                <div class="absolute top-4 left-4 flex gap-2">
                    <span v-if="product.isNew"
                        class="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-full shadow-md">
                        Nuevo
                    </span>
                    <span v-if="product.stock === 0"
                        class="bg-red-600 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-full shadow-md">
                        Agotado
                    </span>
                </div>
            </div>

            <div class="lg:w-1/2 flex flex-col pt-4">

                <p class="text-sm font-medium text-gray-400 mb-1">
                    {{ product.category }} / <span class="text-indigo-600 font-bold">{{ product.brand || 'Marca'
                        }}</span>
                </p>

                <h1 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                    {{ product.nombre }}
                </h1>

                <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div class="flex items-center gap-1">
                        <Star v-for="n in 5" :key="n" :size="20"
                            :class="n <= product.rating ? 'fill-current text-yellow-500' : 'text-gray-200'" />
                    </div>
                    <span class="text-sm font-semibold text-gray-700">{{ product.rating.toFixed(1) }}</span>
                    <span class="text-sm text-gray-400">({{ (product.reviewsCount || Math.floor(Math.random() * 200) +
                        50) }}
                        reseñas)</span>
                </div>

                <div class="mb-8 flex items-center gap-4">
                    <span class="text-4xl font-extrabold text-gray-900">${{ product.precio.toFixed(2) }}</span>
                    <span v-if="product.originalPrice" class="text-xl text-gray-400 line-through">${{
                        product.originalPrice.toFixed(2) }}</span>
                </div>

                <p class="text-gray-600 mb-8 leading-relaxed text-base">
                    {{ product.description }}
                </p>

                <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm mb-10 border-t border-b border-gray-100 py-6">

                    <div class="flex flex-col gap-1 text-gray-700">
                        <Tag :size="18" class="text-indigo-600" />
                        <span class="font-bold">Categoría</span>
                        <span class="text-gray-500">{{ product.category }}</span>
                    </div>

                    <div class="flex flex-col gap-1 text-gray-700">
                        <ShieldCheck :size="18" class="text-indigo-600" />
                        <span class="font-bold">Marca</span>
                        <span class="text-gray-500">{{ product.brand || 'No especificada' }}</span>
                    </div>

                    <div class="flex flex-col gap-1 text-gray-700">
                        <Package :size="18" :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'" />
                        <span class="font-bold">Stock</span>
                        <span class="text-gray-500" :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
                            {{ product.stock > 0 ? `${product.stock} unidades` : 'Agotado' }}
                        </span>
                    </div>

                </div>

                <div class="mt-auto">
                    <button @click.stop="$emit('add-to-cart', product)" :disabled="product.stock === 0"
                        class="w-full py-4 bg-gray-900 text-white text-lg font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl transform hover:scale-[1.005] hover:bg-indigo-600 disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <span v-if="product.stock > 0">Añadir al Carrito</span>
                        <span v-else>Producto Agotado</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Star, ShieldCheck, Package, Tag } from "lucide-vue-next";

defineProps({
    product: {
        type: Object,
        required: true
    }
});
defineEmits(['add-to-cart']);
</script>