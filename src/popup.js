// Handle the Remove Citations button click

document.getElementById('removeBtn').addEventListener('click', async () => {
    const button = document.getElementById('removeBtn');
    const resultDiv = document.getElementById('result');

    button.disabled = true;
    resultDiv.className = 'result info';
    resultDiv.textContent = 'Removing citations...';

    try {
        // Get the active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // Check if we're on perplexity.ai
        if (!tab.url.includes('perplexity.ai')) {
            resultDiv.className = 'result error';
            resultDiv.textContent = '❌ This extension only works on perplexity.ai';
            button.disabled = false;
            return;
        }

        // Execute the citation removal script using Manifest V3 API
        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: removeCitations
        });

        const count = results[0].result;

        if (count > 0) {
            resultDiv.className = 'result success';
            resultDiv.textContent = `✓ Removed ${count} inline ${count === 1 ? 'citation' : 'citations'}`;
        } else {
            resultDiv.className = 'result info';
            resultDiv.textContent = 'No inline citations found';
        }
    } catch (error) {
        resultDiv.className = 'result error';
        resultDiv.textContent = `❌ Error: ${error.message}`;
        console.error('Citation removal error:', error);
    } finally {
        button.disabled = false;
    }
});

// Function to remove citations (will be injected into page context)
function removeCitations() {
    // Find all inline citation spans: <span class="citation inline">
    const citationSpans = document.querySelectorAll('span.citation.inline');

    let count = 0;
    citationSpans.forEach(span => {
        span.remove();
        count++;
    });

    console.log(`[Perplexity Citation Remover] Removed ${count} inline citations`);
    return count;
}
