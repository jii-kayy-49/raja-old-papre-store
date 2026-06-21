/**
 * Raja Old Paper Store - Web App JavaScript
 * Handles: Bilingual toggling, Google Sheets fetching, WhatsApp pickup form generation, UI animations, Gallery Lightbox
 */

// CONFIGURATION
// Replace this with your Google Sheet ID after publishing to web / sharing "Anyone with link can view"
const GOOGLE_SHEET_ID = '1XzB9BlyRmsV6xI5Z_vX_Z3tXj8m-H183t5wG05vT7G4'; // Temporary placeholder or user-configured sheet ID
const SHOP_PHONE = '919894842323'; // Shop WhatsApp number (with country code, e.g., 91 for India)
const SHOP_CALL_NUMBER = '+919894842323'; // Direct calling phone number

// FALLBACK RATES (Used if Excel sheet fetching fails or offline)
const DEFAULT_RATES = [
    { item_en: 'platic', item_ta: 'பிளாஸ்டிக்', rate: 'xx', unit: 'kg' },
    { item_en: 'pet bottels', item_ta: 'PET பாட்டில்கள்', rate: 'xx', unit: 'kg' },
    { item_en: 'thagaram', item_ta: 'தகரம்', rate: 'xx', unit: 'kg' },
    { item_en: 'irumbu', item_ta: 'இரும்பு', rate: 'xx', unit: 'kg' },
    { item_en: 'kalivu', item_ta: 'கழிவு', rate: 'xx', unit: 'kg' },
    { item_en: 'plastic tagaram', item_ta: 'பிளாஸ்டிக் தகரம்', rate: 'xx', unit: 'kg' },
    { item_en: 'coconut shell', item_ta: 'தேங்காய் ஓடு', rate: 'xx', unit: 'kg' },
    { item_en: 'milk packet cover', item_ta: 'பால் கவர்', rate: 'xx', unit: 'kg' },
    { item_en: 'attai', item_ta: 'அட்டைப்பெட்டி', rate: 'xx', unit: 'kg' },
    { item_en: 'books', item_ta: 'புத்தகங்கள் / நோட்டுகள்', rate: 'xx', unit: 'kg' },
    { item_en: 'one beer bottle', item_ta: 'பீர் பாட்டில் (ஒன்று)', rate: 'xx', unit: 'piece' },
    { item_en: 'other glass botteles', item_ta: 'இதர கண்ணாடி பாட்டில்கள்', rate: 'xx', unit: 'kg' }
];

// ITEM NAME TRANSLATION DICTIONARY (For sheet rate names mapping to Tamil)
const ITEM_TRANSLATIONS = {
    'platic': 'பிளாஸ்டிக்',
    'pet bottels': 'PET பாட்டில்கள்',
    'thagaram': 'தகரம்',
    'irumbu': 'இரும்பு',
    'kalivu': 'கழிவு',
    'plastic tagaram': 'பிளாஸ்டிக் தகரம்',
    'coconut shell': 'தேங்காய் ஓடு',
    'milk packet cover': 'பால் கவர்',
    'attai': 'அட்டைப்பெட்டி',
    'books': 'புத்தகங்கள் / நோட்டுகள்',
    'one beer bottle': 'பீர் பாட்டில் (ஒன்று)',
    'other glass botteles': 'இதர கண்ணாடி பாட்டில்கள்'
};

