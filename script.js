const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Unsplash API
const count = 30;
const apiKey = 'Hj9Eht-r81D9hZBrClJ16chgfP3Jy_a9cNqWxr2aJ-w'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links & Photos, Add to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    // Run function for each object in photoArray
    photoArray.forEach(photo => {
        // Create <a> to link to img source
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // Create <img> tag and add source and alt description attributes
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event Listener, check when each has finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then place both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

//  Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
        
    } catch (error) {
        // Catch error here
        console.log('error!', error)
    }
}

// Check to see if scrolling near to the bottom of the page, if so re-run getPhotos.
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos();