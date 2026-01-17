const CITATION_SELECTORS = ['sup[data-citation]', 'sup[data-reference]', 'span[data-citation]', 
    'span[data-reference]', '[class*="citation"]', '[class*="reference"]', 'cite'];

function isCitationElement(element) {
    const text = element.textContent.trim();
    if (/^\[\d+\]$/.test(text)) return true;
    if ((element.tagName === 'SUP' || element.tagName === 'SMALL') && /^\d+$/.test(text)) return true;
    for (const attr of ['data-citation', 'data-reference']) {
        if (element.hasAttribute(attr)) return true;
    }
    return ['citation', 'reference', 'cite'].some(c => element.className.includes(c));
}

function removeCitations() {
    CITATION_SELECTORS.forEach(sel => {
        try {
            document.querySelectorAll(sel).forEach(el => {
                if (isCitationElement(el)) el.remove();
            });
        } catch (e) {}
    });
}

function initObserver() {
    const observer = new MutationObserver(() => {
        clearTimeout(observer.timer);
        observer.timer = setTimeout(() => removeCitations(), 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

async function init() {
    const result = await browser.storage.local.get(['extensionEnabled']);
    if (result.extensionEnabled !== false) {
        removeCitations();
        initObserver();
    }
}

init();
browser.runtime.onMessage.addListener((req, sender, send) => {
    if (req.action === 'removeCitations') {
        removeCitations();
        send({ success: true });
    }
});
