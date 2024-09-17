const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const videoList = document.getElementById('videos');
    const filterCategory = document.getElementById('filter-category');
    const videoPlayer = document.getElementById('current-video');

    let videos = [];

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const videoFile = document.getElementById('video-file').files[0];
        const playerName = document.getElementById('player-name').value;
        const category = document.getElementById('video-category').value;

        if (!videoFile || !playerName || !category) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }

        const video = {
            id: Date.now(),
            name: videoFile.name,
            player: playerName,
            category: category,
            url: URL.createObjectURL(videoFile)
        };

        videos.push(video);
        renderVideos();
        uploadForm.reset();
        alert('Video subido exitosamente.');
    });

    filterCategory.addEventListener('change', renderVideos);

    function renderVideos() {
        const category = filterCategory.value;
        const filteredVideos = category === 'todos' ? videos : videos.filter(v => v.category === category);

        videoList.innerHTML = '';
        filteredVideos.forEach(video => {
            const li = document.createElement('li');
            li.className = 'video-item';
            li.innerHTML = `
                <strong>${video.name}</strong> - ${video.player} (${video.category})
                <button onclick="playVideo(${video.id})">Reproducir</button>
                <button onclick="editVideo(${video.id})">Editar</button>
                <button onclick="deleteVideo(${video.id})">Eliminar</button>
            `;
            videoList.appendChild(li);
        });
    }

    window.playVideo = (id) => {
        const video = videos.find(v => v.id === id);
        if (video) {
            videoPlayer.src = video.url;
            videoPlayer.style.display = 'block';
            videoPlayer.play();
        }
    };

    window.editVideo = (id) => {
        const video = videos.find(v => v.id === id);
        const newName = prompt('Nuevo nombre del jugador:', video.player);
        if (newName) {
            video.player = newName;
            renderVideos();
            alert('Video actualizado exitosamente.');
        }
    };

    window.deleteVideo = (id) => {
        if (confirm('¿Está seguro de que desea eliminar este video?')) {
            const video = videos.find(v => v.id === id);
    
            if (videoPlayer.src === video.url) {
                videoPlayer.pause();
                videoPlayer.src = '';
                videoPlayer.style.display = 'none';
            }
    
            videos = videos.filter(v => v.id !== id);
            renderVideos();
            alert('Video eliminado exitosamente.');
        }
    };
    
});