/* 
 * Script.js - Shared Logic 
 * Features: Product Data (Expanded), Filters, Mobile Menu, Carousel, Chatbot, Lenis
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            touchMultiplier: 2,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // 2. Data (Expanded as requested "All Products")
    // Categories: Signage, Enclosures, Industrial, Furniture
    const products = [
        // Signage
        { id: 1, category: "signage", name: "Digital Standee", image: "https://images.unsplash.com/photo-1517502886367-e06291a96f20?auto=format&fit=crop&q=80&w=600", desc: "Slim 55-inch floor standing display." },
        { id: 2, category: "signage", name: "Outdoor Kiosk (IP65)", image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&q=80&w=600", desc: "Weatherproof rugged enclosure for public areas." },
        { id: 3, category: "signage", name: "Wayfinding Totem", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600", desc: "Directional signage with backlit branding." },
        
        // Enclosures
        { id: 4, category: "enclosures", name: "Video Wall Mount", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600", desc: "Precision alignment system for 2x2, 3x3 walls." },
        { id: 5, category: "enclosures", name: "Touch Kiosk Body", image: "https://images.unsplash.com/photo-1531297461136-82lw9b44d940?auto=format&fit=crop&q=80&w=600", desc: "Ergonomic angled console for touchscreens." },
        { id: 6, category: "enclosures", name: "POS Enclosure", image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=600", desc: "Secure countertop tablet/POS housing." },
        
        // Industrial
        { id: 7, category: "industrial", name: "Server Rack (42U)", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600", desc: "Heavy-duty perforated door server cabinet." },
        { id: 8, category: "industrial", name: "Electrical Panel", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600", desc: "IP55/IP65 control panel enclosures." },
        
        // Furniture
        { id: 9, category: "furniture", name: "Interactive Table", image: "https://images.unsplash.com/photo-1600508774662-ba360ed21997?auto=format&fit=crop&q=80&w=600", desc: "Multi-touch collaborative workspace table." },
        { id: 10, category: "furniture", name: "Metal Console", image: "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&q=80&w=600", desc: "Minimalist industrial style console table." }
    ];

    // 3. Render Carousel (Home)
    const track = document.getElementById('carouselTrack');
    if (track) {
        products.slice(0, 6).forEach(p => {
            const card = document.createElement('div');
            card.className = 'carousel-card card';
            card.onclick = () => window.location.href = `contact.html?product=${encodeURIComponent(p.name)}`;
            card.innerHTML = `
                <div class="card-img" style="height: 240px; overflow: hidden; display:flex; align-items:center; justify-content:center; background:#f1f5f9;">
                     <img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div style="padding: 1.5rem;">
                    <div class="badge" style="margin-bottom:0.5rem; font-size: 0.75rem;">${p.category}</div>
                    <h4 style="margin-bottom: 0.5rem; font-size: 1.2rem;">${p.name}</h4>
                </div>
            `;
            track.appendChild(card);
        });

        // Carousel Logic
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const container = document.querySelector('.carousel-container');
        if (prevBtn && nextBtn && container) {
            prevBtn.addEventListener('click', () => container.scrollBy({ left: -350, behavior: 'smooth' }));
            nextBtn.addEventListener('click', () => container.scrollBy({ left: 350, behavior: 'smooth' }));
        }
    }

    // 4. Render Grid with Filters (Products Page)
    const grid = document.getElementById('productGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (grid) {
        // Initial Render (All)
        renderGrid(products);

        // Filter Click Handling
        if (filterBtns.length > 0) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update Active State
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Filter Data
                    const category = btn.getAttribute('data-filter');
                    const filtered = category === 'all' 
                        ? products 
                        : products.filter(p => p.category === category);
                    
                    // Re-render
                    renderGrid(filtered);
                });
            });
        }
    }

    function renderGrid(data) {
        grid.innerHTML = '';
        /* Improved Grid Layout - CSS handles columns */
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        grid.style.gap = '2rem';

        data.forEach(p => {
            const card = document.createElement('div');
            card.className = 'card animate-fade-up'; // Add animation class if CSS supports it
            card.onclick = () => window.location.href = `contact.html?product=${encodeURIComponent(p.name)}`;
            card.innerHTML = `
                <div class="card-img" style="height: 280px; overflow: hidden; display:flex; align-items:center; justify-content:center; background:#f8fafc; border-bottom: 1px solid var(--border);">
                     <img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div style="padding: 2rem;">
                    <div class="flex justify-between items-center" style="margin-bottom: 0.5rem;">
                        <span style="font-size: 0.8rem; text-transform:uppercase; color:var(--muted); font-weight:600;">${p.category}</span>
                    </div>
                    <h3 style="margin-bottom: 0.75rem; font-size: 1.4rem;">${p.name}</h3>
                    <p class="text-muted" style="margin-bottom: 1.5rem; font-size: 1rem;">${p.desc}</p>
                    <button class="btn btn-outline w-full">Request Quote</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // 5. Mobile Menu
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if (btn && menu) {
        btn.onclick = () => menu.classList.toggle('active');
    }

    // 6. Contact Form Pre-fill
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');
    const textarea = document.querySelector('textarea');
    if (product && textarea) {
        textarea.value = `I am interested in getting a quote for: ${product}.`;
    }
});

function openWhatsApp() {
    window.open(`https://wa.me/919899763247?text=Hi, I visited your website and need a quote.`, '_blank');
}
