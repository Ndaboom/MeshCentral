/**
 * Render text or custom HTML with a clipboard icon.
 */
function copyableValue(options = {}) {
    const {
        value = '',
        display = null,
        title = 'Copy to clipboard',
        iconClass = 'fa-fw fa-regular fa-clipboard fa-sm',
        iconStyle = '',
        encode = true,
        iconOnly = false
    } = options;

    const escapeHtml = (typeof uiEscapeHtml === 'function') ? uiEscapeHtml : function (v) {
        return String(v).replace(/[&<>"']/g, function (c) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
        });
    };
    const encodeValue = function (v) {
        if (encode === false) { return v; }
        if (typeof encodeURIComponentEx === 'function') { return encodeURIComponentEx(v); }
        return encodeURIComponent(v);
    };

    const displayHtml = (display == null) ? escapeHtml(value) : display;
    const style = iconStyle ? (' style="' + escapeHtml(iconStyle) + '"') : '';
    const icon = '<i class="' + escapeHtml(iconClass) + '" role=button title="' + escapeHtml(title) + '"' + style + ' onclick=copyTextToClip2("' + encodeValue(value) + '")></i>';
    return iconOnly ? icon : (displayHtml + ' ' + icon);
}

if (typeof window !== 'undefined') {
    window.copyableValue = copyableValue;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { copyableValue };
}
