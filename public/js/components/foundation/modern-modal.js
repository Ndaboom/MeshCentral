/**
 * Modern modal component wrapper.
 */
class ModernModal {
    constructor(modalId, options = {}) {
        this.modalId = modalId;
        this.options = {
            size: 'medium',
            showCloseButton: true,
            backdrop: true,
            keyboard: true,
            ...options
        };
    }

    show(title, content, okCallback = null, okButtonText = 'OK') {
        const sizeClass = this.options.size === 'large' ? 'modal-lg' :
                         this.options.size === 'extra-large' ? 'modal-xl' : '';

        let modalContent = `
            <div class="modal-dialog modal-dialog-centered ${sizeClass}">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        ${this.options.showCloseButton ? '<button type="button" class="btn-close" data-bs-dismiss="modal"></button>' : ''}
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        ${okCallback ? `<button type="button" class="btn btn-primary" id="${this.modalId}OkBtn">${okButtonText}</button>` : ''}
                    </div>
                </div>
            </div>
        `;

        setModalContent(this.modalId, title, content, this.options.size);

        if (okCallback) {
            showModal(this.modalId, `${this.modalId}OkBtn`, okCallback);
        } else {
            showModal(this.modalId);
        }
    }

    hide() {
        const modalElement = document.getElementById(this.modalId);
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            }
        }
    }
}

function createModernModal(modalId, options = {}) {
    return new ModernModal(modalId, options);
}

if (typeof window !== 'undefined') {
    window.ModernModal = ModernModal;
    window.createModernModal = createModernModal;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModernModal, createModernModal };
}
