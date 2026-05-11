/**
 * Reusable single-input modal helper.
 *
 * Depends on open-modal.js for openModal().
 */
(function (root) {
    function openInputModal(options = {}) {
        const {
            title = '',
            inputId = 'modalInput',
            value = '',
            placeholder = '',
            type = 'text',
            inputClass = 'form-control',
            inputStyle = 'width:100%',
            maxLength = null,
            inputMode = null,
            pattern = null,
            message = '',
            size = null,
            okButtonId = 'idx_dlgOkButton',
            onValidate = null,
            onConfirm = null,
            onAfterShow = null
        } = options;

        let attrs = ' id="' + root.uiEscapeHtml(inputId) + '" type="' + root.uiEscapeHtml(type) + '"';
        if (inputClass) { attrs += ' class="' + root.uiEscapeHtml(inputClass) + '"'; }
        if (inputStyle) { attrs += ' style="' + root.uiEscapeHtml(inputStyle) + '"'; }
        if (maxLength != null) { attrs += ' maxlength="' + root.uiEscapeHtml(maxLength) + '"'; }
        if (inputMode) { attrs += ' inputmode="' + root.uiEscapeHtml(inputMode) + '"'; }
        if (pattern) { attrs += ' pattern="' + root.uiEscapeHtml(pattern) + '"'; }
        if (placeholder) { attrs += ' placeholder="' + root.uiEscapeHtml(placeholder) + '"'; }
        attrs += ' value="' + root.uiEscapeHtml(value) + '"';

        const body = (message ? (message + '<br /><br />') : '') + '<input' + attrs + ' />';

        const validate = function (event) {
            const input = document.getElementById(inputId);
            if (!input || (typeof onValidate !== 'function')) { return; }
            const result = onValidate(input.value, event, input);
            if (typeof result === 'boolean') { root.uiSetOkButton(okButtonId, result); }
        };

        root.openModal({
            title: title,
            body: body,
            size: size,
            okButtonId: okButtonId,
            onOk: function () {
                const input = document.getElementById(inputId);
                if (typeof onConfirm === 'function') { return onConfirm(input ? input.value : '', input); }
            },
            onAfterShow: function () {
                const input = document.getElementById(inputId);
                if (input) {
                    input.onkeyup = validate;
                    input.onchange = validate;
                    root.uiFocusElement(inputId);
                }
                validate();
                if (typeof onAfterShow === 'function') { onAfterShow(input); }
            }
        });
    }

    root.openInputModal = openInputModal;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { openInputModal };
    }
})(typeof window !== 'undefined' ? window : globalThis);
