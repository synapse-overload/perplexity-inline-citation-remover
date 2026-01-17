browser.runtime.onInstalled.addListener(() => {
    browser.storage.local.get(['extensionEnabled'], r => {
        if (r.extensionEnabled === undefined) {
            browser.storage.local.set({ extensionEnabled: true });
        }
    });
});

browser.runtime.onMessage.addListener((req, sender, send) => {
    if (req.action === 'getStatus') {
        browser.storage.local.get(['extensionEnabled'], r => {
            send({ enabled: r.extensionEnabled !== false });
        });
        return true;
    }
    if (req.action === 'toggleExtension') {
        browser.storage.local.get(['extensionEnabled'], r => {
            const newState = !(r.extensionEnabled !== false);
            browser.storage.local.set({ extensionEnabled: newState });
            send({ enabled: newState });
        });
        return true;
    }
});
