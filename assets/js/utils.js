const sections = [
    { id: "introduction", title: "Introduction", file: "readmes/Introduction.md" },
    { id: "research", title: "Research Questions", file: "readmes/ResearchQuestions.md" },
    { id: "regression", title: "Regression Analysis", file: "readmes/RegressionAnalysis.md" },
    { id: "clustering", title: "Clustering", file: "readmes/Clutering.md" },
    { id: "network", title: "Network", file: "readmes/Network.md" },
  ];
  
  const topBarButtons = document.getElementById("top-bar-buttons");
  const sectionsContainer = document.getElementById("sections-container");
  
  // Function to fetch and display content
  async function loadSections() {
    for (const section of sections) {
      // Create button in the top bar
      const button = document.createElement("button");
      button.innerText = section.title;
      button.onclick = () => document.getElementById(section.id).scrollIntoView({ behavior: "smooth" });
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
  