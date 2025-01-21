let currentImageIndex = 0;
let currentProjectId = null;

function openOverlay(projectId) {
    const overlay = document.getElementById('overlay');
    const project = projectsData.find(p => p.id === projectId);

    if (!project) return;

    // Set title, description, and other content
    overlay.querySelector('#overlay-title').textContent = project.title;
    overlay.querySelector('#overlay-description').textContent = project.description;
    overlay.querySelector('#overlay-uniqueness').textContent = project.uniqueness;
    overlay.querySelector('#overlay-platform').textContent = project.platform;
    overlay.querySelector('#overlay-language').textContent = project.language;

    // Initialize image slider
    currentImageIndex = 0;
    currentProjectId = projectId; // Store the current project id
    updateSliderImage(project.images);

     // Handle group project note
     const groupNote = overlay.querySelector('#overlay-group');
     groupNote.style.display = 'none'; // Reset visibility
     groupNote.textContent = '';       // Clear previous content

     if (project.group) {
         groupNote.textContent = "This was a group project / Game jam.";
         groupNote.style.display = 'block';
     }

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

const themeToggleBtn = document.getElementById('theme-toggle');
const icon = document.getElementById('icon');

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        icon.innerHTML = '&#9790;'; // moon icon
        document.documentElement.style.setProperty('--main-bg-color', '#ffffff');
        document.documentElement.style.setProperty('--main-text-color', '#000000');
        document.documentElement.style.setProperty('--sidebar-bg-color', '#f0f0f0');
        document.documentElement.style.setProperty('--footer-bg-color', '#e0e0e0');
        document.documentElement.style.setProperty('--project-hover-color', '#d0d0d0');
    } else {
        document.body.classList.remove('light-theme');
        icon.innerHTML = '&#9728;'; // sun icon
        document.documentElement.style.setProperty('--main-bg-color', '#1e1e1e');
        document.documentElement.style.setProperty('--main-text-color', '#d4d4d4');
        document.documentElement.style.setProperty('--sidebar-bg-color', '#252526');
        document.documentElement.style.setProperty('--footer-bg-color', '#181818');
        document.documentElement.style.setProperty('--project-hover-color', '#3c3c3c');
    }
}

function toggleTheme() {
    if (document.body.classList.contains('light-theme')) {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    }
}

themeToggleBtn.addEventListener('click', toggleTheme);

// Load the saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme);
}
