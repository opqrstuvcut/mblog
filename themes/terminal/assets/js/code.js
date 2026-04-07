const blockcodes = document.querySelectorAll(".chroma code[data-lang]");

for (const bc of blockcodes) {
  const parent = bc.parentElement;
  const content = bc.innerText.split("\n").filter(Boolean).join("\n");

  // Code title
  const title = document.createElement("div");
  const lang = bc.dataset.lang;
  title.classList.add("code-title");
  title.innerText = lang;

  const actions = document.createElement("div");
  actions.style.display = "inline-flex";
  actions.style.gap = "6px";

  const selectButton = document.createElement("button");
  selectButton.classList.add("copy-button");
  selectButton.innerText = "Yank";

  selectButton.addEventListener("click", () => {
    const selection = window.getSelection();

    if (!selection) return;

    const range = document.createRange();
    range.selectNodeContents(bc);
    selection.removeAllRanges();
    selection.addRange(range);

    selectButton.innerText = "Selected";
    setTimeout(() => {
      selectButton.innerText = "Yank";
    }, 1000);
  });

  actions.append(selectButton);

  // Copy to clipboard on demand
  if (navigator.clipboard !== undefined) {
    const cpbutton = document.createElement("button");
    cpbutton.classList.add("copy-button");
    cpbutton.innerText = "Clipboard";

    cpbutton.addEventListener("click", () => {
      cpbutton.innerText = "Copied";
      setTimeout(() => {
        cpbutton.innerText = "Clipboard";
      }, 1000);

      navigator.clipboard.writeText(content);
    });

    actions.append(cpbutton);
  }

  title.append(actions);

  parent.closest(".highlight").prepend(title);
}
