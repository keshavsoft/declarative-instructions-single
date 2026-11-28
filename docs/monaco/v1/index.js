import { initRightEditor } from './components/right/js/index.js';
import { initLeftWorkspace } from './components/left/js/index.js';

const AVAILABLE_VERSIONS = ['v3', 'v4', 'v5'];
const requestedVersion = new URLSearchParams(window.location.search).get('version');
const catalogVersion = AVAILABLE_VERSIONS.includes(requestedVersion) ? requestedVersion : 'v5';
const INSTRUCTIONS_URL = new URL(`../../json/${catalogVersion}/instructions.json`, import.meta.url);

async function loadInstructions(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} loading ${url}`);
  return response.json();
}

async function boot() {
  const urlEl = document.getElementById('editorUrl');
  if (urlEl) {
    urlEl.textContent = INSTRUCTIONS_URL;
    urlEl.title = INSTRUCTIONS_URL;
  }

  try {
    const instructions = await loadInstructions(INSTRUCTIONS_URL);
    const editor = await initRightEditor(instructions);
    await initLeftWorkspace({ instructions, editor, catalogVersion });
  } catch (error) {
    console.error('[declarative-instructions-single Monaco V1]', error);
    if (urlEl) urlEl.textContent = `Failed: ${INSTRUCTIONS_URL}`;
  }
}

boot();
