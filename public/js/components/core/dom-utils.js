/**
 * Shared UI component DOM utilities.
 */
(function (root) {
    function uiEscapeHtml(value) {
        if (typeof root.EscapeHtml === 'function') { return root.EscapeHtml(value); }
        return String(value).replace(/[&<>"']/g, function (c) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
        });
    }

    function uiSetOkButton(okButtonId, enabled) {
        if (typeof root.QE === 'function') { root.QE(okButtonId, enabled); return; }
        const okButton = document.getElementById(okButtonId);
        if (okButton) { okButton.disabled = !enabled; }
    }

    function uiFocusElement(id) {
        if (typeof root.focusTextBox === 'function') { root.focusTextBox(id); return; }
        const element = document.getElementById(id);
        if (element) { element.focus(); }
    }

    root.uiEscapeHtml = uiEscapeHtml;
    root.uiSetOkButton = uiSetOkButton;
    root.uiFocusElement = uiFocusElement;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { uiEscapeHtml, uiSetOkButton, uiFocusElement };
    }
})(typeof window !== 'undefined' ? window : globalThis);
