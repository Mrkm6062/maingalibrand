function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon from hamburger to X
            if (navLinks.classList.contains('active')) {
                hamburger.textContent = '✕';
            } else {
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
        // Normalize link path for comparison
        const cleanLinkPath = linkPath.endsWith('/index.html') ? linkPath.substring(0, linkPath.length - 10) : linkPath.replace('.html', '');
        
        // Root path special case
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
    }
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    const footer = document.getElementById('footer-placeholder');

    if (backToTopBtn && footer) {
        window.addEventListener('scroll', () => {
            const rect = footer.getBoundingClientRect();
            // Show button only when footer is entering the viewport
            if (rect.top <= window.innerHeight) {
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
            const response = await fetch('/header.html');
            headerPlaceholder.innerHTML = await response.text();
            initMobileMenu();
            setActiveNavLink();
        }
        if (footerPlaceholder) {
            const response = await fetch('/footer.html');
            footerPlaceholder.innerHTML = await response.text();
            initBackToTop();
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
    if (!pricingGrid) {
        return; // Not on the pricing page
    }

    try {
        const response = await fetch('https://api.galibrand.cloud/api/plans');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
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

    // Collect all unique durationMonths across all returned plans
    const durationMap = new Map(); // durationMonths -> max discountValue (%)

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

    // Sort durations ascending (e.g. 1, 6, 12)
    const sortedDurations = Array.from(durationMap.keys()).sort((a, b) => a - b);

    if (!sortedDurations.includes(selectedDuration)) {
        selectedDuration = sortedDurations[0];
    }

    wrapper.innerHTML = '';
    sortedDurations.forEach(dur => {
        const maxDiscount = durationMap.get(dur);
        const btn = document.createElement('button');
        btn.className = `billing-toggle-btn ${dur === selectedDuration ? 'active' : ''}`;
        btn.setAttribute('data-duration', dur);

        const labelText = dur === 1 ? '1 Month' : `${dur} Months`;
        const badgeHTML = maxDiscount > 0 ? `<span class="discount-badge">Save up to ${maxDiscount}%</span>` : '';

        btn.innerHTML = `${labelText} ${badgeHTML}`;

        btn.addEventListener('click', () => {
            wrapper.querySelectorAll('.billing-toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
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

    // Parse limits dynamically
    if (plan.limits && typeof plan.limits === 'object') {
        for (const [key, val] of Object.entries(plan.limits)) {
            const formatted = formatLimitKey(key, val);
            if (formatted) {
                featureItems.push(`<li><span class="limit-badge">${formatted}</span></li>`);
            }
        }
    }

    // Parse features dynamically
    if (Array.isArray(plan.features)) {
        plan.features.forEach(f => {
            if (typeof f === 'string') {
                if (!featureItems.some(item => item.includes(f))) {
                    featureItems.push(`<li>${f}</li>`);
                }
            } else if (f && typeof f === 'object') {
                const name = f.name || (f.feature && f.feature.name);
                if (name && !featureItems.some(item => item.includes(name))) {
                    featureItems.push(`<li>${name}</li>`);
                }
            }
        });
    } else if (plan.features && typeof plan.features === 'object') {
        for (const [key, val] of Object.entries(plan.features)) {
            if (val) {
                if (typeof val === 'string') {
                    featureItems.push(`<li>${val}</li>`);
                } else if (val === true) {
                    const titleCase = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    featureItems.push(`<li>${titleCase}</li>`);
                }
            }
        }
    }

    return featureItems.length > 0 ? featureItems.join('') : '<li>Standard Features</li>';
}

function renderPricingCards() {
    const pricingGrid = document.getElementById('pricing-grid');
    if (!pricingGrid) return;

    pricingGrid.innerHTML = '';

    if (!currentPricingPlans || currentPricingPlans.length === 0) {
        pricingGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No pricing plans available at the moment.</p>';
        return;
    }

    // Sort plans by price (cheapest first)
    currentPricingPlans.sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : Infinity;
        const priceB = typeof b.price === 'number' ? b.price : Infinity;
        return priceA - priceB;
    });

    currentPricingPlans.forEach(plan => {
        const card = document.createElement('div');
        card.className = 'card pricing-card';

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
            ? `₹${new Intl.NumberFormat('en-IN').format(monthlyPrice)}<span>/month</span>`
            : `${monthlyPrice}`;

        const formattedOriginalPrice = typeof originalPrice === 'number' && !isNaN(originalPrice)
            ? `₹${new Intl.NumberFormat('en-IN').format(originalPrice)}`
            : `${originalPrice}`;

        let priceHTML = '';
        let savingsBadge = '';
        let billingNoteText = '';

        if (discountPercent > 0) {
            priceHTML = `<span class="price-original">${formattedOriginalPrice}</span>${formattedMonthlyPrice}`;
            savingsBadge = `<div class="badge-savings">SAVE ${discountPercent}%</div>`;
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
        const buttonClass = isPopular ? 'btn btn-secondary' : 'btn btn-outline';
        const descriptionHTML = plan.description ? `<p>${plan.description}</p>` : '';

        card.innerHTML = `
            ${popularBadge}
            ${savingsBadge}
            <h3>${plan.name}</h3>
            ${descriptionHTML}
            <div class="price price-box">${priceHTML}</div>
            <div class="billing-note">${billingNoteText}</div>
            <ul class="features-list">${featuresHTML}</ul>
            <a href="contact.html?plan=${encodeURIComponent(plan.name)}&duration=${durationMonths}" class="${buttonClass}" style="width: 100%">${buttonText}</a>
        `;
        pricingGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartials();
    loadPricingPlans();
    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.textContent = '☰';
                }
            }
        });
    });

    // --- Display Selected Plan ---
    const planNotification = document.getElementById('plan-notification');
    const selectedPlanName = document.getElementById('selected-plan-name');
    const planSelect = document.getElementById('plan-select');

    // Get URL params (available to entire scope)
    const urlParams = new URLSearchParams(window.location.search);
    const planFromUrl = urlParams.get('plan');

    if (planNotification && selectedPlanName && planFromUrl) {
        selectedPlanName.textContent = planFromUrl;
        planNotification.style.display = 'block';
    }

    if (planSelect && planFromUrl) {
        planSelect.value = planFromUrl;
    }

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Get fields
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const shopname = document.getElementById('shopname');
            
            // Reset errors
            document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');

            // Validate Name
            if (name.value.trim().length < 2) {
                showError(name, 'Please enter a valid name.');
                isValid = false;
            }

            // Validate Phone (Basic Indian 10 digit check)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone.value.trim())) {
                showError(phone, 'Please enter a valid 10-digit mobile number.');
                isValid = false;
            }

            if (isValid) {
                // API Call to Backend
                const submitBtn = contactForm.querySelector('button');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Get selected plan from dropdown
                const selectedPlan = planSelect ? planSelect.value : 'General Inquiry';

                const payload = {
                    name: name.value.trim(),
                    phone: phone.value.trim(),
                    shopName: shopname ? shopname.value.trim() : '',
                    plan: selectedPlan
                };

                fetch('https://samriddhishop.info/galibrand/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                .then(response => {
                    if (response.ok) {
                        alert(`Thank you, ${name.value}! We have received your request. Our team will call you at ${phone.value} shortly.`);
                        contactForm.reset();
                    } else {
                        alert('Something went wrong. Please try again.');
                    }
                })
                .catch(err => {
                    console.error(err);
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
