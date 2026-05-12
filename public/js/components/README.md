# UI Components

This directory contains reusable browser-global UI helpers used by `default3.handlebars`.

## Structure

- `core/`: shared DOM utilities used by components.
- `modals/`: modal invocation helpers and reusable modal flows.
- `forms/`: form-oriented modal helpers.
- `display/`: small display helpers for repeated inline UI markup.
- `uploads/`: upload-specific UI components and helpers.

## Extraction Rule

Extract a component only when at least two or three call sites share the same UI mechanics.

Good component responsibilities:

- repeated markup generation
- modal setup
- focus behavior
- validation wiring
- OK button enable/disable behavior
- copy/upload/input mechanics

Keep page-specific business logic in the page template or feature code. Components should receive callbacks instead of knowing about MeshCentral actions, device state, user state, or server messages.

## Current Helpers

### `openModal`

Standardizes the common `setModalContent(...)` and `showModal(...)` sequence.

```js
openModal({
    title: "Dialog Title",
    body: html,
    onOk: function () {
        // Page-specific action.
    }
});
```

### `openConfirmModal`

Builds confirmation dialogs with optional checkbox gating.

```js
openConfirmModal({
    title: "Delete",
    message: "Delete selected item?",
    confirmCheckboxId: null,
    onConfirm: function () {
        // Page-specific action.
    }
});
```

### `openInputModal`

Builds a single-input modal and wires focus, validation, and confirm behavior.

```js
openInputModal({
    title: "Rename",
    inputId: "renameInput",
    value: currentName,
    maxLength: 64,
    onValidate: function (value) {
        return value.length > 0;
    },
    onConfirm: function (value) {
        // Page-specific action.
    }
});
```

### `openUploadModal`

Builds upload dialogs and wires file selection validation.

```js
openUploadModal({
    title: "Upload File",
    inputId: "uploadInput",
    onFilesChanged: function (input) {
        QE("idx_dlgOkButton", input.files.length > 0);
    },
    onConfirm: function (files) {
        // Page-specific upload action.
    }
});
```

### `openTextareaModal`

Builds a single-textarea modal and wires focus, validation, and confirm behavior.

```js
openTextareaModal({
    title: "Paste",
    textareaId: "pasteText",
    textareaStyle: "width:100%;height:184px;resize:none",
    onConfirm: function (value) {
        // Page-specific action.
    }
});
```

### `openSelectModal`

Builds a single-select modal and passes the selected value to the confirm callback.

```js
openSelectModal({
    title: "Group Action",
    message: "Select an operation.",
    label: "Operation",
    selectId: "groupOperation",
    optionsHtml: '<option value="1">Lock account</option>',
    onConfirm: function (value) {
        // Page-specific action.
    }
});
```

### `copyableValue`

Renders text or custom HTML with a copy-to-clipboard icon.

```js
copyableValue({
    value: address,
    title: "Copy address to clipboard"
});
```

## Maintenance Notes

- Keep files small and named after the UI mechanic they own.
- Avoid extracting one-off dialogs.
- Avoid putting page-specific message sending or state mutation inside components.
- Prefer adding options to an existing component only when the option is useful to more than one call site.
