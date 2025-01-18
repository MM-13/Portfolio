let currentImageIndex = 0;
let currentProjectId = null;

function openOverlay(projectId) {
    const overlay = document.getElementById('overlay');
    const project = projectsData.find(p => p.id === projectId);

    if (!project) return;

    // Set title, description, and other content
    overlay.querySelector('#overlay-title').textContent = project.title;
    overlay.querySelector('#overlay-description').textContent = project.description;
    overlay.querySelector('#overlay-platform').textContent = project.platform;
    overlay.querySelector('#overlay-language').textContent = project.language;

    // Initialize image slider
    currentImageIndex = 0;
    currentProjectId = projectId; // Store the current project id
    updateSliderImage(project.images);

    // Handle download button
    const downloadButton = overlay.querySelector('#overlay-download');
    downloadButton.href = project.downloadLink;
    downloadButton.style.display = 'inline-block';

    // Handle play button if available
    const playButton = overlay.querySelector('#overlay-play');
    if (project.playLink) {
        playButton.href = project.playLink;
        playButton.style.display = 'inline-block';
    } else {
        playButton.style.display = 'none';
    }

    // Show overlay
    overlay.style.display = 'block';
}

function closeOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

// Update image in slider
function updateSliderImage(images) {
    const sliderImage = document.getElementById('overlay-slider-image');
    sliderImage.src = images[currentImageIndex];
}

// Navigate to previous image
function prevImage() {
    const project = projectsData.find(p => p.id === currentProjectId);
    if (!project) return;
    currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
    updateSliderImage(project.images);
}

// Navigate to next image
function nextImage() {
    const project = projectsData.find(p => p.id === currentProjectId);
    if (!project) return;
    currentImageIndex = (currentImageIndex + 1) % project.images.length;
    updateSliderImage(project.images);
}

function myFunction(website) {
    window.open(website, "_blank");
}
