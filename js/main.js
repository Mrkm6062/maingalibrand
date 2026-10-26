function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                hamburger.textContent = '✕';
            } else {
                hamburger.textContent = '☰';
            }
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.textContent = '☰';
            }
        });
    }
}

function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-links a:not(.btn)');
    const currentPath = window.location.pathname;

    let bestMatch = null;
    let maxMatchLength = -1;

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (!linkPath) return;
        const cleanLinkPath = linkPath.endsWith('/index.html') ? linkPath.substring(0, linkPath.length - 10) : linkPath.replace('.html', '');
        
        if (currentPath === '/' && (cleanLinkPath === '' || cleanLinkPath === '/')) {
             bestMatch = link;
             return;
        }

        if (cleanLinkPath !== '' && currentPath.startsWith(cleanLinkPath)) {
            if (cleanLinkPath.length > maxMatchLength) {
                maxMatchLength = cleanLinkPath.length;
                bestMatch = link;
            }
        }
    });

    if (bestMatch) {
        bestMatch.classList.add('active');
        bestMatch.style.color = '#7CB342';
        bestMatch.style.backgroundColor = '#f1f8e9';
    }
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

async function loadPartials() {
    const headerPlaceholder = document.querySelector('header#header-placeholder');
    const footerPlaceholder = document.querySelector('footer#footer-placeholder');

    try {
        if (headerPlaceholder) {
            const response = await fetch('/header.html?v=4.0', { cache: 'no-cache' });
            if (response.ok) {
                headerPlaceholder.innerHTML = await response.text();
                initMobileMenu();
                setActiveNavLink();
            }
        }
        if (footerPlaceholder) {
            const response = await fetch('/footer.html?v=4.0', { cache: 'no-cache' });
            if (response.ok) {
                footerPlaceholder.innerHTML = await response.text();
                initBackToTop();
            }
        }
    } catch (error) {
        console.error('Error loading partials:', error);
    }
}

// Fallback plans data matching backend response format
const fallbackPlans = [
    {
        "_id": "69f4690daf677a4e3f399c96",
        "name": "Starter",
        "price": 499,
        "popular": false,
        "active": true,
        "limits": { "maxProducts": 100, "storageLimit": 500 },
        "features": [
            { "name": "Free SSL/TLS HTTPS" },
            { "name": "Free Security Headers" },
            { "name": "Basic Analytics" },
            { "name": "WhatsApp Order Button" },
            { "name": "Dynamic PWA" }
        ],
        "billing": [
            { "durationMonths": 1, "price": 499, "discountEnabled": false, "discountType": "percentage", "discountValue": 0 },
            { "durationMonths": 6, "price": 499, "discountEnabled": true, "discountType": "percentage", "discountValue": 20 },
            { "durationMonths": 12, "price": 499, "discountEnabled": true, "discountType": "percentage", "discountValue": 30 }
        ]
    },
    {
        "_id": "69f46920af677a4e3f399c97",
        "name": "Basic",
        "price": 999,
        "popular": false,
        "active": true,
        "limits": { "maxProducts": 200, "storageLimit": 1500 },
        "features": [
            { "name": "Free SSL/TLS HTTPS" },
            { "name": "Free Security Headers" },
            { "name": "Basic Analytics" },
            { "name": "Priority Support" },
            { "name": "WhatsApp Order Button" },
            { "name": "Dynamic PWA" }
        ],
        "billing": [
            { "durationMonths": 1, "price": 999, "discountEnabled": false, "discountType": "percentage", "discountValue": 0 },
            { "durationMonths": 6, "price": 999, "discountEnabled": true, "discountType": "percentage", "discountValue": 25 },
            { "durationMonths": 12, "price": 999, "discountEnabled": true, "discountType": "percentage", "discountValue": 35 }
        ]
    },
    {
        "_id": "69f4694eaf677a4e3f399c98",
        "name": "Pro",
        "price": 1499,
        "popular": true,
        "active": true,
        "limits": { "maxProducts": 1000, "storageLimit": 2500 },
        "features": [
            { "name": "Free SSL/TLS HTTPS" },
            { "name": "Free Security Headers" },
            { "name": "Basic Analytics" },
            { "name": "WhatsApp Order Button" },
            { "name": "Advance Analytics" },
            { "name": "Dynamic PWA" },
            { "name": "Priority Support" },
            { "name": "Premium Themes" }
        ],
        "billing": [
            { "durationMonths": 1, "price": 1499, "discountEnabled": false, "discountType": "percentage", "discountValue": 0 },
            { "durationMonths": 6, "price": 1499, "discountEnabled": true, "discountType": "percentage", "discountValue": 30 },
            { "durationMonths": 12, "price": 1499, "discountEnabled": true, "discountType": "percentage", "discountValue": 40 }
        ]
    },
    {
        "_id": "69f46974af677a4e3f399c99",
        "name": "Premium",
        "price": 2499,
        "popular": false,
        "active": true,
        "limits": { "maxProducts": 2499, "storageLimit": 5000 },
        "features": [
            { "name": "Custom Domain" },
            { "name": "Advance Analytics" },
            { "name": "Dynamic PWA" },
            { "name": "WhatsApp Order Button" },
            { "name": "Free SSL/TLS HTTPS" },
            { "name": "Free Security Headers" },
            { "name": "Premium Themes" },
            { "name": "Basic Analytics" },
            { "name": "Priority Support" }
        ],
        "billing": [
            { "durationMonths": 1, "price": 2499, "discountEnabled": false, "discountType": "percentage", "discountValue": 0 },
            { "durationMonths": 6, "price": 2499, "discountEnabled": true, "discountType": "percentage", "discountValue": 28 },
            { "durationMonths": 12, "price": 2499, "discountEnabled": true, "discountType": "percentage", "discountValue": 40 }
        ]
    }
];

