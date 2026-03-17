
// Pricing Calculator — pricing-calculator.js


(function () {
  "use strict";
 
    // Looks for id="pb-total-amount" in your hardcoded HTML
    const totalEl = document.getElementById("pb-total-amount");
 
    /* ── Initialize bilingual extra-pages as disabled ── */
    const extraPagesInput = document.getElementById("extra-pages");
    if (extraPagesInput) {
        extraPagesInput.disabled = true;
        const parent = extraPagesInput.closest(".bilingual-support-feature") ||
                    extraPagesInput.parentElement;
        if (parent) parent.classList.add("bilingual-locked");
    }
 
    /* State */
    // Map of key → { label, amount }
    const selections = new Map();
 
    /* Enforce non-negative on all number inputs */
    document.querySelectorAll('input[type="number"]').forEach((input) => {
        input.setAttribute("min", "0");
        input.setAttribute("placeholder", "0");
        input.value = "";
    
        input.addEventListener("input", () => {
        let val = parseInt(input.value, 10);
        if (isNaN(val) || val < 0) {
            input.value = "";
            val = 0;
        }
        handleNumberInput(input, val);
        });
 
        // Also block manual minus key
        input.addEventListener("keydown", (e) => {
            if (e.key === "-" || e.key === "e") e.preventDefault();
        });

        input.addEventListener("focus", () => {
            if (input.value === "0") input.value = "";
        });

        input.addEventListener("blur", () => {
            if (input.value === "") handleNumberInput(input, 0);
        });
    });
 
    /* Radio buttons */
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener("click", () => {
            const groupName = radio.name;

            // If clicking an already-checked radio, uncheck it
            if (radio.dataset.wasChecked === "true") {
                radio.checked = false;
                radio.dataset.wasChecked = "false";
                for (const [key] of selections) {
                    if (key.startsWith("radio:" + groupName + ":")) {
                        selections.delete(key);
                        break;
                    }
                }
                refreshUI();
                return;
            }

            // Mark all in this group as unchecked, then mark this one
            document.querySelectorAll(`input[name="${groupName}"]`).forEach((r) => {
                r.dataset.wasChecked = "false";
            });
            radio.dataset.wasChecked = "true";

            const price = parseFloat(radio.dataset.price) || 0;

            for (const [key] of selections) {
                if (key.startsWith("radio:" + groupName + ":")) {
                    selections.delete(key);
                    break;
                }
            }

            if (price > 0) {
                selections.set("radio:" + groupName + ":" + radio.id, { amount: price });
            }

            refreshUI();
        });
    });
 
    /* Checkboxes */
    document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.addEventListener("change", () => {
            const key = "checkbox:" + cb.id;
            if (cb.checked) {
                const price = parseFloat(cb.dataset.price) || 0;
                 if (price > 0) selections.set(key, { amount: price });
            } else {
                selections.delete(key);
            }
 
            // If this is the bilingual checkbox, gate the extra-pages input
            if (cb.id === "bilingual") {
                const extraPages = document.getElementById("extra-pages");
                if (extraPages) {
                    extraPages.disabled = !cb.checked;
                    extraPages.value = "";                       // reset count when toggled
                    selections.delete("number:extra-pages");     // clear any saved amount
                    // Toggle dim class on parent for label styling
                    const parent = extraPages.closest(".bilingual-support-feature") ||
                                    extraPages.parentElement;
                    if (parent) parent.classList.toggle("bilingual-locked", !cb.checked);
                }
            }
 
            refreshUI();
        });
    });
 
    /*Number input handler*/
    function handleNumberInput(input, val) {
            const key = "number:" + input.id;
            const pricePerUnit = parseFloat(input.dataset.pagePrice) || 0;
            const total = val * pricePerUnit;
        
            if (total > 0) {
                selections.set(key, { amount: total });
            } else {
                selections.delete(key);
            }
            refreshUI();
    }
 
    function refreshUI() {
        let total = 0;
        selections.forEach((v) => (total += v.amount));
    
        totalEl.textContent = "$" + total.toLocaleString();
        totalEl.classList.remove("bump");
        void totalEl.offsetWidth; // reflow
        totalEl.classList.add("bump");
        setTimeout(() => totalEl.classList.remove("bump"), 200);
    }

    const footer = document.querySelector("footer");
    const priceBar = document.getElementById("price-bar");

    function updateBarPosition() {
        if (!footer || !priceBar) return;
        const footerTop = footer.getBoundingClientRect().top;
        const barHeight = priceBar.offsetHeight;
        const overlap = window.innerHeight - footerTop;

        if (overlap > 0) {
            priceBar.style.bottom = overlap + "px";
        } else {
            priceBar.style.bottom = "0px";
        }
    }

    window.addEventListener("scroll", updateBarPosition);
    window.addEventListener("resize", updateBarPosition);
    updateBarPosition();
})();