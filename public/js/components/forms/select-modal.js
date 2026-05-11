/**
 * Reusable single-select modal helper.
 *
 * Depends on open-modal.js for openModal().
 */
(function (root) {
    function renderSelect(label, selectHtml, selectId) {
        if (label && (typeof root.addHtmlFormFloating === 'function')) {
            return root.addHtmlFormFloating(label, selectHtml);
        }
        return (label ? ('<label for="' + root.uiEscapeHtml(selectId) + '">' + root.uiEscapeHtml(label) + '</label>') : '') + selectHtml;
    }

    function openSelectModal(options = {}) {
        const {
            title = '',
            selectId = 'modalSelect',
            label = '',
            message = '',
            optionsHtml = '',
            selectClass = 'form-select',
            selectStyle = '',
            okButtonId = 'idx_dlgOkButton',
            onConfirm = null,
            onAfterShow = null
        } = options;

        let attrs = ' id="' + root.uiEscapeHtml(selectId) + '"';
        if (selectClass) { attrs += ' class="' + root.uiEscapeHtml(selectClass) + '"'; }
        if (selectStyle) { attrs += ' style="' + root.uiEscapeHtml(selectStyle) + '"'; }

        const selectHtml = '<select' + attrs + '>' + optionsHtml + '</select>';
        const body = (message ? (message + '<br /><br />') : '') + renderSelect(label, selectHtml, selectId);

        root.openModal({
            title: title,
            body: body,
            okButtonId: okButtonId,
            onOk: function () {
                const select = document.getElementById(selectId);
                if (typeof onConfirm === 'function') { return onConfirm(select ? select.value : '', select); }
            },
            onAfterShow: function () {
                const select = document.getElementById(selectId);
                if (select) { select.focus(); }
                if (typeof onAfterShow === 'function') { onAfterShow(select); }
            }
        });
    }

    root.openSelectModal = openSelectModal;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { openSelectModal };
    }
})(typeof window !== 'undefined' ? window : globalThis);