// BILINGUAL DICTIONARY
const TRANSLATIONS = {
    en: {
        // Nav Links
        'nav-home': 'Home',
        'nav-rates': 'Today\'s Rates',
        'nav-buy': 'What We Buy',
        'nav-how': 'How It Works',
        'nav-gallery': 'Gallery',
        'nav-contact': 'Contact Us',

        // Hero
        'hero-badge': 'Doorstep Pickup Service',
        'hero-badge-sub': 'Free weights & instant payment',
        'hero-title': 'Turn Your Scrap Into Clean Cash!',
        'hero-desc': 'Raja Old Paper Store buys your newspapers, cardboard, metal scrap, and household e-waste. We weigh at your doorstep and pay instantly!',
        'btn-call': 'Call Now',
        'btn-whatsapp': 'WhatsApp Pickup',
        'hero-pill-1': 'Accurate Scales',
        'hero-pill-2': 'Best Market Rates',
        'hero-pill-3': 'Eco-Friendly Recycle',

        // Rates Section
        'rates-badge': 'Live Rates',
        'rates-title': 'Today\'s Buying Scrap Rates',
        'rates-desc': 'We offer transparent prices. Rates are updated daily and reflect what we pay you at your doorstep.',
        'rates-table-item': 'Scrap Material',
        'rates-table-price': 'Our Price',
        'rates-last-update': 'Updated today',
        'rates-loading': 'Loading latest scrap rates...',
        'rates-error': 'Could not load live rates. Displaying standard rates.',
        'rates-ewaste': 'Price depends on product condition. Contact us for a quote.',
        'unit-kg': 'per kg',
        'unit-piece': 'per pc',

        // What We Buy
        'buy-badge': 'Our Services',
        'buy-title': 'Materials We Accept',
        'buy-desc': 'We recycle a wide variety of household and commercial scrap. Here is a list of items we regularly buy.',
        'buy-news-title': 'Newspapers & Books',
        'buy-news-desc': 'Daily newspapers, textbooks, magazines, notebooks, and office files.',
        'buy-card-title': 'Cardboard Boxes',
        'buy-card-desc': 'Packing boxes, shipping boxes, carton sheets, and stiff boards.',
        'buy-iron-title': 'Iron & Steel Scrap',
        'buy-iron-desc': 'Grills, pipes, household metal wares, and construction iron scrap.',
        'buy-copper-title': 'Copper & Brass',
        'buy-copper-desc': 'Electric wires, pipes, utensils, plates, and copper alloys.',
        'buy-alum-title': 'Aluminium Scrap',
        'buy-alum-desc': 'Aluminium sheets, frames, utensils, cans, and wire scraps.',
        'buy-plastic-title': 'Plastics',
        'buy-plastic-desc': 'Hard plastic containers, chairs, toys, buckets, and bottles.',
        'buy-ewaste-title': 'Electronics & E-Waste',
        'buy-ewaste-desc': 'Computers, LED monitors, CPU towers, printers, and accessories.',
        'buy-battery-title': 'Lead Batteries',
        'buy-battery-desc': 'Inverter batteries, car batteries, and large battery backups.',

        // How It Works
        'how-badge': 'Workflow',
        'how-title': 'Easy 5-Step Doorstep Pickup',
        'how-desc': 'Selling your scrap has never been easier. Check out our simple service flow.',
        'step1-title': '1. Contact Us',
        'step1-desc': 'Call us or send a message on WhatsApp.',
        'step2-title': '2. Share Address',
        'step2-desc': 'Send your location/address and scrap estimate.',
        'step3-title': '3. We Visit You',
        'step3-desc': 'We arrange a pickup vehicle to visit your spot.',
        'step4-title': '4. Accurate Weighing',
        'step4-desc': 'We weigh your scrap using digital scales.',
        'step5-title': '5. Instant Cash',
        'step5-desc': 'Get paid immediately in hand or online.',

        // Gallery
        'gallery-badge': 'Our Work',
        'gallery-title': 'Gallery & Operations',
        'gallery-desc': 'Snapshots of our store, weighing machinery, collection vehicles, and recycling activities.',
        'gal-1': 'Our Scrap Store Front',
        'gal-2': 'Scrap Collection Pile',
        'gal-3': 'Doorstep Pickup Vehicle',
        'gal-4': 'Digital Weighing Process',
        'gal-sub': 'Raja Old Paper Store, Thanjavur',

        // Contact & Form
        'contact-badge': 'Get In Touch',
        'contact-title': 'Request Doorstep Pickup',
        'contact-desc': 'Fill out the form below or contact us directly. We will schedule a pickup vehicle at your convenience.',
        'form-title': 'Schedule a Pickup',
        'form-sub': 'Submit to open WhatsApp prefilled request',
        'form-label-name': 'Your Name',
        'form-label-phone': 'Mobile Number',
        'form-label-address': 'Address / Landmark',
        'form-label-type': 'Scrap Material Type',
        'form-placeholder-name': 'Enter your full name',
        'form-placeholder-phone': 'e.g., 9876543210',
        'form-placeholder-address': 'Enter your full address in Thanjavur',
        'form-placeholder-type': 'e.g., Newspaper (20kg), Iron (10kg)',
        'btn-submit': 'Book Pickup via WhatsApp',
        'contact-info-title': 'Store Details',
        'info-address-title': 'Our Location',
        'info-address-desc': 'Medical College 1st Gate, Thanjavur - 613004',
        'info-phone-title': 'Call Us For Pickup',
        'info-phone-desc': 'Direct Call: ',
        'info-wa-title': 'WhatsApp Support',
        'info-wa-desc': 'WhatsApp Message: ',
        'info-hours-title': 'Working Hours',
        'info-hours-desc': 'Monday - Sunday: 8:00 AM - 7:00 PM',

        // Footer
        'footer-tagline': 'Helping Thanjavur stay clean and green through modern recycling services.',
        'footer-quick': 'Quick Links',
        'footer-services': 'Our Services',
        'footer-rights': 'All Rights Reserved.'
    },
    ta: {
        // Nav Links
        'nav-home': 'முகப்பு',
        'nav-rates': 'இன்றைய விலை',
        'nav-buy': 'நாங்கள் வாங்குபவை',
        'nav-how': 'செயல்முறை',
        'nav-gallery': 'புகைப்படங்கள்',
        'nav-contact': 'தொடர்புக்கு',

        // Hero
        'hero-badge': 'வீட்டு வாசலில் வாங்கும் சேவை',
        'hero-badge-sub': 'துல்லியமான எடை மற்றும் உடனடி பணம்',
        'hero-title': 'பழைய பொருட்களை விற்று பணம் பெறுங்கள்!',
        'hero-desc': 'ராஜா பழைய பேப்பர் ஸ்டோர் உங்கள் செய்தித்தாள்கள், அட்டைப்பெட்டிகள், இரும்பு கழிவுகள் மற்றும் வீட்டு மின்னணு கழிவுகளை வாங்குகிறது. உங்கள் வீட்டு வாசலுக்கே வந்து எடையிட்டு, உடனடி பணம் தருகிறோம்!',
        'btn-call': 'இப்போதே அழைக்கவும்',
        'btn-whatsapp': 'வாட்ஸ்அப் மூலம் முன்பதிவு',
        'hero-pill-1': 'துல்லியமான எடை',
        'hero-pill-2': 'சிறந்த சந்தை விலை',
        'hero-pill-3': 'சுற்றுச்சூழல் பாதுகாப்பு',

        // Rates Section
        'rates-badge': 'இன்றைய விலை விவரம்',
        'rates-title': 'இன்றைய பழைய பொருட்களின் விலை',
        'rates-desc': 'நாங்கள் வெளிப்படையான விலைகளை வழங்குகிறோம். விலைகள் தினமும் புதுப்பிக்கப்பட்டு, உங்கள் வீட்டு வாசலில் வழங்கப்படும் தொகையை குறிக்கிறது.',
        'rates-table-item': 'பழைய பொருள் வகை',
        'rates-table-price': 'எங்கள் விலை',
        'rates-last-update': 'இன்று புதுப்பிக்கப்பட்டது',
        'rates-loading': 'விலை விவரங்கள் ஏற்றப்படுகின்றன...',
        'rates-error': 'விலைகளை ஏற்ற முடியவில்லை. இயல்புநிலை விலைகள் காண்பிக்கப்படுகின்றன.',
        'rates-ewaste': 'விலை பொருளின் தரத்தைப் பொறுத்தது. மேற்கோளுக்கு எங்களைத் தொடர்பு கொள்ளவும்.',
        'unit-kg': 'கிலோவிற்கு',
        'unit-piece': 'ஒன்றிற்கு',

        // What We Buy
        'buy-badge': 'எங்கள் சேவைகள்',
        'buy-title': 'நாங்கள் வாங்கும் பழைய பொருட்கள்',
        'buy-desc': 'நாங்கள் பல்வேறு வகையான வீட்டு மற்றும் வணிக ரீதியான பழைய பொருட்களை மறுசுழற்சி செய்கிறோம். நாங்கள் வாங்கும் முக்கிய பொருட்கள் கீழே:',
        'buy-news-title': 'செய்தித்தாட்கள் & புத்தகங்கள்',
        'buy-news-desc': 'தினசரி செய்தித்தாள்கள், பாடப்புத்தகங்கள், வார இதழ்கள், நோட்டுகள் மற்றும் அலுவலக கோப்புகள்.',
        'buy-card-title': 'அட்டைப்பெட்டிகள்',
        'buy-card-desc': 'பேக்கிங் பெட்டிகள், கப்பல் பெட்டிகள், அட்டை தாள்கள் மற்றும் கடினமான அட்டைகள்.',
        'buy-iron-title': 'இரும்பு மற்றும் ஸ்டீல் கழிவுகள்',
        'buy-iron-desc': 'ஜன்னல் கம்பிகள், குழாய்கள், வீட்டு உலோகப் பொருட்கள் மற்றும் கட்டுமான இரும்புக் கழிவுகள்.',
        'buy-copper-title': 'செம்பு & பித்தளை',
        'buy-copper-desc': 'மின்சார கம்பிகள், குழாய்கள், பாத்திரங்கள், தட்டுகள் மற்றும் செம்பு கலவைகள்.',
        'buy-alum-title': 'அலுமினிய கழிவுகள்',
        'buy-alum-desc': 'அலுமினிய தாள்கள், பிரேம்கள், பாத்திரங்கள், கேன்கள் மற்றும் கம்பி துண்டுகள்.',
        'buy-plastic-title': 'பிளாஸ்டிக் பொருட்கள்',
        'buy-plastic-desc': 'கடின பிளாஸ்டிக் கொள்கலன்கள், நாற்காலிகள், பொம்மைகள், வாளிகள் மற்றும் பாட்டில்கள்.',
        'buy-ewaste-title': 'மின்னணு கழிவுகள் (E-Waste)',
        'buy-ewaste-desc': 'கணினிகள், எல்இடி மானிட்டர்கள், சிபியு டவர்கள், பிரிண்டர்கள் மற்றும் பாகங்கள்.',
        'buy-battery-title': 'காரீய பேட்டரிகள்',
        'buy-battery-desc': 'இன்வெர்ட்டர் பேட்டரிகள், கார் பேட்டரிகள் மற்றும் பெரிய பேட்டரி பேக்கப்கள்.',

        // How It Works
        'how-badge': 'எப்படி செயல்படுகிறது',
        'how-title': 'எளிய 5-படி வீட்டு வாசல் சேவை',
        'how-desc': 'உங்கள் பழைய பொருட்களை விற்பது இப்போது மிகவும் எளிது. எங்கள் எளிய சேவை முறையை இங்கே பாருங்கள்.',
        'step1-title': '1. தொடர்பு கொள்ளவும்',
        'step1-desc': 'எங்களை அழைக்கவும் அல்லது வாட்ஸ்அப் மூலம் செய்தி அனுப்பவும்.',
        'step2-title': '2. முகவரியை பகிரவும்',
        'step2-desc': 'உங்கள் இருப்பிடம் மற்றும் பழைய பொருட்களின் விவரங்களை அனுப்பவும்.',
        'step3-title': '3. நாங்கள் வருகிறோம்',
        'step3-desc': 'நாங்கள் உங்கள் இருப்பிடத்திற்கு வர ஒரு வாகனத்தை ஏற்பாடு செய்கிறோம்.',
        'step4-title': '4. துல்லியமான எடை',
        'step4-desc': 'டிஜிட்டல் தராசு மூலம் பொருட்களை துல்லியமாக எடையிடுகிறோம்.',
        'step5-title': '5. உடனடி பணம்',
        'step5-desc': 'பொருட்களைப் பெற்றுக்கொண்டு கையிலோ அல்லது ஆன்லைனிலோ பணம் பெறலாம்.',

        // Gallery
        'gallery-badge': 'புகைப்படங்கள்',
        'gallery-title': 'எங்கள் கடை & சேவைகள்',
        'gallery-desc': 'எங்கள் கடை, எடையிடும் கருவிகள், சேகரிப்பு வாகனங்கள் மற்றும் மறுசுழற்சி நடவடிக்கைகளின் புகைப்படங்கள்.',
        'gal-1': 'எங்கள் கடை முகப்பு',
        'gal-2': 'சேகரிக்கப்பட்ட பொருட்கள்',
        'gal-3': 'சேவைக்கான வாகனம்',
        'gal-4': 'டிஜிட்டல் எடையிடும் முறை',
        'gal-sub': 'ராஜா பழைய பேப்பர் ஸ்டோர், தஞ்சாவூர்',

        // Contact & Form
        'contact-badge': 'தொடர்பு கொள்ள',
        'contact-title': 'வீட்டு வாசலில் வாங்க கோரிக்கை',
        'contact-desc': 'கீழே உள்ள படிவத்தை நிரப்பவும் அல்லது எங்களை நேரடியாக தொடர்பு கொள்ளவும். உங்கள் வசதிக்கேற்ப எடையிடும் வாகனத்தை அனுப்புவோம்.',
        'form-title': 'சேவையை முன்பதிவு செய்ய',
        'form-sub': 'விவரங்களை சமர்ப்பித்தால் வாட்ஸ்அப் மெசேஜ் தயாராகும்',
        'form-label-name': 'உங்கள் பெயர்',
        'form-label-phone': 'மொபைல் எண்',
        'form-label-address': 'முகவரி / அடையாளம்',
        'form-label-type': 'பொருட்களின் வகை',
        'form-placeholder-name': 'முழு பெயரை உள்ளிடவும்',
        'form-placeholder-phone': 'உதாரணம்: 9876543210',
        'form-placeholder-address': 'தஞ்சாவூரில் உள்ள உங்கள் முகவரியை உள்ளிடவும்',
        'form-placeholder-type': 'உதாரணம்: பேப்பர் (20கிலோ), இரும்பு (10கிலோ)',
        'btn-submit': 'வாட்ஸ்அப் மூலம் முன்பதிவு செய்',
        'contact-info-title': 'கடை விபரங்கள்',
        'info-address-title': 'கடை முகவரி',
        'info-address-desc': 'மருத்துவக் கல்லூரி 1வது கேட், தஞ்சாவூர் - 613004',
        'info-phone-title': 'அழைக்க வேண்டிய எண்',
        'info-phone-desc': 'தொலைபேசி எண்: ',
        'info-wa-title': 'வாட்ஸ்அப் உதவி',
        'info-wa-desc': 'வாட்ஸ்அப்: ',
        'info-hours-title': 'வேலை நேரம்',
        'info-hours-desc': 'திங்கள் - ஞாயிறு: காலை 8:00 - மாலை 7:00 மணி வரை',

        // Footer
        'footer-tagline': 'நவீன மறுசுழற்சி சேவைகள் மூலம் தஞ்சாவூரை தூய்மையாகவும் பசுமையாகவும் வைத்திருக்க உதவுகிறோம்.',
        'footer-quick': 'முக்கிய இணைப்புகள்',
        'footer-services': 'எங்கள் சேவைகள்',
        'footer-rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'
    }
};

