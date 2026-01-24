      document.addEventListener("DOMContentLoaded", function () {
        const menuButton = document.getElementById("mobile-menu-button");
        const mobileMenu = document.getElementById("mobile-menu");

        if (menuButton && mobileMenu) {
          menuButton.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");

            // Toggle aria-expanded attribute for accessibility
            const isExpanded = mobileMenu.classList.contains("hidden")
              ? "false"
              : "true";
            menuButton.setAttribute("aria-expanded", isExpanded);

            // Update aria-label
            const newLabel = isExpanded === "true" ? "Close menu" : "Open menu";
            menuButton.setAttribute("aria-label", newLabel);
          });

          // Close menu when clicking outside
          document.addEventListener("click", function (event) {
            if (
              !mobileMenu.contains(event.target) &&
              !menuButton.contains(event.target)
            ) {
              mobileMenu.classList.add("hidden");
              menuButton.setAttribute("aria-expanded", "false");
              menuButton.setAttribute("aria-label", "Open menu");
            }
          });

          // Close menu on escape key
          document.addEventListener("keydown", function (event) {
            if (
              event.key === "Escape" &&
              !mobileMenu.classList.contains("hidden")
            ) {
              mobileMenu.classList.add("hidden");
              menuButton.setAttribute("aria-expanded", "false");
              menuButton.setAttribute("aria-label", "Open menu");
            }
          });
        }
      });