export function createActions({ instructions, editor, elements, libraryLabel = 'Complete catalog' }) {
  const data = instructions || {};

  const renderInstructionOptions = () => {
    const datalist = elements.instructionOptions;
    if (!datalist) return;

    datalist.replaceChildren();
    for (const key of Object.keys(data)) {
      const option = document.createElement('option');
      option.value = key;
      datalist.append(option);
    }
  };

  const showSource = (value, title, path) => {
    editor.setValue(JSON.stringify(value, null, 2));
    if (elements.editorTitle) elements.editorTitle.textContent = title;
    if (elements.editorPath) elements.editorPath.textContent = path;
  };

  const actions = {
    initialize: () => {
      renderInstructionOptions();
      showSource(data, 'instructions.json', libraryLabel);
    },

    selectRoot: (event, targetElement) => {
      const rootKey = targetElement?.value ?? '';
      if (!rootKey) {
        actions.showAll();
        return;
      }
      if (!Object.hasOwn(data, rootKey)) return;

      const item = data[rootKey];
      showSource(item, rootKey, `instructions.${rootKey}`);
    },

    showAll: () => {
      if (elements.instructionInput) elements.instructionInput.value = '';
      showSource(data, 'instructions.json', libraryLabel);
    }
  };

  return actions;
}

export default createActions;