let currentPricingPlans = [];
let selectedDuration = 1;

async function loadPricingPlans() {
    const pricingGrid = document.getElementById('pricing-grid');
    if (!pricingGrid) return;

    try {
        const response = await fetch('https://api.galibrand.cloud/api/plans');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        currentPricingPlans = await response.json();
    } catch (error) {
        console.warn('Could not fetch plans online, using backend response data:', error);
        currentPricingPlans = fallbackPlans;
    }

    renderBillingToggle(currentPricingPlans);
    renderPricingCards();
}

function renderBillingToggle(plans) {
    const wrapper = document.getElementById('billing-toggle-wrapper');
    if (!wrapper) return;

    const durationMap = new Map();

    plans.forEach(plan => {
        if (Array.isArray(plan.billing)) {
            plan.billing.forEach(b => {
                const dur = Number(b.durationMonths);
                if (dur && !isNaN(dur)) {
                    let discount = 0;
                    if (b.discountEnabled && b.discountType === 'percentage') {
                        discount = Number(b.discountValue) || 0;
                    }
                    const existingMax = durationMap.get(dur) || 0;
                    if (discount > existingMax) {
                        durationMap.set(dur, discount);
                    } else if (!durationMap.has(dur)) {
                        durationMap.set(dur, 0);
                    }
                }
            });
        }
    });

    const container = wrapper.closest('.billing-toggle-container');
    if (durationMap.size <= 1) {
        if (container) container.style.display = 'none';
        return;
    } else {
        if (container) container.style.display = 'flex';
    }

    const sortedDurations = Array.from(durationMap.keys()).sort((a, b) => a - b);
    if (!sortedDurations.includes(selectedDuration)) {
        selectedDuration = sortedDurations[0];
    }

    wrapper.innerHTML = '';
    sortedDurations.forEach(dur => {
        const maxDiscount = durationMap.get(dur);
        const btn = document.createElement('button');
        btn.className = `billing-toggle-btn px-5 py-2.5 rounded-full text-sm font-semibold transition-all inline-flex items-center gap-2 cursor-pointer ${dur === selectedDuration ? 'active bg-white text-[#558b2f] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`;
        btn.setAttribute('data-duration', dur);

        const labelText = dur === 1 ? '1 Month' : `${dur} Months`;
        const badgeHTML = maxDiscount > 0 ? `<span class="discount-badge bg-gradient-to-r from-[#FB8C00] to-[#ef6c00] text-white text-xs px-2.5 py-0.5 rounded-full font-bold">Save up to ${maxDiscount}%</span>` : '';

        btn.innerHTML = `${labelText} ${badgeHTML}`;

        btn.addEventListener('click', () => {
            wrapper.querySelectorAll('.billing-toggle-btn').forEach(b => {
                b.classList.remove('active', 'bg-white', 'text-[#558b2f]', 'shadow-sm');
                b.classList.add('text-slate-600');
            });
            btn.classList.add('active', 'bg-white', 'text-[#558b2f]', 'shadow-sm');
            btn.classList.remove('text-slate-600');
            selectedDuration = dur;
            renderPricingCards();
        });

        wrapper.appendChild(btn);
    });
}

