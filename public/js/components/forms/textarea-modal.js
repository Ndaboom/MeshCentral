/**
 * Reusable textarea modal helper.
 *
 * Depends on open-modal.js for openModal().
 */
(function (root) {
    function openTextareaModal(options = {}) {
        const {
            title = '',
            textareaId = 'modalTextarea',
            value = '',
            placeholder = '',
            maxLength = null,
            textareaClass = '',
            textareaStyle = 'width:100%;height:184px;resize:none',
            message = '',
            footerHtml = '',
            okButtonId = 'idx_dlgOkButton',
            onValidate = null,
            onConfirm = null,
            onAfterShow = null
        } = options;

        let attrs = ' id="' + root.uiEscapeHtml(textareaId) + '"';
        if (textareaClass) { attrs += ' class="' + root.uiEscapeHtml(textareaClass) + '"'; }
        if (textareaStyle) { attrs += ' style="' + root.uiEscapeHtml(textareaStyle) + '"'; }
        if (maxLength != null) { attrs += ' maxlength="' + root.uiEscapeHtml(maxLength) + '"'; }
        if (placeholder) { attrs += ' placeholder="' + root.uiEscapeHtml(placeholder) + '"'; }

        const body = (message ? (message + '<br /><br />') : '') + '<textarea' + attrs + '>' + root.uiEscapeHtml(value) + '</textarea>' + footerHtml;

        const validate = function (event) {
            const textarea = document.getElementById(textareaId);
            if (!textarea || (typeof onValidate !== 'function')) { return; }
            const result = onValidate(textarea.value, event, textarea);
            if (typeof result === 'boolean') { root.uiSetOkButton(okButtonId, result); }
        };

        root.openModal({
            title: title,
            body: body,
            okButtonId: okButtonId,
            onOk: function () {
                const textarea = document.getElementById(textareaId);
                if (typeof onConfirm === 'function') { return onConfirm(textarea ? textarea.value : '', textarea); }
            },
            onAfterShow: function () {
                const textarea = document.getElementById(textareaId);
                if (textarea) {
                    textarea.onkeyup = validate;
                    textarea.onchange = validate;
                    root.uiFocusElement(textareaId);
                }
                validate();
                if (typeof onAfterShow === 'function') { onAfterShow(textarea); }
            }
        });
    }

    root.openTextareaModal = openTextareaModal;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { openTextareaModal };
    }
})(typeof window !== 'undefined' ? window : globalThis);
