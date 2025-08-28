document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu elements
  const mobileMenu = document.getElementById("mobile-menu"); 
  const mobileMenuOpenBtn = document.getElementById("mobile-menu-open"); 
  const mobileMenuCloseBtn = document.getElementById("mobile-menu-close"); 

  // Open mobile menu
  mobileMenuOpenBtn.addEventListener("click", () => 
    mobileMenu.classList.add("active")
  );

  // Close mobile menu
  mobileMenuCloseBtn.addEventListener("click", () => 
    mobileMenu.classList.remove("active")
  );

  // Hero section & navigation
  const heroContainer = document.getElementById("hero"); 
  const navbar = document.querySelector("nav"); 
  const header = document.querySelector("header"); 
  const headerBackdrop = document.getElementById("header-drop-down"); 
  const headerBackdropContent = document.getElementById("header-drop-down-content"); 
  const headerBackdropContentItem = document.getElementById("header-drop-down-content-item"); 
  const menu_tabs =  document.getElementById("desk-nav-bar-links");
  let  activeSection = heroContainer?.querySelector(".section")
  // Adjust navbar style based on section visibility in hero
  if(heroContainer){
    heroContainer.addEventListener("scroll", () => {
    if(!activeSection) return
    const sections = heroContainer.querySelectorAll(".section");

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      // Check if this section is near top of hero container
      if (rect.top <= 40 && rect.bottom > 40) {
        if (section.classList.contains("text-black")) {
          activeSection =section
          navbar.style.filter = "invert()"; // switch nav to light mode
        } else if (section.classList.contains("text-white")) {
                activeSection =section
          navbar.style.filter = "none"; // switch nav to dark mode
        }
      }
    });
  });
  }

  let previousNavbarFilter = "none";
  let showTimeout, hideTimeout;

function showBackdrop(e) {
  clearTimeout(hideTimeout); // cancel hide if queued
  // Only set previousNavbarFilter if it's NOT the dropdown
  if (e.currentTarget !== headerBackdropContent) {
    previousNavbarFilter = navbar.style.filter;
  }

  navbar.style.filter = "invert()";
  header.style.backgroundColor = "rgb(255, 255, 255)";
  headerBackdrop.style.height = (window.innerHeight - header.offsetHeight - 10) + 'px';
  headerBackdrop.style.top = '100%';
  headerBackdrop.style.opacity = '1';
  headerBackdrop.style.background = '#f1f1f151';
  // headerBackdropContentItem.style.opacity = 1;
}
function hideBackdrop() {
  clearTimeout(showTimeout);
  hideTimeout = setTimeout(() => {
    // always reset background
    
    if (header.dataset.isHome === "true") {
      header.style.backgroundColor = "transparent";
      if (activeSection) {
        if (activeSection.classList.contains("text-black")) {
          navbar.style.filter = "invert()"; // switch nav to light mode
        } else if (activeSection.classList.contains("text-white")) {
          navbar.style.filter = "none"; // switch nav to dark mode
        }
      } else {
        navbar.style.filter = previousNavbarFilter;
      }
    }
    else{
     header.style.backgroundColor = "black";
       navbar.style.filter = "none"; 
    }

    // backdrop reset
    headerBackdrop.style.top = "0%";
    headerBackdrop.style.background = "transparent";
    headerBackdrop.style.height = "0";
    headerBackdrop.style.opacity = 0;
    // headerBackdropContentItem.style.opacity = 0;
  }, 200);
}

menu_tabs.addEventListener("mouseenter", showBackdrop);
menu_tabs.addEventListener("mouseleave", hideBackdrop);

headerBackdropContent.addEventListener("mouseenter", showBackdrop);
headerBackdropContent.addEventListener("mouseleave", hideBackdrop);

});
