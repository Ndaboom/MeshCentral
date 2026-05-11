/**
 * Reusable upload modal helper.
 *
 * Depends on open-modal.js for openModal().
 */
(function (root) {
    function hiddenFieldHtml(field) {
        return '<input type="' + root.uiEscapeHtml(field.type || 'hidden') + '" name="' + root.uiEscapeHtml(field.name) + '" id="' + root.uiEscapeHtml(field.id || field.name) + '" value="' + root.uiEscapeHtml(field.value || '') + '" style="display:none" />';
    }

    function openUploadModal(options = {}) {
        const {
            title = 'Upload File',
            inputId = 'uploadInput',
            inputName = 'files',
            inputClass = 'form-control',
            multiple = true,
            accept = null,
            form = null,
            submitId = null,
            overwrite = null,
            okButtonId = 'idx_dlgOkButton',
            onFilesChanged = null,
            onConfirm = null
        } = options;

        const fileInput = '<input type=file name="' + root.uiEscapeHtml(inputName) + '" id="' + root.uiEscapeHtml(inputId) + '" class="' + root.uiEscapeHtml(inputClass) + '"' + (multiple ? ' multiple=multiple' : '') + (accept ? (' accept="' + root.uiEscapeHtml(accept) + '"') : '') + ' />';
        let body = '';

        if (form) {
            body += '<form method=post enctype=multipart/form-data action="' + root.uiEscapeHtml(form.action) + '" target="' + root.uiEscapeHtml(form.target) + '">';
            if (Array.isArray(form.hiddenFields)) {
                for (let i = 0; i < form.hiddenFields.length; i++) { body += hiddenFieldHtml(form.hiddenFields[i]); }
            }
            body += fileInput;
            if (submitId) { body += '<input type=submit id="' + root.uiEscapeHtml(submitId) + '" class="btn btn-outline-success mt-2" style="display:none" />'; }
            if (overwrite) {
                body += '<span id="' + root.uiEscapeHtml(overwrite.spanId) + '" style=display:none><br/><label><input type=checkbox class="form-check-input me-2" id="' + root.uiEscapeHtml(overwrite.checkboxId) + '" />' + root.uiEscapeHtml(overwrite.label || 'Confirm overwrite?') + '</label></span>';
            }
            body += '</form>';
        } else {
            body = fileInput;
        }

        const update = function () {
            const input = document.getElementById(inputId);
            if (typeof onFilesChanged === 'function') {
                onFilesChanged(input);
            } else {
                root.uiSetOkButton(okButtonId, !!(input && input.files && (input.files.length > 0)));
            }
        };

        root.openModal({
            title: title,
            body: body,
            okButtonId: okButtonId,
            onOk: function () {
                const input = document.getElementById(inputId);
                if (typeof onConfirm === 'function') { return onConfirm(input ? input.files : null, input); }
            },
            onAfterShow: function () {
                const input = document.getElementById(inputId);
                if (input) { input.onchange = update; }
                if (overwrite) {
                    const checkbox = document.getElementById(overwrite.checkboxId);
                    if (checkbox) { checkbox.onchange = update; }
                }
                update();
            }
        });
    }

    root.openUploadModal = openUploadModal;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { openUploadModal };
    }
})(typeof window !== 'undefined' ? window : globalThis);