function formatLimitKey(key, value) {
    if (value === null || value === undefined) return null;
    if (key === 'maxProducts') {
        const num = typeof value === 'number' ? new Intl.NumberFormat('en-IN').format(value) : value;
        return `Up to ${num} Products`;
    }
    if (key === 'storageLimit') {
        const mb = Number(value);
        if (!isNaN(mb)) {
            return mb >= 1000 
                ? `${(mb / 1000).toFixed(1).replace(/\.0$/, '')} GB Storage Limit` 
                : `${mb} MB Storage Limit`;
        }
        return `${value} Storage Limit`;
    }
    if (key === 'storeLimit') {
        return value === 1 ? '1 Store Limit' : `Up to ${value} Stores`;
    }
    const titleCase = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    return `${titleCase}: ${value}`;
}

function getPlanFeatures(plan) {
    const featureItems = [];

    if (plan.limits && typeof plan.limits === 'object') {
        for (const [key, val] of Object.entries(plan.limits)) {
            const formatted = formatLimitKey(key, val);
            if (formatted) featureItems.push(`<li><span class="font-bold text-slate-900">${formatted}</span></li>`);
        }
    }

    if (Array.isArray(plan.features)) {
        plan.features.forEach(f => {
            if (typeof f === 'string') {
                if (!featureItems.some(item => item.includes(f))) featureItems.push(`<li>${f}</li>`);
            } else if (f && typeof f === 'object') {
                const name = f.name || (f.feature && f.feature.name);
                if (name && !featureItems.some(item => item.includes(name))) featureItems.push(`<li>${name}</li>`);
            }
        });
    }

    return featureItems.length > 0 ? featureItems.join('') : '<li>Standard Features</li>';
}

