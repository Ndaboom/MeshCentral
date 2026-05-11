/**
 * Reusable confirmation modal helper.
 *
 * Depends on open-modal.js for openModal().
 */
(function (root) {
    function openConfirmModal(options = {}) {
        const {
            title = '',
            message = '',
            confirmCheckboxId = 'confirmCheck',
            confirmText = 'Confirm',
            onConfirm = null,
            modalId = 'xxAddAgent',
            okButtonId = 'idx_dlgOkButton',
            size = null,
            checkboxClass = 'form-check-input me-2',
            labelClass = ''
        } = options;

        const hasCheckbox = confirmCheckboxId !== null;
        let body = message;
        if (hasCheckbox) {
            body += '<br /><br /><label' + (labelClass ? (' class="' + labelClass + '"') : '') + '><input id="' + confirmCheckboxId + '" type="checkbox" class="' + checkboxClass + '" />' + confirmText + '</label>';
        }

        root.openModal({
            modalId: modalId,
            title: title,
            body: body,
            size: size,
            okButtonId: okButtonId,
            onOk: function () {
                const checkbox = hasCheckbox ? document.getElementById(confirmCheckboxId) : null;
                if (checkbox && !checkbox.checked) { return false; }
                if (typeof onConfirm === 'function') { return onConfirm(); }
            },
            onAfterShow: function () {
                const okButton = document.getElementById(okButtonId);
                const checkbox = hasCheckbox ? document.getElementById(confirmCheckboxId) : null;
                if (!okButton || !checkbox) { return; }
                const updateOkButton = function () { okButton.disabled = !checkbox.checked; };
                checkbox.onchange = updateOkButton;
                updateOkButton();
            }
        });
    }

    root.openConfirmModal = openConfirmModal;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { openConfirmModal };
    }
})(typeof window !== 'undefined' ? window : globalThis);
