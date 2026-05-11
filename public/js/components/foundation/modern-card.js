/**
 * Modern card component wrapper.
 */
class ModernCard {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            title: '',
            icon: '',
            status: 'default', // default, success, warning, danger
            actions: [],
            ...options
        };
    }

    render() {
        const statusClasses = {
            default: '',
            success: 'border-success',
            warning: 'border-warning',
            danger: 'border-danger'
        };

        const statusIcons = {
            default: 'fa-circle',
            success: 'fa-check-circle',
            warning: 'fa-exclamation-circle',
            danger: 'fa-times-circle'
        };

        const statusColors = {
            default: 'text-muted',
            success: 'text-success',
            warning: 'text-warning',
            danger: 'text-danger'
        };

        let cardHTML = `
            <div class="card modern-card ${statusClasses[this.options.status]} h-100">
                <div class="card-header d-flex align-items-center">
                    <div class="bg-light rounded-circle p-2 me-3">
                        <i class="fas ${this.options.icon} fa-lg text-secondary"></i>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="card-title mb-1">${this.options.title}</h6>
                        <small class="status-badge ${statusColors[this.options.status]}">
                            <i class="fas ${statusIcons[this.options.status]} me-1"></i>
                            <span class="status-text">${this.options.status}</span>
                        </small>
                    </div>
                </div>
                <div class="card-body">
                    <div class="card-content">
                        ${this.options.content || ''}
                    </div>
                </div>
        `;

        if (this.options.actions.length > 0) {
            cardHTML += '<div class="card-footer">';
            this.options.actions.forEach(action => {
                cardHTML += `<button class="btn btn-sm ${action.class || 'btn-primary'}" onclick="${action.onclick}">${action.label}</button>`;
            });
            cardHTML += '</div>';
        }

        cardHTML += '</div>';

        this.container.innerHTML = cardHTML;
    }

    updateStatus(status) {
        this.options.status = status;
        const card = this.container.querySelector('.modern-card');
        const statusText = this.container.querySelector('.status-text');
        const statusIcon = this.container.querySelector('.status-badge i');

        card.classList.remove('border-success', 'border-warning', 'border-danger');
        statusText.classList.remove('text-muted', 'text-success', 'text-warning', 'text-danger');

        const statusClasses = {
            default: '',
            success: 'border-success',
            warning: 'border-warning',
            danger: 'border-danger'
        };

        const statusIcons = {
            default: 'fa-circle',
            success: 'fa-check-circle',
            warning: 'fa-exclamation-circle',
            danger: 'fa-times-circle'
        };

        const statusColors = {
            default: 'text-muted',
            success: 'text-success',
            warning: 'text-warning',
            danger: 'text-danger'
        };

        card.classList.add(statusClasses[status]);
        statusText.classList.add(statusColors[status]);
        statusIcon.className = `fas ${statusIcons[status]} me-1`;
        statusText.textContent = status;
    }
}

function createModernCard(container, options = {}) {
    const card = new ModernCard(container, options);
    card.render();
    return card;
}

if (typeof window !== 'undefined') {
    window.ModernCard = ModernCard;
    window.createModernCard = createModernCard;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModernCard, createModernCard };
}