function renderPricingCards() {
    const pricingGrid = document.getElementById('pricing-grid');
    if (!pricingGrid) return;

    pricingGrid.innerHTML = '';

    if (!currentPricingPlans || currentPricingPlans.length === 0) {
        pricingGrid.innerHTML = '<p class="text-center col-span-full text-slate-500 py-10">No pricing plans available at the moment.</p>';
        return;
    }

    currentPricingPlans.sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : Infinity;
        const priceB = typeof b.price === 'number' ? b.price : Infinity;
        return priceA - priceB;
    });

    currentPricingPlans.forEach((plan, cardIndex) => {
        const card = document.createElement('div');
        card.className = 'pricing-card reveal';
        card.style.transitionDelay = `${(cardIndex % 4) * 0.08}s`;

        const isPopular = Boolean(plan.popular || plan.is_popular || plan.name === 'Pro');
        if (isPopular) {
            card.classList.add('highlight');
        }

        const popularBadgeText = plan.badgeText || 'MOST POPULAR';
        const popularBadge = isPopular ? `<div class="badge-popular">${popularBadgeText}</div>` : '';

        const basePrice = typeof plan.price === 'number' ? plan.price : 0;
        let billingOpt = null;
        if (Array.isArray(plan.billing) && plan.billing.length > 0) {
            billingOpt = plan.billing.find(b => Number(b.durationMonths) === selectedDuration) || plan.billing[0];
        }

        let monthlyPrice = basePrice;
        let discountPercent = 0;
        let originalPrice = basePrice;
        let durationMonths = selectedDuration;

        if (billingOpt) {
            originalPrice = typeof billingOpt.price === 'number' ? billingOpt.price : basePrice;
            durationMonths = Number(billingOpt.durationMonths) || selectedDuration;
            if (billingOpt.discountEnabled && billingOpt.discountType === 'percentage') {
                discountPercent = Number(billingOpt.discountValue) || 0;
            } else if (billingOpt.discountEnabled && billingOpt.discountType === 'fixed') {
                const discountAmt = Number(billingOpt.discountValue) || 0;
                discountPercent = originalPrice > 0 ? Math.round((discountAmt / originalPrice) * 100) : 0;
            }
            monthlyPrice = Math.round(originalPrice * (1 - discountPercent / 100));
        }

        const formattedMonthlyPrice = typeof monthlyPrice === 'number' && !isNaN(monthlyPrice)
            ? `₹${new Intl.NumberFormat('en-IN').format(monthlyPrice)}<span class="text-base font-normal text-slate-500">/month</span>`
            : `${monthlyPrice}`;

        const formattedOriginalPrice = typeof originalPrice === 'number' && !isNaN(originalPrice)
            ? `₹${new Intl.NumberFormat('en-IN').format(originalPrice)}`
            : `${originalPrice}`;

        let priceHTML = '';
        let savingsBadge = '';
        let billingNoteText = '';

        if (discountPercent > 0) {
            priceHTML = `<span class="price-original">${formattedOriginalPrice}</span>${formattedMonthlyPrice}`;
            savingsBadge = `<div class="badge-savings">${discountPercent}% SAVINGS</div>`;
            const totalPrice = monthlyPrice * durationMonths;
            const formattedTotal = new Intl.NumberFormat('en-IN').format(totalPrice);
            billingNoteText = `Billed ₹${formattedTotal} for ${durationMonths} month${durationMonths > 1 ? 's' : ''}`;
        } else {
            priceHTML = `${formattedMonthlyPrice}`;
            if (durationMonths > 1) {
                const totalPrice = monthlyPrice * durationMonths;
                const formattedTotal = new Intl.NumberFormat('en-IN').format(totalPrice);
                billingNoteText = `Billed ₹${formattedTotal} for ${durationMonths} month${durationMonths > 1 ? 's' : ''}`;
            } else {
                billingNoteText = `Billed monthly`;
            }
        }

        const featuresHTML = getPlanFeatures(plan);
        const buttonText = plan.buttonText || (plan.price === 'Custom' ? 'Contact Sales' : `Choose ${plan.name}`);
        const buttonClass = isPopular 
            ? 'btn inline-flex items-center justify-center w-full py-3 px-6 rounded-full font-bold text-white bg-gradient-to-r from-[#FB8C00] to-[#ef6c00] shadow-md hover:shadow-lg hover:scale-[1.02] transition-all'
            : 'btn inline-flex items-center justify-center w-full py-3 px-6 rounded-full font-bold text-[#558b2f] border-2 border-[#7CB342] hover:bg-[#7CB342] hover:text-white transition-all';
        const descriptionHTML = plan.description ? `<p class="text-sm text-slate-500 mb-2">${plan.description}</p>` : '';

        card.innerHTML = `
            ${popularBadge}
            ${savingsBadge}
            <h3 class="text-xl font-extrabold text-slate-900 mb-1">${plan.name}</h3>
            ${descriptionHTML}
            <div class="price">${priceHTML}</div>
            <div class="billing-note">${billingNoteText}</div>
            <ul class="features-list">${featuresHTML}</ul>
            <a href="contact.html?plan=${encodeURIComponent(plan.name)}&duration=${durationMonths}" class="${buttonClass}">${buttonText}</a>
        `;
        pricingGrid.appendChild(card);
    });

    if (typeof window.refreshScrollAnimations === 'function') {
        window.refreshScrollAnimations();
    }
}

// ========================================================
// SCROLL REVEAL ANIMATIONS
// ========================================================
function initScrollAnimations() {
    const revealSelector = '.reveal, [data-reveal], section .card, .section-title, .section-subtitle, .docs-section';
    const elementsToReveal = document.querySelectorAll(revealSelector);

    if (elementsToReveal.length === 0) return;

    elementsToReveal.forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });

    // Stagger delays for grid items
    document.querySelectorAll('.grid, .grid-3, .grid-2, .pricing-grid-4, [class*="grid-cols"]').forEach(grid => {
        const items = grid.querySelectorAll('.reveal');
        items.forEach((item, index) => {
            item.style.setProperty('transition-delay', `${(index % 4) * 0.12}s`, 'important');
        });
    });

    if (!('IntersectionObserver' in window)) {
        elementsToReveal.forEach(el => el.classList.add('revealed'));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.05
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const initialTriggerLimit = window.innerHeight * 0.45;
    elementsToReveal.forEach(el => {
        const rect = el.getBoundingClientRect();
        // If element is already in the top hero area on initial load, reveal it
        if (rect.top < initialTriggerLimit && rect.bottom > 0) {
            setTimeout(() => el.classList.add('revealed'), 80);
        } else {
            scrollObserver.observe(el);
        }
    });

    // Backup scroll listener for 100% reliable trigger when user scrolls
    window.addEventListener('scroll', () => {
        const unrevealed = document.querySelectorAll('.reveal:not(.revealed)');
        const screenBottom = window.innerHeight;
        unrevealed.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < screenBottom - 25 && rect.bottom > 0) {
                el.classList.add('revealed');
                scrollObserver.unobserve(el);
            }
        });
    }, { passive: true });

    window.refreshScrollAnimations = function() {
        const newElements = document.querySelectorAll('#pricing-grid .pricing-card:not(.revealed), .reveal:not(.revealed)');
        newElements.forEach((el, index) => {
            el.classList.add('reveal');
            el.style.setProperty('transition-delay', `${(index % 4) * 0.1}s`, 'important');
            const rect = el.getBoundingClientRect();
            if (rect.top < initialTriggerLimit && rect.bottom > 0) {
                setTimeout(() => el.classList.add('revealed'), 80);
            } else {
                scrollObserver.observe(el);
            }
        });
    };
}