// Global App State
let currentLang = localStorage.getItem('raja_paper_store_lang') || 'en';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Language Selection
    setLanguage(currentLang);
    setupLanguageToggle();

    // Fetch live rates from Google Sheet
    fetchRates();

    // Setup Navigation Listeners
    setupHeaderScroll();
    setupMobileMenu();
    setupNavActiveState();

    // Setup Form Submissions
    setupFormHandler();

    // Setup Gallery Lightbox
    setupLightbox();

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

/**
 * Configure Language Switching UI and State
 */
function setupLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang !== currentLang) {
                setLanguage(lang);
            }
        });
    });
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('raja_paper_store_lang', lang);
    document.documentElement.lang = lang;

    // Update active class on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update all elements with data-translate attribute
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(elem => {
        const key = elem.dataset.translate;
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            // Check if element is an input with placeholders
            if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
                elem.placeholder = TRANSLATIONS[lang][key];
            } else {
                elem.textContent = TRANSLATIONS[lang][key];
            }
        }
    });

    // Render/refresh rates table and buy grid dynamically after translation
    renderRatesTable();
    renderBuySection();
}

/**
 * Fetch rates from local Excel file (Untitled spreadsheet.xlsx) using SheetJS
 */
let liveRates = [];

async function fetchRates() {
    try {
        const response = await fetch('Untitled spreadsheet.xlsx');
        if (!response.ok) throw new Error('Excel file fetch failed');

        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert sheet data to JSON array of arrays
        const parsedRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (parsedRows.length <= 1) throw new Error('No data found in sheet');

        liveRates = [];
        for (let i = 1; i < parsedRows.length; i++) {
            const row = parsedRows[i];
            if (row.length >= 2 && row[0] !== undefined && row[1] !== undefined) {
                const itemName = String(row[0]).trim();
                const rateVal = String(row[1]).trim();

                if (itemName) {
                    const cleanItemNameLower = itemName.toLowerCase().trim();
                    const itemTa = ITEM_TRANSLATIONS[cleanItemNameLower] || itemName;

                    // Detect unit (e.g. piece for bottles)
                    let unit = 'kg';
                    if (cleanItemNameLower === 'one beer bottle' || cleanItemNameLower.includes('piece')) {
                        unit = 'piece';
                    }

                    liveRates.push({
                        item_en: itemName,
                        item_ta: itemTa,
                        rate: rateVal,
                        unit: unit
                    });
                }
            }
        }

        renderRatesTable();
        renderBuySection();

    } catch (error) {
        console.warn('Local Excel rates load failed. Using offline backup rates.', error);
        liveRates = DEFAULT_RATES;

        // Show offline fallback alert/notice
        const errorMsgElem = document.getElementById('rates-status-msg');
        if (errorMsgElem) {
            errorMsgElem.innerHTML = `<span data-translate="rates-error">${TRANSLATIONS[currentLang]['rates-error']}</span>`;
        }

        renderRatesTable();
        renderBuySection();
    }
}

