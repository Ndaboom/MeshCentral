/**
 * Icon upload component.
 *
 * Reusable for any icon-upload card by passing callbacks/options:
 * - `onUpload`, `onUrlInput`, `onRemove` for feature-specific behavior
 * - `normalizePreviewUrl` for domain/path normalization
 * - `iconKey`, `label`, `currentValue` for per-instance identity and content
 */
class IconUploadComponent {
    constructor(iconKey, container, options = {}) {
        this.iconKey = iconKey;
        this.container = container;
        this.options = {
            label: iconKey,
            currentValue: '',
            onUpload: null,
            onRemove: null,
            onUrlInput: null,
            normalizePreviewUrl: null,
            ...options
        };
    }

    getPreviewSrc(value) {
        if ((typeof value !== 'string') || (value.length === 0)) { return ''; }
        if (typeof this.options.normalizePreviewUrl !== 'function') { return value; }
        try { return this.options.normalizePreviewUrl(value); } catch (ex) { return value; }
    }

    render() {
        const hasIcon = this.options.currentValue.length > 0;
        const initialPreviewSrc = hasIcon ? this.getPreviewSrc(this.options.currentValue) : '';

        const html = `
            <div class="icon-upload-component" data-icon-key="${this.iconKey}">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" id="iconInput_${this.iconKey}"
                           value="${this.options.currentValue}"
                           placeholder="Enter URL or data URL for ${this.options.label} icon"
                           oninput="window.iconUploadComponents['${this.iconKey}'].handleUrlInput(this)" />
                    <button class="btn btn-outline-primary" type="button" onclick="window.iconUploadComponents['${this.iconKey}'].triggerFileUpload()">
                        <i class="fas fa-upload me-2"></i>Upload
                    </button>
                </div>

                <div class="icon-preview-container ${hasIcon ? '' : 'd-none'}" id="preview_container_${this.iconKey}">
                    <small class="text-muted me-2">Preview:</small>
                    <img class="icon-preview-item" id="preview_${this.iconKey}"
                         src="${initialPreviewSrc}" alt="Icon preview" />
                    <button class="btn btn-sm btn-outline-danger ms-auto" type="button"
                            onclick="window.iconUploadComponents['${this.iconKey}'].removeIcon()">
                        <i class="fas fa-times me-1"></i>Default icon
                    </button>
                </div>

                <input type="file" class="d-none" accept=".svg,.png,image/svg+xml,image/png"
                       id="iconFile_${this.iconKey}"
                       onchange="window.iconUploadComponents['${this.iconKey}'].handleFileUpload(this)" />
            </div>
        `;

        this.container.innerHTML = html;

        if (!window.iconUploadComponents) {
            window.iconUploadComponents = {};
        }
        window.iconUploadComponents[this.iconKey] = this;
    }

    triggerFileUpload() {
        const fileInput = document.getElementById(`iconFile_${this.iconKey}`);
        if (fileInput) {
            fileInput.click();
        }
    }

    handleUrlInput(input) {
        const value = input.value.trim();
        const previewContainer = document.getElementById(`preview_container_${this.iconKey}`);
        const previewIcon = document.getElementById(`preview_${this.iconKey}`);

        if (value.length > 0) {
            previewContainer.classList.remove('d-none');
            if (previewIcon.tagName.toLowerCase() === 'img') { previewIcon.src = this.getPreviewSrc(value); }
            else { previewIcon.style.backgroundImage = `url('${value}')`; }
        } else {
            previewContainer.classList.add('d-none');
            if (previewIcon.tagName.toLowerCase() === 'img') { previewIcon.removeAttribute('src'); }
            else { previewIcon.style.backgroundImage = ''; }
        }

        if (this.options.onUrlInput) {
            this.options.onUrlInput(this.iconKey, value);
        }
    }

    async handleFileUpload(input) {
        if (!input || !input.files || (input.files.length === 0)) {
            return;
        }

        const button = this.container.querySelector('.btn-outline-primary');
        const originalContent = button.innerHTML;

        button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Uploading...';
        button.disabled = true;

        try {
            if (this.options.onUpload) {
                const result = await this.options.onUpload(this.iconKey, input.files[0]);

                button.innerHTML = '<i class="fas fa-check me-2"></i>Success!';
                button.classList.remove('btn-outline-primary');
                button.classList.add('btn-success');

                const previewContainer = document.getElementById(`preview_container_${this.iconKey}`);
                const previewIcon = document.getElementById(`preview_${this.iconKey}`);
                const textInput = document.getElementById(`iconInput_${this.iconKey}`);

                if (result && result.path) {
                    previewContainer.classList.remove('d-none');
                    if (previewIcon.tagName.toLowerCase() === 'img') { previewIcon.src = this.getPreviewSrc(result.path); }
                    else { previewIcon.style.backgroundImage = `url('${result.path}')`; }
                    textInput.value = result.path;
                }

                setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.classList.remove('btn-success');
                    button.classList.add('btn-outline-primary');
                    button.disabled = false;
                }, 2000);
            }
        } catch (error) {
            button.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Failed';
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-danger');

            setTimeout(() => {
                button.innerHTML = originalContent;
                button.classList.remove('btn-danger');
                button.classList.add('btn-outline-primary');
                button.disabled = false;
            }, 2000);
        }

        input.value = '';
    }

    removeIcon() {
        const previewContainer = document.getElementById(`preview_container_${this.iconKey}`);
        const previewIcon = document.getElementById(`preview_${this.iconKey}`);
        const textInput = document.getElementById(`iconInput_${this.iconKey}`);

        previewContainer.classList.add('d-none');
        if (previewIcon.tagName.toLowerCase() === 'img') { previewIcon.removeAttribute('src'); }
        else { previewIcon.style.backgroundImage = ''; }
        textInput.value = '';
        if (this.options.onUrlInput) {
            this.options.onUrlInput(this.iconKey, '');
        }

        if (this.options.onRemove) {
            this.options.onRemove(this.iconKey);
        }
    }
}

function createIconUploadComponent(iconKey, container, options = {}) {
    const component = new IconUploadComponent(iconKey, container, options);
    component.render();
    return component;
}

if (typeof window !== 'undefined') {
    window.IconUploadComponent = IconUploadComponent;
    window.createIconUploadComponent = createIconUploadComponent;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IconUploadComponent, createIconUploadComponent };
}
