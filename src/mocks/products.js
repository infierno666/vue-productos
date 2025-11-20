// src/mocks/products.js

const data = [
    // --- ACCESORIOS Y WEARABLES ---
    {
        id: 4,
        nombre: "Mochila Herschel Little America",
        precio: 109.00,
        originalPrice: null,
        category: "Accesorios",
        brand: "Herschel",
        rating: 5,
        stock: 110,
        isNew: false,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
        description: "Un estilo montañero clásico con funcionalidad moderna para tu laptop."
    },
    {
        id: 15,
        nombre: "Ray-Ban Aviator Classic",
        precio: 163.00,
        originalPrice: null,
        category: "Accesorios",
        brand: "Ray-Ban",
        rating: 4,
        stock: 18,
        isNew: false,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
        description: "Lentes G-15 y montura dorada. El estilo que definió una era."
    },
    {
        id: 14,
        nombre: "Apple Watch Series 8",
        precio: 399.00,
        originalPrice: null,
        category: "Wearables",
        brand: "Apple",
        rating: 5,
        stock: 7,
        isNew: true,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
        description: "Sensores de salud avanzados y detección de accidentes. El compañero ideal."
    },

    // --- AUDIO ---
    {
        id: 1,
        nombre: "Sony WH-1000XM5 Noise Cancelling",
        precio: 348.00,
        originalPrice: 399.00,
        category: "Audio",
        brand: "Sony",
        rating: 5,
        stock: 15,
        isNew: false,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
        description: "Los mejores auriculares con cancelación de ruido del mercado. Batería de 30 horas."
    },
    {
        id: 7,
        nombre: "Apple AirPods Max",
        precio: 549.00,
        originalPrice: null,
        category: "Audio",
        brand: "Apple",
        rating: 4,
        stock: 8,
        isNew: false,
        image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=500&q=80",
        description: "Sonido de alta fidelidad con la corona digital para control preciso."
    },
    {
        id: 8,
        nombre: "Marshall Emberton II",
        precio: 169.00,
        originalPrice: 180.00,
        category: "Audio",
        brand: "Marshall",
        rating: 5,
        stock: 25,
        isNew: true,
        image: "https://microless.com/cdn/products/c1defdb32e77b11b18f1681250f04492-hi.jpg",
        description: "Altavoz portátil con sonido 360° y diseño icónico resistente al agua."
    },

    // --- CALZADO ---
    {
        id: 3,
        nombre: "Nike Air Max 90",
        precio: 129.99,
        originalPrice: 140.00,
        category: "Calzado",
        brand: "Nike",
        rating: 4,
        stock: 40,
        isNew: false,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        description: "Comodidad, herencia y nada mejor. El zapato del pueblo renovado."
    },
    {
        id: 11,
        nombre: "Adidas Ultraboost 22",
        precio: 180.00,
        originalPrice: null,
        category: "Calzado",
        brand: "Adidas",
        rating: 5,
        stock: 20,
        isNew: true,
        image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&q=80",
        description: "Retorno de energía increíble gracias a la tecnología Boost optimizada."
    },
    {
        id: 12,
        nombre: "Vans Old Skool Classic",
        precio: 65.00,
        originalPrice: 75.00,
        category: "Calzado",
        brand: "Vans",
        rating: 4,
        stock: 50,
        isNew: false,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80",
        description: "El clásico zapato de skate que nunca pasa de moda. Durabilidad garantizada."
    },

    // --- FOTOGRAFÍA ---
    {
        id: 6,
        nombre: "Fujifilm X-T30 II",
        precio: 899.00,
        originalPrice: 999.00,
        category: "Fotografía",
        brand: "Fujifilm",
        rating: 4,
        stock: 3,
        isNew: false,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
        description: "Cuerpo compacto, sensor de última generación y simulación de película clásica."
    },
    {
        id: 13,
        nombre: "GoPro HERO11 Black",
        precio: 399.00,
        originalPrice: 499.00,
        category: "Fotografía",
        brand: "GoPro",
        rating: 3,
        stock: 15,
        isNew: true,
        image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&q=80",
        description: "Estabilización HyperSmooth 5.0 y video cinematográfico 5.3K."
    },

    // --- GAMING Y PERIFÉRICOS ---
    {
        id: 17,
        nombre: "PlayStation 5 DualSense",
        precio: 69.99,
        originalPrice: 75.99,
        category: "Gaming",
        brand: "Sony",
        rating: 5,
        stock: 100,
        isNew: false,
        image: "https://images.unsplash.com/photo-1606318801954-d46d46d3360a?w=500&q=80",
        description: "Retroalimentación háptica inmersiva y gatillos adaptativos dinámicos."
    },
    {
        id: 18,
        nombre: "Nintendo Switch OLED",
        precio: 349.00,
        originalPrice: null,
        category: "Gaming",
        brand: "Nintendo",
        rating: 4,
        stock: 4,
        isNew: false,
        image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80",
        description: "Pantalla OLED de 7 pulgadas, soporte ancho ajustable y audio mejorado."
    },
    {
        id: 5,
        nombre: "Keychron K2 Mechanical",
        precio: 79.00,
        originalPrice: 89.00,
        category: "Periféricos",
        brand: "Keychron",
        rating: 4,
        stock: 22,
        isNew: false,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80",
        description: "Teclado mecánico inalámbrico compacto 75% con switches Gateron."
    },
    {
        id: 16,
        nombre: "Logitech MX Master 3S",
        precio: 99.00,
        originalPrice: null,
        category: "Periféricos",
        brand: "Logitech",
        rating: 5,
        stock: 30,
        isNew: true,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80",
        description: "El ratón de productividad definitivo con click silencioso y scroll electromagnético."
    },

    // --- LAPTOPS, TABLETS, ETC. ---
    {
        id: 2,
        nombre: "MacBook Air M2 Midnight",
        precio: 1199.00,
        originalPrice: 1299.00,
        category: "Laptops",
        brand: "Apple",
        rating: 5,
        stock: 5,
        isNew: false,
        image: "https://www.hoxtonmacs.co.uk/cdn/shop/files/apple-macbook-air-15-inch-macbook-air-15-inch-m2-midnight-2023-excellent-46809129124156.jpg?v=1717516752",
        description: "Diseño ultradelgado, pantalla Liquid Retina y toda la potencia del chip M2."
    },
    {
        id: 9,
        nombre: "Dell XPS 13 Plus",
        precio: 1450.00,
        originalPrice: null,
        category: "Laptops",
        brand: "Dell",
        rating: 4,
        stock: 0,
        isNew: false,
        image: "https://www.stuff.tv/wp-content/uploads/sites/2/2022/08/Dell-XPS-13-Plus-review-lead.jpg",
        description: "Minimalismo puro con barra táctil capacitiva y pantalla OLED 4K."
    },
    {
        id: 10,
        nombre: "iPad Pro 12.9 M2",
        precio: 1099.00,
        originalPrice: null,
        category: "Tablets",
        brand: "Apple",
        rating: 5,
        stock: 12,
        isNew: true,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
        description: "La experiencia definitiva en tablets. Pantalla XDR y soporte para Apple Pencil."
    },
];

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 800);
    });
};
