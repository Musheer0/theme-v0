///header-dropdown
const element = document.getElementById("desk-nav-bar-links");
const content = document.getElementById("header-drop-down-content");

let activeHover = null;

Array.from(element.children).forEach((e) => {
  e.addEventListener("mouseover", () => {
    // reset old active item
    if (activeHover && activeHover !== e.id) {
      const prevActiveElement = document.getElementById(
        "header-drop-down-content-items-" + activeHover
      );
      if (prevActiveElement) {
        prevActiveElement.style.opacity = 0;
        prevActiveElement.parentElement.style.visibility ='hidden'
        prevActiveElement.style.pointerEvents = 'none'

      }
    }

    // update current
    activeHover = e.id;
    const activeElement = document.getElementById(
      "header-drop-down-content-items-" + activeHover
    );
    if (activeElement) {
      content.style.height = activeElement.scrollHeight+20 + "px"; // use scrollHeight instead of style.height
      activeElement.style.opacity = 1;
      
      activeElement.parentElement.style.visibility ='visible'
      activeElement.style.pointerEvents = 'all'
    }
  });
});
