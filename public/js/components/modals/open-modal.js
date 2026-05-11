/**
 * Standard modal invocation helper.
 */
function openModal(options = {}) {
    const {
        modalId = 'xxAddAgent',
        modalElementId = `${modalId}Modal`,
        title = '',
        body = '',
        size = null,
        okButtonId = 'idx_dlgOkButton',
        onBeforeShow = null,
        onAfterShow = null,
        onOk = null,
        b = null,
        tag = null
    } = options;

    setModalContent(modalId, title, body, size);
    if (typeof onBeforeShow === 'function') { onBeforeShow(); }
    showModal(modalElementId, okButtonId, onOk, b, tag);
    if (typeof onAfterShow === 'function') { onAfterShow(); }
}

if (typeof window !== 'undefined') {
    window.openModal = openModal;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { openModal };
}
