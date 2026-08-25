const filterGroup = document.querySelector("[data-project-filters]");

if (filterGroup) {
  const filterButtons = Array.from(
    filterGroup.querySelectorAll("[data-filter]"),
  );
  const projects = Array.from(document.querySelectorAll("[data-category]"));
  const filterStatus = document.querySelector("[data-filter-status]");

  const showProjects = (selectedFilter, selectedButton) => {
    let visibleCount = 0;

    projects.forEach((project) => {
      const categories = project.dataset.category.split(" ");
      const shouldShow =
        selectedFilter === "all" || categories.includes(selectedFilter);

      project.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    filterButtons.forEach((button) => {
      button.setAttribute("aria-pressed", button === selectedButton);
    });

    if (filterStatus) {
      const filterName = selectedButton.textContent.trim();
      filterStatus.textContent =
        selectedFilter === "all"
          ? `Showing all ${visibleCount} projects.`
          : `Showing ${visibleCount} projects filtered by ${filterName}.`;
    }
  };

  filterGroup.hidden = false;

  filterGroup.addEventListener("click", (event) => {
    const selectedButton = event.target.closest("[data-filter]");

    if (!selectedButton || !filterGroup.contains(selectedButton)) {
      return;
    }

    showProjects(selectedButton.dataset.filter, selectedButton);
  });
}
