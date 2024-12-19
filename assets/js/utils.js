const sections = [
    { id: "introduction", title: "Introduction", file: "readmes/Introduction.md" },
    { id: "research", title: "Research Questions", file: "readmes/ResearchQuestions.md" },
    { id: "regression", title: "Regression Analysis", file: "readmes/RegressionAnalysis.md" },
    { id: "clustering", title: "Clustering", file: "readmes/Clutering.md" },
    { id: "network", title: "Network", file: "readmes/Network.md" },
  ];
  
  const topBarButtons = document.getElementById("top-bar-buttons");
  const sectionsContainer = document.getElementById("sections-container");
  
  function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    const startPosition = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duration in milliseconds
    let startTime = null;
  
    function easeInOut(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
    }
  
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOut(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
  
    requestAnimationFrame(animation);
  }
  

  // Function to fetch and display content
  async function loadSections() {
    for (const section of sections) {
      // Create button in the top bar
      const button = document.createElement("button");
      button.innerText = section.title;
      button.onclick = () => document.getElementById(section.id).scrollIntoView({ behavior: "smooth" });
      //   button.onclick = () => smoothScroll(section.id);
      topBarButtons.appendChild(button);
  
      // Create section
      const sectionDiv = document.createElement("div");
      sectionDiv.id = section.id;
      sectionDiv.classList.add("section");
  
      try {
        // Fetch the content of the file
        const response = await fetch(section.file);
        const markdown = await response.text();
  
        // Convert Markdown to HTML if needed
        sectionDiv.innerHTML = `<h2>${section.title}</h2><p>${markdown}</p>`;
      } catch (error) {
        sectionDiv.innerHTML = `<h2>${section.title}</h2><p>Failed to load content. Please try again later.</p>`;
      }

      sectionsContainer.appendChild(sectionDiv);
    }
  }
  
  // Load all sections on page load
  loadSections();
  