/**
 * Render scrap rates grid cards
 */
function renderRatesTable() {
    const tableContainer = document.getElementById('rates-table-container');
    if (!tableContainer) return;

    if (liveRates.length === 0) return;

    tableContainer.innerHTML = '';

    const ratesGrid = document.createElement('div');
    ratesGrid.className = 'rates-grid';

    liveRates.forEach(rateItem => {
        const name = currentLang === 'ta' ? rateItem.item_ta : rateItem.item_en;
        const rateUnitStr = TRANSLATIONS[currentLang]['unit-' + rateItem.unit] || 'kg';

        const card = document.createElement('div');
        card.className = 'rate-card';

        card.innerHTML = `
            <div class="rate-card-main">
                <div class="rate-icon-container">
                    ${getRateIcon(rateItem.item_en)}
                </div>
                <div class="rate-item-name">${name}</div>
            </div>
            <div class="rate-price-container">
                <span class="rate-price">₹${rateItem.rate}</span>
                <span class="rate-unit">/ ${rateUnitStr}</span>
            </div>
        `;

        ratesGrid.appendChild(card);
    });

    tableContainer.appendChild(ratesGrid);

    // Add E-waste note
    const eWasteCard = document.createElement('div');
    eWasteCard.className = 'e-waste-notice';
    eWasteCard.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 5.522 4.477 9.999 9.999 9.999 5.522 0 9.999-4.477 9.999-9.999 0-5.522-4.477-9.999-9.999-9.999zm1.001 15h-2v-2h2v2zm0-4h-2v-6h2v6z"/>
        </svg>
        <span data-translate="rates-ewaste">${TRANSLATIONS[currentLang]['rates-ewaste']}</span>
    `;
    tableContainer.appendChild(eWasteCard);
}

/**
 * Render What We Buy cards dynamically from Excel list
 */
function renderBuySection() {
    const buyGrid = document.querySelector('.buy-grid');
    if (!buyGrid) return;
    buyGrid.innerHTML = '';

    liveRates.forEach(rateItem => {
        const name = currentLang === 'ta' ? rateItem.item_ta : rateItem.item_en;
        const icon = getRateIcon(rateItem.item_en);
        const desc = getItemDescription(rateItem.item_en, currentLang);

        const card = document.createElement('div');
        card.className = 'buy-card';
        card.innerHTML = `
            <div class="buy-icon">${icon}</div>
            <div class="buy-details">
                <h3>${name}</h3>
                <p>${desc}</p>
            </div>
        `;
        buyGrid.appendChild(card);
    });
}

/**
 * Returns suitable icon for a rate category
 */
function getRateIcon(itemName) {
    const item = itemName.toLowerCase();
    if (item.includes('paper') || item.includes('news') || item.includes('books')) {
        return '📚';
    } else if (item.includes('irumbu') || item.includes('iron') || item.includes('steel') || item.includes('metal')) {
        return '⛓️';
    } else if (item.includes('pet') || item.includes('bottle') || item.includes('bottel')) {
        return '🍾';
    } else if (item.includes('milk') || item.includes('cover')) {
        return '🥛';
    } else if (item.includes('coconut')) {
        return '🥥';
    } else if (item.includes('plastic') || item.includes('platic')) {
        return '🥤';
    } else if (item.includes('cardboard') || item.includes('attai')) {
        return '📦';
    } else if (item.includes('thagaram')) {
        return '🥫';
    }
    return '♻️';
}

/**
 * Get dynamic localized description for Excel items
 */
function getItemDescription(itemName, lang) {
    const item = itemName.toLowerCase().trim();
    const descriptions = {
        en: {
            'platic': 'Plastics of various types including containers, buckets, and light plastic items.',
            'pet bottels': 'Clear and colored PET water and beverage bottles.',
            'thagaram': 'Tin containers, sheet metal, and light metal scrap.',
            'irumbu': 'Iron metal scraps, rods, pipes, and old iron structures.',
            'kalivu': 'General mixed scrap and miscellaneous recyclable waste items.',
            'plastic tagaram': 'Plastic tins, bottles, and light plastic household wares.',
            'coconut shell': 'Cleaned and dried coconut shells for fuel/charcoal recycling.',
            'milk packet cover': 'Cleaned and dried plastic milk packet covers.',
            'attai': 'Cardboard boxes, shipping cartons, and paper boards.',
            'books': 'Old books, textbooks, notebooks, and office files.',
            'one beer bottle': 'Standard glass beer bottles (priced per piece).',
            'other glass botteles': 'Glass jars, sauce bottles, and other glass containers.'
        },
        ta: {
            'platic': 'பிளாஸ்டிக் கொள்கலன்கள், வாளிகள் மற்றும் பொம்மைகள்.',
            'pet bottels': 'சுத்தமான மற்றும் வண்ண PET குடிநீர் மற்றும் பான பாட்டில்கள்.',
            'thagaram': 'தகர டப்பாக்கள், தாள்கள் மற்றும் இலகுரக உலோக கழிவுகள்.',
            'irumbu': 'இரும்பு கம்பிகள், குழாய்கள் மற்றும் இரும்பு கட்டமைப்புகள்.',
            'kalivu': 'பொதுவான கலப்பு பழைய உலோகங்கள் மற்றும் மறுசுழற்சி கழிவுகள்.',
            'plastic tagaram': 'பிளாஸ்டிக் டப்பாக்கள், பாட்டில்கள் மற்றும் இலகுரக பொருட்கள்.',
            'coconut shell': 'எரிபொருள் மற்றும் கரி தயாரிப்பிற்கான காய்ந்த தேங்காய் ஓடுகள்.',
            'milk packet cover': 'சுத்தம் செய்யப்பட்ட பிளாஸ்டிக் பால் கவர் கவர்கள்.',
            'attai': 'அட்டைப்பெட்டிகள், பேக்கிங் அட்டைகள் மற்றும் காகித அட்டைகள்.',
            'books': 'பழைய புத்தகங்கள், பாடப்புத்தகங்கள், நோட்டுகள் மற்றும் கோப்புகள்.',
            'one beer bottle': 'நிலையான கண்ணாடி பீர் பாட்டில்கள் (ஒன்றிற்கு கட்டணம்).',
            'other glass botteles': 'கண்ணாடி ஜாடிகள், சாஸ் பாட்டில்கள் மற்றும் இதர கண்ணாடி பாட்டில்கள்.'
        }
    };

    return descriptions[lang]?.[item] || (lang === 'ta' ? 'மறுசுழற்சிக்கான சிறந்த சந்தை விலை.' : 'Recycled at the best market rates.');
}

/**
 * Scroll behavior for glassmorphic header
 */
function setupHeaderScroll() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile Navigation burger menu click events
 */
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close nav panel when any item is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

/**
 * Highlights active link in navbar during scroll
 */
function setupNavActiveState() {
    const sections = document.querySelectorAll('section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // offset for nav height

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Handle form submit and redirect to WhatsApp
 */
function setupFormHandler() {
    const form = document.getElementById('pickup-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameVal = document.getElementById('name').value.trim();
        const mobileVal = document.getElementById('mobile').value.trim();
        const addressVal = document.getElementById('address').value.trim();
        const typeVal = document.getElementById('scrap-type').value.trim();

        if (!nameVal || !mobileVal || !addressVal) {
            alert(currentLang === 'ta' ? 'தயவுசெய்து தேவையான அனைத்து விபரங்களையும் பூர்த்தி செய்யவும்.' : 'Please fill all required fields.');
            return;
        }

        // Compile the WhatsApp request message
        let waText = '';
        if (currentLang === 'ta') {
            waText = `வணக்கம் ராஜா பழைய பேப்பர் ஸ்டோர், எனது வீட்டில் உள்ள பழைய பொருட்களை வாங்குவதற்கு கதவுப்படி சேவையை முன்பதிவு செய்ய விரும்புகிறேன்.\n\n` +
                `👤 *பெயர்:* ${nameVal}\n` +
                `📞 *மொபைல் எண்:* ${mobileVal}\n` +
                `📍 *முகவரி:* ${addressVal}\n` +
                `♻️ *பொருட்களின் வகை:* ${typeVal || 'உள்ளூர் கழிவுகள் (குப்பை)'}`;
        } else {
            waText = `Hello Raja Old Paper Store, I would like to book a doorstep scrap pickup.\n\n` +
                `👤 *Name:* ${nameVal}\n` +
                `📞 *Mobile Number:* ${mobileVal}\n` +
                `📍 *Address:* ${addressVal}\n` +
                `♻️ *Scrap Material:* ${typeVal || 'General Scrap'}`;
        }

        // Encode and open WhatsApp deep link
        const encodedText = encodeURIComponent(waText);
        const waUrl = `https://api.whatsapp.com/send?phone=${SHOP_PHONE}&text=${encodedText}`;

        window.open(waUrl, '_blank');
        form.reset();
    });
}

/**
 * Gallery Image Lightbox setup
 */
function setupLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlayTitle = item.querySelector('.gallery-overlay h4');

            lightboxImg.src = img.src;
            lightboxCaption.textContent = overlayTitle.textContent;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent page scrolling
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
            closeLightbox();
        }
    });

    // Press escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}