// ========================================================
// DOCS PAGE INTERACTIVE LOGIC (docs.html & olddocs.html)
// ========================================================
function initDocsPage() {
    const searchInput = document.querySelector('.docs-search-input');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const resultCount = document.getElementById('searchResultCount');
    const docSections = document.querySelectorAll('.docs-section');
    const sidebarLinks = document.querySelectorAll('.docs-nav-item a, .docs-nav-link');
    const sidebar = document.querySelector('.docs-sidebar, .docs-sidebar-wrapper');

    // 1. Search Filtering
    if (searchInput && docSections.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            if (query === '') {
                if (clearSearchBtn) {
                    clearSearchBtn.classList.add('hidden');
                    clearSearchBtn.classList.remove('flex');
                }
                if (resultCount) resultCount.classList.add('hidden');
                docSections.forEach(section => {
                    section.style.display = 'block';
                });
                sidebarLinks.forEach(link => {
                    const li = link.closest('li');
                    if (li) li.style.display = 'block';
                });
                document.querySelectorAll('.docs-sidebar-wrapper .docs-nav-list, .docs-sidebar-wrapper .docs-sidebar-title').forEach(el => {
                    el.style.display = 'block';
                });
                return;
            }

            if (clearSearchBtn) {
                clearSearchBtn.classList.remove('hidden');
                clearSearchBtn.classList.add('flex');
            }

            docSections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(query)) {
                    section.style.display = 'block';
                    visibleCount++;
                } else {
                    section.style.display = 'none';
                }
            });

            if (resultCount) {
                resultCount.textContent = `${visibleCount} guide${visibleCount === 1 ? '' : 's'} found`;
                resultCount.classList.remove('hidden');
            }

            // Filter sidebar links and group titles based on search
            sidebarLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetEl = document.querySelector(href);
                    const li = link.closest('li');
                    if (targetEl && li) {
                        const parentSec = targetEl.closest('.docs-section') || targetEl;
                        const isParentVisible = parentSec.style.display !== 'none';
                        const textMatches = targetEl.textContent.toLowerCase().includes(query) || link.textContent.toLowerCase().includes(query);
                        li.style.display = (isParentVisible && textMatches) ? 'block' : 'none';
                    }
                }
            });

            // Hide empty group titles
            document.querySelectorAll('.docs-sidebar-wrapper .docs-nav-list').forEach(list => {
                const hasVisible = Array.from(list.querySelectorAll('li')).some(li => li.style.display !== 'none');
                list.style.display = hasVisible ? 'block' : 'none';
                const title = list.previousElementSibling;
                if (title && title.classList.contains('docs-sidebar-title')) {
                    title.style.display = hasVisible ? 'block' : 'none';
                }
            });
        });

        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.focus();
            });
        }
    }

    // 2. Scrollspy & Sidebar Highlighting
    if (sidebarLinks.length > 0) {
        const targets = [];
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    targets.push({ id: href.substring(1), element: target, link: link });
                }
            }
        });

        function setActiveSidebar(activeId) {
            if (!activeId) return;
            sidebarLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${activeId}`) {
                    link.classList.add('active');
                    link.style.color = '#558b2f';
                    link.style.backgroundColor = '#f1f8e9';
                    link.style.fontWeight = '700';
                    link.style.borderLeft = '4px solid #7CB342';
                    
                    if (sidebar) {
                        const linkRect = link.getBoundingClientRect();
                        const sidebarRect = sidebar.getBoundingClientRect();
                        if (linkRect.top < sidebarRect.top || linkRect.bottom > sidebarRect.bottom) {
                            link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                        }
                    }
                } else {
                    link.classList.remove('active');
                    link.style.color = '';
                    link.style.backgroundColor = '';
                    link.style.fontWeight = '';
                    link.style.borderLeft = '';
                }
            });
        }

        let isTicking = false;
        function onScrollSpy() {
            if (isTicking) return;
            isTicking = true;
            requestAnimationFrame(() => {
                isTicking = false;

                // Bottom of page check
                const scrollBottom = window.innerHeight + window.scrollY;
                const docHeight = document.documentElement.scrollHeight;
                if (docHeight - scrollBottom < 80) {
                    const visibleTargets = targets.filter(t => t.element.offsetParent !== null);
                    if (visibleTargets.length > 0) {
                        setActiveSidebar(visibleTargets[visibleTargets.length - 1].id);
                        return;
                    }
                }

                // Trigger offset (navbar 74px + searchbar ~60px + margin = ~165px)
                const triggerOffset = 165;
                let activeId = null;

                for (let i = 0; i < targets.length; i++) {
                    const item = targets[i];
                    if (item.element.offsetParent === null) continue;
                    const rect = item.element.getBoundingClientRect();
                    if (rect.top <= triggerOffset) {
                        activeId = item.id;
                    } else {
                        break;
                    }
                }

                if (activeId) {
                    setActiveSidebar(activeId);
                } else if (targets.length > 0 && targets[0].element.offsetParent !== null) {
                    setActiveSidebar(targets[0].id);
                }
            });
        }

        window.addEventListener('scroll', onScrollSpy, { passive: true });
        onScrollSpy();

        // Smooth scroll with offset for sidebar links
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetEl = document.querySelector(href);
                    if (targetEl) {
                        e.preventDefault();
                        const headerOffset = 150;
                        const elementPosition = targetEl.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        setActiveSidebar(href.substring(1));
                    }
                }
            });
        });
    }

    // 3. One-Tap Copy Snippets
    document.querySelectorAll('.docs-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const codeEl = btn.closest('.docs-code-snippet');
            const textToCopy = btn.getAttribute('data-copy') || (codeEl ? codeEl.querySelector('span, code')?.textContent : '') || '';
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy.trim()).then(() => {
                    const originalText = btn.textContent;
                    btn.textContent = 'Copied! ✓';
                    btn.style.backgroundColor = '#7CB342';
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = '';
                    }, 2000);
                }).catch(err => console.error('Copy failed:', err));
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartials();
    loadPricingPlans();
    initScrollAnimations();
    initDocsPage();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
                const navLinks = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (hamburger) hamburger.textContent = '☰';
                }
            }
        });
    });

    const planNotification = document.getElementById('plan-notification');
    const selectedPlanName = document.getElementById('selected-plan-name');
    const planSelect = document.getElementById('plan-select');

    const urlParams = new URLSearchParams(window.location.search);
    const planFromUrl = urlParams.get('plan');

    if (planNotification && selectedPlanName && planFromUrl) {
        selectedPlanName.textContent = planFromUrl;
        planNotification.style.display = 'block';
    }

    if (planSelect && planFromUrl) {
        planSelect.value = planFromUrl;
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const shopname = document.getElementById('shopname');
            
            document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');

            if (!name || name.value.trim().length < 2) {
                showError(name, 'Please enter a valid name.');
                isValid = false;
            }

            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phone || !phoneRegex.test(phone.value.trim())) {
                showError(phone, 'Please enter a valid 10-digit mobile number.');
                isValid = false;
            }

            if (email && email.value.trim().length > 0 && !email.value.trim().includes('@')) {
                showError(email, 'Please enter a valid email address.');
                isValid = false;
            }

            if (isValid) {
                const submitBtn = contactForm.querySelector('button');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Payload using only name, email, phone, shopName
                const payload = {
                    name: name ? name.value.trim() : '',
                    email: email ? email.value.trim() : '',
                    phone: phone ? phone.value.trim() : '',
                    shopName: shopname ? shopname.value.trim() : ''
                };

                const apiUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
                    ? 'http://localhost:5000/api/contact'
                    : 'https://api.galibrand.cloud/api/contact';

                fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                .then(async (response) => {
                    const data = await response.json().catch(() => ({}));
                    if (response.ok) {
                        alert(data.message || `Thank you, ${name.value}! We have received your request. Our team will call you at ${phone.value} shortly.`);
                        contactForm.reset();
                    } else {
                        alert(data.message || 'Something went wrong. Please check your detail and try again.');
                    }
                })
                .catch(err => {
                    console.error('Contact submission error:', err);
                    alert('Error connecting to server. Please try again later.');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
            }
        });
    }

    function showError(inputElement, message) {
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-msg')) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
});
