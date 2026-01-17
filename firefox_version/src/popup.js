const statusEl = document.getElementById('status');
const toggleBtn = document.getElementById('toggle');
const removeBtn = document.getElementById('remove');

async function updateUI() {
    const msg = { action: 'getStatus' };
    browser.runtime.sendMessage(msg, resp => {
        statusEl.textContent = resp.enabled ? 'Enabled' : 'Disabled';
        statusEl.className = resp.enabled ? 'enabled' : 'disabled';
        toggleBtn.textContent = resp.enabled ? 'Disable' : 'Enable';
    });
}

toggleBtn.addEventListener('click', () => {
    browser.runtime.sendMessage({ action: 'toggleExtension' }, () => {
        updateUI();
    });
});

removeBtn.addEventListener('click', async () => {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    browser.tabs.sendMessage(tabs[0].id, { action: 'removeCitations' });
});

updateUI();
