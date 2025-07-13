// DOM Elements
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const settingsBtn = document.getElementById('settings-btn');
const uploadBtn = document.getElementById('upload-btn');
const cameraBtn = document.getElementById('camera-btn');
const uploadModal = document.getElementById('upload-modal');
const cameraModal = document.getElementById('camera-modal');
const fullscreenModal = document.getElementById('fullscreen-modal');
const fileUpload = document.getElementById('file-upload');
const uploadPreview = document.getElementById('upload-preview');
const uploadSubmitBtn = document.querySelector('.upload-submit-btn');
const deleteAccountBtn = document.querySelector('.delete-account-btn');
const deleteModal = document.getElementById('delete-modal');
const closeModal = document.querySelectorAll('.close-modal');
const cancelBtn = document.querySelector('.cancel-btn');
const confirmDeleteBtn = document.querySelector('.confirm-delete-btn');
const saveBtn = document.querySelector('.save-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const menuToggle = document.getElementById('menu-toggle');
const userProfile = document.getElementById('user-profile');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const themeOptions = document.querySelectorAll('input[name="theme"]');
const toggleSwitches = document.querySelectorAll('.toggle-switch input');
const customLoader = document.getElementById('custom-loader');

// Camera Elements
const cameraVideo = document.getElementById('camera-video');
const startRecordingBtn = document.getElementById('start-recording');
const stopRecordingBtn = document.getElementById('stop-recording');
const switchCameraBtn = document.getElementById('switch-camera');
const recordingTime = document.getElementById('recording-time');

// Channel Avatar Elements
const channelAvatar = document.getElementById('channel-avatar');
const channelAvatarUpload = document.getElementById('channel-avatar-upload');

// Profile Banner Elements
const profileBanner = document.getElementById('profile-banner');
const bannerUpload = document.getElementById('banner-upload');
const changeBannerBtn = document.getElementById('change-banner-btn');

// Data Storage
let currentTheme = localStorage.getItem('theme') || 'light';
let currentCategory = 'all';
let history = JSON.parse(localStorage.getItem('history') || '[]');
let watchLater = JSON.parse(localStorage.getItem('watchLater') || '[]');
let likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
let uploadedFiles = [];
let uploadedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
let subscribers = JSON.parse(localStorage.getItem('subscribers') || '0');
let channelName = localStorage.getItem('channelName') || 'Your Channel';
let playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
let isSubscribed = localStorage.getItem('isSubscribed') === 'true';
let userAvatar = localStorage.getItem('userAvatar') || 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=U';
let profileAvatar = localStorage.getItem('profileAvatar') || 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=U';
let channelAvatarUrl = localStorage.getItem('channelAvatarUrl') || 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=U';
let profileBannerUrl = localStorage.getItem('profileBannerUrl') || 'https://via.placeholder.com/800x200/4CAF50/FFFFFF?text=Channel+Banner';
let channelDescription = localStorage.getItem('channelDescription') || 'Web developer and content creator. Sharing knowledge and experiences about web development, programming, and technology.';

// Profile Settings Data
let profileSettings = JSON.parse(localStorage.getItem('profileSettings') || JSON.stringify({
     displayName: 'John Doe',
     username: '@johndoe',
     bio: 'Web developer and content creator',
     email: 'john@example.com'
}));

// Camera Variables
let mediaStream = null;
let mediaRecorder = null;
let recordedChunks = [];
let recordingStartTime = 0;
let recordingInterval = null;
let currentFacingMode = 'user';

// Video Data for different categories with YouTube links
const videoData = {
     all: [
          { id: 1, title: "Amazing Social Media Tips & Tricks", channel: "Tech Channel", views: "1.2M", time: "2 days ago", duration: "10:30", thumbnail: "https://via.placeholder.com/320x180/FF6B6B/FFFFFF?text=Video+1", channelAvatar: "https://via.placeholder.com/36x36/4ECDC4/FFFFFF?text=C", category: "tech", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
          { id: 2, title: "Building Responsive Websites", channel: "Web Dev Pro", views: "856K", time: "1 week ago", duration: "15:45", thumbnail: "https://via.placeholder.com/320x180/45B7D1/FFFFFF?text=Video+2", channelAvatar: "https://via.placeholder.com/36x36/96CEB4/FFFFFF?text=D", category: "tech", youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
          { id: 3, title: "CSS Animation Masterclass", channel: "CSS Master", views: "2.1M", time: "3 days ago", duration: "8:20", thumbnail: "https://via.placeholder.com/320x180/FFA07A/FFFFFF?text=Video+3", channelAvatar: "https://via.placeholder.com/36x36/DDA0DD/FFFFFF?text=E", category: "tech", youtubeUrl: "https://www.youtube.com/watch?v=JNua6L7DT0o" },
          { id: 4, title: "JavaScript ES6+ Features", channel: "JS Ninja", views: "3.4M", time: "5 days ago", duration: "12:15", thumbnail: "https://via.placeholder.com/320x180/98D8C8/FFFFFF?text=Video+4", channelAvatar: "https://via.placeholder.com/36x36/F7DC6F/FFFFFF?text=F", category: "tech", youtubeUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" },
          { id: 5, title: "React Hooks Tutorial", channel: "React Guru", views: "1.8M", time: "1 week ago", duration: "20:30", thumbnail: "https://via.placeholder.com/320x180/FFB6C1/FFFFFF?text=Video+5", channelAvatar: "https://via.placeholder.com/36x36/87CEEB/FFFFFF?text=G", category: "tech", youtubeUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM" },
          { id: 6, title: "UI/UX Design Principles", channel: "Design Studio", views: "950K", time: "4 days ago", duration: "6:45", thumbnail: "https://via.placeholder.com/320x180/DDA0DD/FFFFFF?text=Video+6", channelAvatar: "https://via.placeholder.com/36x36/FFB6C1/FFFFFF?text=H", category: "design", youtubeUrl: "https://www.youtube.com/watch?v=7kVeCqQCxlk" }
     ],
     music: [
          { id: 7, title: "Best Pop Hits 2024", channel: "Music World", views: "5.2M", time: "1 day ago", duration: "45:20", thumbnail: "https://via.placeholder.com/320x180/FF6B9D/FFFFFF?text=Music+1", channelAvatar: "https://via.placeholder.com/36x36/FF6B9D/FFFFFF?text=M", category: "music", youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk" },
          { id: 8, title: "Guitar Lessons for Beginners", channel: "Guitar Master", views: "2.8M", time: "3 days ago", duration: "18:45", thumbnail: "https://via.placeholder.com/320x180/4ECDC4/FFFFFF?text=Music+2", channelAvatar: "https://via.placeholder.com/36x36/4ECDC4/FFFFFF?text=G", category: "music", youtubeUrl: "https://www.youtube.com/watch?v=JGwWNGJdvx8" },
          { id: 9, title: "Piano Tutorial: Moonlight Sonata", channel: "Classical Piano", views: "1.5M", time: "1 week ago", duration: "25:30", thumbnail: "https://via.placeholder.com/320x180/45B7D1/FFFFFF?text=Music+3", channelAvatar: "https://via.placeholder.com/36x36/45B7D1/FFFFFF?text=P", category: "music", youtubeUrl: "https://www.youtube.com/watch?v=4Tr0otuiQuU" }
     ],
     gaming: [
          { id: 10, title: "Gaming Setup Tour 2024", channel: "Gaming Pro", views: "3.1M", time: "2 days ago", duration: "12:45", thumbnail: "https://via.placeholder.com/320x180/FF6B6B/FFFFFF?text=Gaming+1", channelAvatar: "https://via.placeholder.com/36x36/FF6B6B/FFFFFF?text=G", category: "gaming", youtubeUrl: "https://www.youtube.com/watch?v=1OWdw1Iqj8Y" },
          { id: 11, title: "Best Gaming Moments", channel: "Game Highlights", views: "4.7M", time: "5 days ago", duration: "8:20", thumbnail: "https://via.placeholder.com/320x180/4ECDC4/FFFFFF?text=Gaming+2", channelAvatar: "https://via.placeholder.com/36x36/4ECDC4/FFFFFF?text=H", category: "gaming", youtubeUrl: "https://www.youtube.com/watch?v=YbJOTdZBX1g" },
          { id: 12, title: "Gaming Tips & Tricks", channel: "Gaming Tips", views: "2.3M", time: "1 week ago", duration: "15:10", thumbnail: "https://via.placeholder.com/320x180/45B7D1/FFFFFF?text=Gaming+3", channelAvatar: "https://via.placeholder.com/36x36/45B7D1/FFFFFF?text=T", category: "gaming", youtubeUrl: "https://www.youtube.com/watch?v=8jLOx1hD3_o" }
     ],
     news: [
          { id: 13, title: "Breaking News Today", channel: "News Daily", views: "8.9M", time: "2 hours ago", duration: "5:30", thumbnail: "https://via.placeholder.com/320x180/FF6B6B/FFFFFF?text=News+1", channelAvatar: "https://via.placeholder.com/36x36/FF6B6B/FFFFFF?text=N", category: "news", youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
          { id: 14, title: "Technology News Update", channel: "Tech News", views: "3.2M", time: "1 day ago", duration: "10:15", thumbnail: "https://via.placeholder.com/320x180/4ECDC4/FFFFFF?text=News+2", channelAvatar: "https://via.placeholder.com/36x36/4ECDC4/FFFFFF?text=T", category: "news", youtubeUrl: "https://www.youtube.com/watch?v=JNua6L7DT0o" },
          { id: 15, title: "World News Roundup", channel: "Global News", views: "6.5M", time: "3 days ago", duration: "12:45", thumbnail: "https://via.placeholder.com/320x180/45B7D1/FFFFFF?text=News+3", channelAvatar: "https://via.placeholder.com/36x36/45B7D1/FFFFFF?text=W", category: "news", youtubeUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk" }
     ],
     sports: [
          { id: 16, title: "Football Highlights", channel: "Sports Central", views: "7.2M", time: "1 day ago", duration: "8:45", thumbnail: "https://via.placeholder.com/320x180/FF6B6B/FFFFFF?text=Sports+1", channelAvatar: "https://via.placeholder.com/36x36/FF6B6B/FFFFFF?text=S", category: "sports", youtubeUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM" },
          { id: 17, title: "Basketball Best Plays", channel: "Basketball Pro", views: "4.1M", time: "2 days ago", duration: "6:30", thumbnail: "https://via.placeholder.com/320x180/4ECDC4/FFFFFF?text=Sports+2", channelAvatar: "https://via.placeholder.com/36x36/4ECDC4/FFFFFF?text=B", category: "sports", youtubeUrl: "https://www.youtube.com/watch?v=7kVeCqQCxlk" },
          { id: 18, title: "Tennis Championship", channel: "Tennis World", views: "2.8M", time: "1 week ago", duration: "15:20", thumbnail: "https://via.placeholder.com/320x180/45B7D1/FFFFFF?text=Sports+3", channelAvatar: "https://via.placeholder.com/36x36/45B7D1/FFFFFF?text=T", category: "sports", youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk" }
     ]
};

// Data Structures for Search
const searchData = {
     videos: [
          { id: 1, title: "Amazing Social Media Tips & Tricks", channel: "Tech Channel", views: "1.2M", time: "2 days ago", duration: "10:30", thumbnail: "https://via.placeholder.com/320x180/FF6B6B/FFFFFF?text=Video+1", channelAvatar: "https://via.placeholder.com/36x36/4ECDC4/FFFFFF?text=C", category: "tech", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", tags: ["social media", "tips", "tricks", "tech"] },
          { id: 2, title: "Building Responsive Websites", channel: "Web Dev Pro", views: "856K", time: "1 week ago", duration: "15:45", thumbnail: "https://via.placeholder.com/320x180/45B7D1/FFFFFF?text=Video+2", channelAvatar: "https://via.placeholder.com/36x36/96CEB4/FFFFFF?text=D", category: "tech", youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", tags: ["web development", "responsive", "websites", "coding"] },
          { id: 3, title: "CSS Animation Masterclass", channel: "CSS Master", views: "2.1M", time: "3 days ago", duration: "8:20", thumbnail: "https://via.placeholder.com/320x180/FFA07A/FFFFFF?text=Video+3", channelAvatar: "https://via.placeholder.com/36x36/DDA0DD/FFFFFF?text=E", category: "tech", youtubeUrl: "https://www.youtube.com/watch?v=JNua6L7DT0o", tags: ["css", "animation", "web design", "frontend"] },
          { id: 4, title: "JavaScript ES6+ Features", channel: "JS Ninja", views: "3.4M", time: "5 days ago", duration: "12:15", thumbnail: "https://via.placeholder.com/320x180/98D8C8/FFFFFF?text=Video+4", channelAvatar: "https://via.placeholder.com/36x36/F7DC6F/FFFFFF?text=F", category: "tech", youtubeUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk", tags: ["javascript", "es6", "programming", "coding"] },
          { id: 5, title: "React Hooks Tutorial", channel: "React Guru", views: "1.8M", time: "1 week ago", duration: "20:30", thumbnail: "https://via.placeholder.com/320x180/FFB6C1/FFFFFF?text=Video+5", channelAvatar: "https://via.placeholder.com/36x36/87CEEB/FFFFFF?text=G", category: "tech", youtubeUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM", tags: ["react", "hooks", "frontend", "javascript"] },
          { id: 6, title: "UI/UX Design Principles", channel: "Design Studio", views: "950K", time: "4 days ago", duration: "6:45", thumbnail: "https://via.placeholder.com/320x180/DDA0DD/FFFFFF?text=Video+6", channelAvatar: "https://via.placeholder.com/36x36/FFB6C1/FFFFFF?text=H", category: "design", youtubeUrl: "https://www.youtube.com/watch?v=7kVeCqQCxlk", tags: ["ui", "ux", "design", "principles"] },
          { id: 7, title: "Best Pop Hits 2024", channel: "Music World", views: "5.2M", time: "1 day ago", duration: "45:20", thumbnail: "https://via.placeholder.com/320x180/FF6B9D/FFFFFF?text=Music+1", channelAvatar: "https://via.placeholder.com/36x36/FF6B9D/FFFFFF?text=M", category: "music", youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk", tags: ["music", "pop", "hits", "2024"] },
          { id: 8, title: "Guitar Lessons for Beginners", channel: "Guitar Master", views: "2.8M", time: "3 days ago", duration: "18:45", thumbnail: "https://via.placeholder.com/320x180/4ECDC4/FFFFFF?text=Music+2", channelAvatar: "https://via.placeholder.com/36x36/4ECDC4/FFFFFF?text=G", category: "music", youtubeUrl: "https://www.youtube.com/watch?v=JGwWNGJdvx8", tags: ["guitar", "lessons", "beginners", "music"] },
          { id: 9, title: "Gaming Setup Tour 2024", channel: "Gaming Pro", views: "3.1M", time: "2 days ago", duration: "12:45", thumbnail: "https://via.placeholder.com/320x180/FF6B6B/FFFFFF?text=Gaming+1", channelAvatar: "https://via.placeholder.com/36x36/FF6B6B/FFFFFF?text=G", category: "gaming", youtubeUrl: "https://www.youtube.com/watch?v=1OWdw1Iqj8Y", tags: ["gaming", "setup", "tour", "2024"] },
          { id: 10, title: "Football Highlights", channel: "Sports Central", views: "7.2M", time: "1 day ago", duration: "8:45", thumbnail: "https://via.placeholder.com/320x180/FF6B6B/FFFFFF?text=Sports+1", channelAvatar: "https://via.placeholder.com/36x36/FF6B6B/FFFFFF?text=S", category: "sports", youtubeUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM", tags: ["football", "highlights", "sports", "soccer"] }
     ],
     channels: [
          { id: 1, name: "Tech Channel", handle: "@techchannel", subscribers: "1.2M", videos: 45, avatar: "https://via.placeholder.com/36x36/4ECDC4/FFFFFF?text=T" },
          { id: 2, name: "Web Dev Pro", handle: "@webdevpro", subscribers: "856K", videos: 32, avatar: "https://via.placeholder.com/36x36/96CEB4/FFFFFF?text=W" },
          { id: 3, name: "CSS Master", handle: "@cssmaster", subscribers: "2.1M", videos: 67, avatar: "https://via.placeholder.com/36x36/DDA0DD/FFFFFF?text=C" },
          { id: 4, name: "JS Ninja", handle: "@jsninja", subscribers: "3.4M", videos: 89, avatar: "https://via.placeholder.com/36x36/F7DC6F/FFFFFF?text=J" },
          { id: 5, name: "React Guru", handle: "@reactguru", subscribers: "1.8M", videos: 54, avatar: "https://via.placeholder.com/36x36/87CEEB/FFFFFF?text=R" }
     ],
     playlists: [
          { id: 1, name: "Web Development Tutorials", videos: 12, channel: "Web Dev Pro" },
          { id: 2, name: "JavaScript Basics", videos: 8, channel: "JS Ninja" },
          { id: 3, name: "React Fundamentals", videos: 15, channel: "React Guru" },
          { id: 4, name: "CSS Animations", videos: 6, channel: "CSS Master" },
          { id: 5, name: "Tech Tips & Tricks", videos: 20, channel: "Tech Channel" }
     ]
};

// Theme Management
function applyTheme(theme) {
     body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
     currentTheme = theme;
     localStorage.setItem('theme', theme);

     // Update theme toggle icon
     const themeIcon = themeToggle.querySelector('i');
     const themeText = themeToggle.querySelector('span');

     if (theme === 'dark') {
          themeIcon.className = 'fas fa-sun';
          themeText.textContent = 'Light Mode';
     } else {
          themeIcon.className = 'fas fa-moon';
          themeText.textContent = 'Dark Mode';
     }
}

// Initialize theme
applyTheme(currentTheme);

// Theme Toggle
themeToggle.addEventListener('click', () => {
     const newTheme = currentTheme === 'light' ? 'dark' : 'light';
     applyTheme(newTheme);
     showMessage(`Switched to ${newTheme} theme`, 'success');
});

// Theme Preview Hover Effect
document.querySelectorAll('.theme-option').forEach(option => {
     option.addEventListener('mouseenter', () => {
          const theme = option.dataset.theme;
          applyTheme(theme);
     });

     option.addEventListener('mouseleave', () => {
          applyTheme(currentTheme);
     });

     option.addEventListener('click', () => {
          const theme = option.dataset.theme;
          applyTheme(theme);
          showMessage(`Switched to ${theme} theme`, 'success');
     });
});

// Custom Loader Functions
function showLoader() {
     customLoader.style.display = 'flex';
}

function hideLoader() {
     customLoader.style.display = 'none';
}

// Show loader during page transitions
function showPageWithLoader(pageId) {
     showLoader();
     setTimeout(() => {
          showPage(pageId);
          hideLoader();
     }, 1000);
}

// Navigation
function showPage(pageId) {
     // Hide all pages
     document.querySelectorAll('.page').forEach(page => {
          page.classList.remove('active');
     });

     // Show selected page
     document.getElementById(pageId).classList.add('active');

     // Update sidebar active state
     sidebarItems.forEach(item => {
          item.classList.remove('active');
     });

     // Find and activate corresponding sidebar item
     const activeItem = document.querySelector(`[data-page="${pageId}"]`);
     if (activeItem) {
          activeItem.classList.add('active');
     }

     // Load content based on page
     loadPageContent(pageId);
}

function loadPageContent(pageId) {
     switch (pageId) {
          case 'home-page':
               loadVideos('home-video-grid', currentCategory);
               break;
          case 'your-channel-page':
               loadChannelPage();
               break;
          case 'trending-page':
               loadTrendingVideos();
               break;
          case 'subscriptions-page':
               loadSubscriptionVideos();
               break;
          case 'history-page':
               loadHistory();
               break;
          case 'watch-later-page':
               loadWatchLater();
               break;
          case 'liked-videos-page':
               loadLikedVideos();
               break;
          case 'settings-page':
               loadProfileSettings();
               // Initialize banner upload after a short delay
               setTimeout(() => {
                    setupBannerUpload();
               }, 100);
               break;
     }
}

// Sidebar Navigation
sidebarItems.forEach(item => {
     item.addEventListener('click', () => {
          const pageId = item.dataset.page;
          if (pageId) {
               showPageWithLoader(pageId);
          }
     });
});

// Mobile Navigation
mobileNavItems.forEach(item => {
     item.addEventListener('click', (e) => {
          e.preventDefault();
          const pageId = item.dataset.page;
          if (pageId) {
               showPageWithLoader(pageId);
               updateMobileNavActive(item);
          }
     });
});

// Mobile Library Button
const libraryMobileBtn = document.querySelector('.library-mobile-btn');
const libraryModal = document.getElementById('library-modal');

if (libraryMobileBtn) {
     libraryMobileBtn.addEventListener('click', (e) => {
          e.preventDefault();
          libraryModal.style.display = 'block';
     });
}

// Library Modal Options
const libraryOptions = document.querySelectorAll('.library-option');
libraryOptions.forEach(option => {
     option.addEventListener('click', (e) => {
          const pageId = option.dataset.page;
          if (pageId) {
               showPageWithLoader(pageId);
               libraryModal.style.display = 'none';
          }
     });
});

// Mobile Menu Toggle
if (menuToggle) {
     menuToggle.addEventListener('click', () => {
          const sidebar = document.querySelector('.sidebar');
          sidebar.classList.toggle('open');
     });
}

// Library Dropdown
const libraryDropdown = document.getElementById('library-dropdown');
const libraryMenu = document.querySelector('.library-menu');

if (libraryDropdown) {
     libraryDropdown.addEventListener('click', (e) => {
          e.stopPropagation();
          libraryMenu.style.display = libraryMenu.style.display === 'block' ? 'none' : 'block';
     });

     // Close library menu when clicking outside
     document.addEventListener('click', (e) => {
          if (!libraryDropdown.contains(e.target) && !libraryMenu.contains(e.target)) {
               libraryMenu.style.display = 'none';
          }
     });

     // Handle library menu item clicks
     const libraryItems = libraryMenu.querySelectorAll('.dropdown-item');
     libraryItems.forEach(item => {
          item.addEventListener('click', (e) => {
               e.preventDefault();
               const pageId = item.dataset.page;
               if (pageId) {
                    showPageWithLoader(pageId);
                    libraryMenu.style.display = 'none';
               }
          });
     });
}

// Update mobile navigation active state
function updateMobileNavActive(activeItem) {
     mobileNavItems.forEach(item => item.classList.remove('active'));
     activeItem.classList.add('active');
}

// Channel Tab Navigation
document.addEventListener('click', (e) => {
     if (e.target.closest('.channel-tab')) {
          const tab = e.target.closest('.channel-tab');
          const tabName = tab.dataset.tab;

          // Update active tab
          document.querySelectorAll('.channel-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          // Show corresponding tab content
          document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
          document.getElementById(`${tabName}-tab`).classList.add('active');
     }
});

// Load Channel Page
function loadChannelPage() {
     const videoCount = document.getElementById('video-count');
     const subscriberCount = document.getElementById('subscriber-count');
     const channelTitle = document.querySelector('.channel-details h1');

     videoCount.textContent = uploadedVideos.length;
     subscriberCount.textContent = subscribers;
     channelTitle.textContent = channelName;

     // Update channel avatar from localStorage
     if (channelAvatar) {
          const savedChannelAvatar = localStorage.getItem('channelAvatarUrl');
          if (savedChannelAvatar) {
               channelAvatar.src = savedChannelAvatar;
               channelAvatarUrl = savedChannelAvatar;
          } else {
               channelAvatar.src = channelAvatarUrl;
          }
     }

     // Update channel banner from localStorage
     const channelBannerImg = document.getElementById('channel-banner-img');
     if (channelBannerImg) {
          const savedBannerUrl = localStorage.getItem('profileBannerUrl');
          if (savedBannerUrl) {
               channelBannerImg.src = savedBannerUrl;
               profileBannerUrl = savedBannerUrl;
          } else {
               channelBannerImg.src = profileBannerUrl;
          }
     }

     // Update channel handle to match username from saved settings
     const username = profileSettings.username || '@johndoe';
     const channelHandle = document.querySelector('.channel-handle');
     if (channelHandle) {
          channelHandle.textContent = username;
     }

     // Handle subscribe button visibility (show only for other users' channels)
     const channelActions = document.querySelector('.channel-actions');
     if (channelActions) {
          // Remove existing subscribe button
          const existingSubscribeBtn = channelActions.querySelector('.subscribe-btn');
          if (existingSubscribeBtn) {
               existingSubscribeBtn.remove();
          }

          // For now, we'll show subscribe button for demonstration
          // In a real app, you'd check if this is the current user's channel
          const subscribeBtn = document.createElement('button');
          subscribeBtn.className = `subscribe-btn ${isSubscribed ? 'subscribed' : ''}`;
          subscribeBtn.innerHTML = isSubscribed ? '<i class="fas fa-bell-slash"></i> Subscribed' : '<i class="fas fa-bell"></i> Subscribe';
          subscribeBtn.addEventListener('click', subscribeToChannel);
          channelActions.appendChild(subscribeBtn);
     }

     const channelVideosGrid = document.getElementById('channel-videos-grid');
     const emptyVideos = document.getElementById('empty-videos');

     if (uploadedVideos.length === 0) {
          channelVideosGrid.style.display = 'none';
          emptyVideos.style.display = 'block';
     } else {
          channelVideosGrid.style.display = 'grid';
          emptyVideos.style.display = 'none';

          channelVideosGrid.innerHTML = '';
          uploadedVideos.forEach(video => {
               const videoCard = createVideoCard(video);
               channelVideosGrid.appendChild(videoCard);
          });
     }

     // Load playlists
     loadPlaylists();
}

// Load Playlists
function loadPlaylists() {
     const playlistsTab = document.getElementById('playlists-tab');
     const emptyPlaylists = playlistsTab.querySelector('.empty-state');
     const createPlaylistBtn = playlistsTab.querySelector('.create-playlist-btn');

     if (playlists.length === 0) {
          emptyPlaylists.style.display = 'block';
     } else {
          emptyPlaylists.style.display = 'none';
          // Display playlists
          displayPlaylists();
     }

     // Add event listener for create playlist button
     if (createPlaylistBtn) {
          createPlaylistBtn.addEventListener('click', createPlaylist);
     }
}

// Display Playlists
function displayPlaylists() {
     const playlistsTab = document.getElementById('playlists-tab');
     const emptyState = playlistsTab.querySelector('.empty-state');

     if (playlists.length === 0) {
          emptyState.style.display = 'block';
          return;
     }

     emptyState.style.display = 'none';

     // Create playlists container
     let playlistsHTML = '<div class="playlists-grid">';
     playlists.forEach(playlist => {
          playlistsHTML += `
               <div class="playlist-card" data-playlist-id="${playlist.id}">
                    <div class="playlist-thumbnail">
                         <img src="${playlist.thumbnail || 'https://via.placeholder.com/320x180/4CAF50/FFFFFF?text=Playlist'}" alt="${playlist.name}">
                         <div class="playlist-overlay">
                              <i class="fas fa-play"></i>
                         </div>
                         <button class="playlist-delete-btn" title="Delete Playlist">×</button>
                    </div>
                    <div class="playlist-info">
                         <h3>${playlist.name}</h3>
                         <p>${playlist.videos.length} videos</p>
                         <div class="playlist-actions">
                              <button class="add-videos-btn" title="Add Videos">
                                   <i class="fas fa-plus"></i> Add Videos
                              </button>
                         </div>
                    </div>
               </div>
          `;
     });
     playlistsHTML += '</div>';

     playlistsTab.innerHTML = playlistsHTML;

     // Add event listeners for playlist actions
     const playlistCards = playlistsTab.querySelectorAll('.playlist-card');
     playlistCards.forEach(card => {
          const playlistId = parseInt(card.dataset.playlistId);

          // Delete playlist button
          const deleteBtn = card.querySelector('.playlist-delete-btn');
          deleteBtn.addEventListener('click', (e) => {
               e.stopPropagation();
               deletePlaylist(playlistId);
          });

          // Add videos button
          const addVideosBtn = card.querySelector('.add-videos-btn');
          addVideosBtn.addEventListener('click', (e) => {
               e.stopPropagation();
               showVideoSelector(playlistId);
          });
     });
}

// Delete Playlist
function deletePlaylist(playlistId) {
     if (confirm('Are you sure you want to delete this playlist? This action cannot be undone.')) {
          playlists = playlists.filter(p => p.id !== playlistId);
          localStorage.setItem('playlists', JSON.stringify(playlists));
          loadPlaylists();
          showMessage('Playlist deleted successfully!', 'success');
     }
}

// Create Playlist
function createPlaylist() {
     const playlistName = prompt('Enter playlist name:');
     if (playlistName && playlistName.trim()) {
          const newPlaylist = {
               id: Date.now(),
               name: playlistName.trim(),
               videos: [],
               thumbnail: 'https://via.placeholder.com/320x180/4CAF50/FFFFFF?text=Playlist'
          };
          playlists.push(newPlaylist);
          localStorage.setItem('playlists', JSON.stringify(playlists));
          loadPlaylists();

          // Show video selector for the new playlist
          showVideoSelector(newPlaylist.id);
          showMessage('Playlist created successfully!', 'success');
     }
}

// Show Video Selector for Playlist
function showVideoSelector(playlistId) {
     const selector = document.getElementById('playlist-video-selector');
     const videoList = document.getElementById('video-selection-list');
     const addBtn = document.getElementById('add-videos-to-playlist');

     // Clear previous selections
     videoList.innerHTML = '';

     // Add uploaded videos to selection
     uploadedVideos.forEach(video => {
          const videoItem = document.createElement('div');
          videoItem.className = 'video-selection-item';
          videoItem.dataset.videoId = video.id;
          videoItem.innerHTML = `
               <div class="video-selection-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
               </div>
               <div class="video-selection-info">
                    <h4>${video.title}</h4>
                    <p>${video.duration}</p>
               </div>
          `;

          videoItem.addEventListener('click', () => {
               videoItem.classList.toggle('selected');
          });

          videoList.appendChild(videoItem);
     });

     // Show selector
     selector.style.display = 'flex';

     // Handle add videos
     addBtn.onclick = () => {
          const selectedVideos = videoList.querySelectorAll('.video-selection-item.selected');
          const playlist = playlists.find(p => p.id === playlistId);

          if (playlist) {
               selectedVideos.forEach(item => {
                    const videoId = parseInt(item.dataset.videoId);
                    const video = uploadedVideos.find(v => v.id === videoId);
                    if (video && !playlist.videos.some(v => v.id === videoId)) {
                         playlist.videos.push(video);
                    }
               });

               localStorage.setItem('playlists', JSON.stringify(playlists));
               loadPlaylists();
               selector.style.display = 'none';
               showMessage('Videos added to playlist!', 'success');
          }
     };
}

// Cancel Video Selection
document.getElementById('cancel-video-selection').addEventListener('click', () => {
     document.getElementById('playlist-video-selector').style.display = 'none';
});

// Channel Customization
function customizeChannel() {
     const newName = prompt('Enter new channel name:', channelName);
     if (newName && newName.trim()) {
          channelName = newName.trim();
          localStorage.setItem('channelName', channelName);
          loadChannelPage();
          showMessage('Channel name updated successfully!', 'success');
     }
}

// Share Channel
function shareChannel() {
     const shareData = {
          title: channelName,
          text: `Check out ${channelName} on SocialTube!`,
          url: window.location.href
     };

     if (navigator.share) {
          navigator.share(shareData);
     } else {
          // Fallback for browsers that don't support Web Share API
          navigator.clipboard.writeText(window.location.href);
          showMessage('Channel link copied to clipboard!', 'success');
     }
}

// Subscribe to Channel
function subscribeToChannel() {
     const subscribeBtn = document.querySelector('.subscribe-btn');

     if (isSubscribed) {
          // Unsubscribe
          subscribers = Math.max(0, subscribers - 1);
          isSubscribed = false;
          subscribeBtn.classList.remove('subscribed');
          subscribeBtn.innerHTML = '<i class="fas fa-bell"></i> Subscribe';
          showMessage('Unsubscribed from channel', 'success');
     } else {
          // Subscribe
          subscribers++;
          isSubscribed = true;
          subscribeBtn.classList.add('subscribed');
          subscribeBtn.innerHTML = '<i class="fas fa-bell-slash"></i> Subscribed';
          showMessage('Thank you for subscribing!', 'success');
     }

     localStorage.setItem('subscribers', subscribers);
     localStorage.setItem('isSubscribed', isSubscribed);
     loadChannelPage();
}

// Filter Buttons
filterBtns.forEach(btn => {
     btn.addEventListener('click', () => {
          // Remove active class from all buttons
          filterBtns.forEach(b => b.classList.remove('active'));
          // Add active class to clicked button
          btn.classList.add('active');

          // Get category and filter videos
          const category = btn.dataset.category;
          currentCategory = category;
          loadVideos('home-video-grid', category);

          showMessage(`Filtered by: ${btn.textContent}`, 'success');
     });
});

// Load Videos Function
function loadVideos(containerId, category) {
     const container = document.getElementById(containerId);
     const videos = category === 'all' ? videoData.all : videoData[category] || [];

     container.innerHTML = '';

     videos.forEach(video => {
          const videoCard = createVideoCard(video);
          container.appendChild(videoCard);
     });
}

// Create Video Card
function createVideoCard(video) {
     const card = document.createElement('div');
     card.className = 'video-card';
     card.dataset.videoId = video.id;

     // Check if video is liked
     const isLiked = likedVideos.some(liked => liked.id === video.id);
     const likeIcon = isLiked ? 'fas fa-heart' : 'far fa-heart';
     const likeClass = isLiked ? 'liked' : '';

     // Check if this is an uploaded video (for delete button)
     const isUploadedVideo = uploadedVideos.some(uploaded => uploaded.id === video.id);
     const deleteButton = isUploadedVideo ? '<button class="video-delete-btn" title="Delete Video">×</button>' : '';

     card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}">
            <div class="video-duration">${video.duration}</div>
            <div class="play-overlay">
                <i class="fas fa-play"></i>
            </div>
            ${deleteButton}
        </div>
        <div class="video-info">
            <div class="channel-avatar">
                <img src="${video.channelAvatar}" alt="${video.channel}">
            </div>
            <div class="video-details">
                <h3 class="video-title">${video.title}</h3>
                <p class="channel-name">${video.channel}</p>
                <p class="video-stats">${video.views} views • ${video.time}</p>
            </div>
            <div class="video-actions">
                <button class="like-btn ${likeClass}" title="Like">
                    <i class="${likeIcon}"></i>
                </button>
                <button class="more-btn">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </div>
    `;

     // Add click event for fullscreen view
     card.addEventListener('click', (e) => {
          if (!e.target.closest('.more-btn')) {
               if (video.youtubeUrl) {
                    // Open YouTube video in new tab
                    window.open(video.youtubeUrl, '_blank');
               } else {
                    // Open uploaded video in fullscreen
                    openFullscreen(video);
               }
               addToHistory(video);
          }
     });

     // Add like button functionality
     const likeBtn = card.querySelector('.like-btn');
     likeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleLike(video);
          // Update like button appearance
          const icon = likeBtn.querySelector('i');
          if (likeBtn.classList.contains('liked')) {
               likeBtn.classList.remove('liked');
               icon.className = 'far fa-heart';
          } else {
               likeBtn.classList.add('liked');
               icon.className = 'fas fa-heart';
          }
     });

     // Add delete button functionality for uploaded videos
     const deleteBtn = card.querySelector('.video-delete-btn');
     if (deleteBtn) {
          deleteBtn.addEventListener('click', (e) => {
               e.stopPropagation();
               deleteVideo(video);
          });
     }

     // Add more button functionality
     const moreBtn = card.querySelector('.more-btn');
     moreBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          showVideoOptions(card, video);
     });

     return card;
}

// Delete Video Function
function deleteVideo(video) {
     if (confirm('Are you sure you want to delete this video? This action cannot be undone.')) {
          // Remove from uploaded videos
          uploadedVideos = uploadedVideos.filter(v => v.id !== video.id);
          localStorage.setItem('uploadedVideos', JSON.stringify(uploadedVideos));

          // Remove from playlists
          playlists.forEach(playlist => {
               playlist.videos = playlist.videos.filter(v => v.id !== video.id);
          });
          localStorage.setItem('playlists', JSON.stringify(playlists));

          // Reload channel page
          loadChannelPage();
          showMessage('Video deleted successfully!', 'success');
     }
}

// Load Trending Videos
function loadTrendingVideos() {
     const container = document.getElementById('trending-video-grid');
     const trendingVideos = [
          ...videoData.all.slice(0, 3),
          ...videoData.music.slice(0, 2),
          ...videoData.gaming.slice(0, 2),
          ...videoData.news.slice(0, 2),
          ...videoData.sports.slice(0, 2)
     ];

     container.innerHTML = '';
     trendingVideos.forEach(video => {
          const videoCard = createVideoCard(video);
          container.appendChild(videoCard);
     });
}

// Load Subscription Videos
function loadSubscriptionVideos() {
     const container = document.getElementById('subscriptions-video-grid');
     const subscriptionVideos = videoData.all.slice(0, 6);

     container.innerHTML = '';
     subscriptionVideos.forEach(video => {
          const videoCard = createVideoCard(video);
          container.appendChild(videoCard);
     });
}

// Load History
function loadHistory() {
     const container = document.getElementById('history-list');

     if (history.length === 0) {
          container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No history yet</p>';
          return;
     }

     container.innerHTML = '';
     history.forEach((item, index) => {
          const historyItem = createHistoryItem(item, index);
          container.appendChild(historyItem);
     });
}

// Create History Item
function createHistoryItem(item, index) {
     const historyItem = document.createElement('div');
     historyItem.className = 'history-item';

     historyItem.innerHTML = `
        <div class="history-thumbnail">
            <img src="${item.thumbnail}" alt="${item.title}">
        </div>
        <div class="history-info">
            <h3 class="history-title">${item.title}</h3>
            <p class="history-channel">${item.channel}</p>
            <p class="history-time">Watched ${item.watchedAt}</p>
        </div>
        <div class="history-actions">
            <button class="history-btn" title="Watch Again">
                <i class="fas fa-play"></i>
            </button>
            <button class="history-btn delete-history-btn" title="Remove from History">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

     // Add click events
     historyItem.addEventListener('click', () => {
          if (item.youtubeUrl) {
               window.open(item.youtubeUrl, '_blank');
          } else {
               openFullscreen(item);
          }
          addToHistory(item);
     });

     const deleteBtn = historyItem.querySelector('.delete-history-btn');
     deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          removeFromHistory(index);
     });

     return historyItem;
}

// Load Watch Later
function loadWatchLater() {
     const container = document.getElementById('watch-later-video-grid');

     if (watchLater.length === 0) {
          container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No videos in watch later</p>';
          return;
     }

     container.innerHTML = '';
     watchLater.forEach(video => {
          const videoCard = createVideoCard(video);
          container.appendChild(videoCard);
     });
}

// Load Liked Videos
function loadLikedVideos() {
     const container = document.getElementById('liked-videos-grid');

     if (likedVideos.length === 0) {
          container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No liked videos yet</p>';
          return;
     }

     container.innerHTML = '';
     likedVideos.forEach(video => {
          const videoCard = createVideoCard(video);
          container.appendChild(videoCard);
     });
}

// Add to History
function addToHistory(video) {
     const existingIndex = history.findIndex(item => item.id === video.id);
     if (existingIndex !== -1) {
          history.splice(existingIndex, 1);
     }

     const historyItem = {
          ...video,
          watchedAt: new Date().toLocaleDateString()
     };

     history.unshift(historyItem);

     // Keep only last 50 items
     if (history.length > 50) {
          history = history.slice(0, 50);
     }

     localStorage.setItem('history', JSON.stringify(history));
}

// Remove from History
function removeFromHistory(index) {
     history.splice(index, 1);
     localStorage.setItem('history', JSON.stringify(history));
     loadHistory();
     showMessage('Removed from history', 'success');
}

// Open Fullscreen
function openFullscreen(video) {
     const modal = document.getElementById('fullscreen-modal');
     const title = document.getElementById('fullscreen-title');
     const content = document.getElementById('fullscreen-content');

     title.textContent = video.title;

     // Check if it's a video or image based on file extension
     const isVideo = video.thumbnail.includes('video') || video.id > 100; // Assuming uploaded videos have higher IDs

     if (isVideo) {
          content.innerHTML = `<video controls autoplay><source src="${video.thumbnail}" type="video/mp4">Your browser does not support the video tag.</video>`;
     } else {
          content.innerHTML = `<img src="${video.thumbnail}" alt="${video.title}">`;
     }

     modal.style.display = 'block';
}

// Video Options Menu
function showVideoOptions(card, video) {
     const dropdown = document.createElement('div');
     dropdown.className = 'dropdown-menu';
     dropdown.style.position = 'absolute';
     dropdown.style.top = '100%';
     dropdown.style.right = '0';
     dropdown.style.zIndex = '1000';

     dropdown.innerHTML = `
        <div class="dropdown-item" data-action="like">
            <i class="fas fa-thumbs-up"></i>
            <span>Like</span>
        </div>
        <div class="dropdown-item" data-action="watch-later">
            <i class="fas fa-clock"></i>
            <span>Watch Later</span>
        </div>
        <div class="dropdown-item" data-action="share">
            <i class="fas fa-share"></i>
            <span>Share</span>
        </div>
        <div class="dropdown-item" data-action="download">
            <i class="fas fa-download"></i>
            <span>Download</span>
        </div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item" data-action="report">
            <i class="fas fa-flag"></i>
            <span>Report</span>
        </div>
    `;

     // Position the dropdown
     const rect = card.getBoundingClientRect();
     dropdown.style.position = 'fixed';
     dropdown.style.top = `${rect.bottom + 5}px`;
     dropdown.style.right = `${window.innerWidth - rect.right}px`;

     // Add to body
     document.body.appendChild(dropdown);

     // Handle dropdown item clicks
     dropdown.addEventListener('click', (e) => {
          const item = e.target.closest('.dropdown-item');
          if (item) {
               const action = item.dataset.action;
               handleVideoAction(action, video);
               dropdown.remove();
          }
     });

     // Remove dropdown when clicking outside
     const removeDropdown = (e) => {
          if (!dropdown.contains(e.target) && !card.contains(e.target)) {
               dropdown.remove();
               document.removeEventListener('click', removeDropdown);
          }
     };

     setTimeout(() => {
          document.addEventListener('click', removeDropdown);
     }, 100);
}

// Handle Video Actions
function handleVideoAction(action, video) {
     switch (action) {
          case 'like':
               toggleLike(video);
               break;
          case 'watch-later':
               addToWatchLater(video);
               break;
          case 'share':
               showMessage('Sharing video...', 'success');
               break;
          case 'download':
               showMessage('Starting download...', 'success');
               break;
          case 'report':
               showMessage('Report submitted', 'success');
               break;
     }
}

// Toggle Like
function toggleLike(video) {
     const existingIndex = likedVideos.findIndex(item => item.id === video.id);

     if (existingIndex !== -1) {
          likedVideos.splice(existingIndex, 1);
          showMessage('Removed from liked videos', 'success');
     } else {
          likedVideos.unshift(video);
          showMessage('Added to liked videos', 'success');
     }

     localStorage.setItem('likedVideos', JSON.stringify(likedVideos));
}

// Add to Watch Later
function addToWatchLater(video) {
     const existingIndex = watchLater.findIndex(item => item.id === video.id);

     if (existingIndex === -1) {
          watchLater.unshift(video);
          showMessage('Added to watch later', 'success');
          localStorage.setItem('watchLater', JSON.stringify(watchLater));
     } else {
          showMessage('Already in watch later', 'success');
     }
}

// Upload Functionality
uploadBtn.addEventListener('click', () => {
     uploadModal.style.display = 'block';
});

// File Upload Handling
fileUpload.addEventListener('change', handleFileUpload);

function handleFileUpload(e) {
     const files = Array.from(e.target.files);

     files.forEach(file => {
          if (file.type.startsWith('video/') || file.type.startsWith('image/')) {
               const reader = new FileReader();

               reader.onload = function (e) {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';

                    if (file.type.startsWith('video/')) {
                         previewItem.innerHTML = `
                        <video src="${e.target.result}" muted></video>
                        <button class="preview-remove" onclick="removePreview(this)">×</button>
                    `;
                    } else {
                         previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button class="preview-remove" onclick="removePreview(this)">×</button>
                    `;
                    }

                    uploadPreview.appendChild(previewItem);
                    uploadedFiles.push({
                         file: file,
                         preview: e.target.result
                    });

                    updateUploadButton();
               };

               reader.readAsDataURL(file);
          }
     });
}

// Remove Preview
function removePreview(button) {
     const previewItem = button.parentElement;
     const index = Array.from(uploadPreview.children).indexOf(previewItem);

     uploadedFiles.splice(index, 1);
     previewItem.remove();
     updateUploadButton();
}

// Update Upload Button
function updateUploadButton() {
     uploadSubmitBtn.disabled = uploadedFiles.length === 0;
}

// Upload Submit
uploadSubmitBtn.addEventListener('click', () => {
     if (uploadedFiles.length === 0) return;

     uploadSubmitBtn.innerHTML = '<div class="loading"></div> Uploading...';
     uploadSubmitBtn.disabled = true;

     setTimeout(() => {
          // Add uploaded videos to channel
          uploadedFiles.forEach((fileData, index) => {
               const videoId = Date.now() + index;
               const videoTitle = fileData.file.name.replace(/\.[^/.]+$/, "");

               const uploadedVideo = {
                    id: videoId,
                    title: videoTitle,
                    channel: "Your Channel",
                    views: "0",
                    time: "Just now",
                    duration: "0:00",
                    thumbnail: fileData.preview,
                    channelAvatar: "https://via.placeholder.com/36x36/4CAF50/FFFFFF?text=U",
                    category: "uploaded",
                    isUploaded: true
               };

               uploadedVideos.unshift(uploadedVideo);
          });

          localStorage.setItem('uploadedVideos', JSON.stringify(uploadedVideos));

          showMessage('Upload completed successfully!', 'success');
          uploadModal.style.display = 'none';
          uploadSubmitBtn.innerHTML = 'Upload';
          uploadSubmitBtn.disabled = false;
          uploadPreview.innerHTML = '';
          uploadedFiles = [];
          fileUpload.value = '';

          // Update channel page if currently viewing it
          if (document.getElementById('your-channel-page').classList.contains('active')) {
               loadChannelPage();
          }
     }, 3000);
});

// Close Modals
closeModal.forEach(btn => {
     btn.addEventListener('click', () => {
          document.querySelectorAll('.modal').forEach(modal => {
               modal.style.display = 'none';
          });
     });
});

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
     modal.addEventListener('click', (e) => {
          if (e.target === modal) {
               modal.style.display = 'none';
          }
     });
});

// User Profile Dropdown
dropdownItems.forEach(item => {
     item.addEventListener('click', () => {
          const action = item.querySelector('span').textContent;
          const pageId = item.dataset.page;

          if (pageId) {
               showPageWithLoader(pageId);
          } else {
               switch (action) {
                    case 'Help':
                         showMessage('Opening help center...', 'success');
                         break;
                    case 'Sign Out':
                         showMessage('Signing out...', 'success');
                         setTimeout(() => {
                              showMessage('Signed out successfully', 'success');
                         }, 1000);
                         break;
               }
          }
     });
});

// Settings Functionality

// Save Profile Changes
saveBtn.addEventListener('click', () => {
     const displayName = document.getElementById('display-name').value;
     const username = document.getElementById('username').value;
     const bio = document.getElementById('bio').value;
     const email = document.getElementById('email').value;

     // Validate inputs
     if (!displayName.trim() || !username.trim() || !email.trim()) {
          showMessage('Please fill in all required fields', 'error');
          return;
     }

     try {
          // Save profile settings to localStorage immediately
          profileSettings = {
               displayName: displayName.trim(),
               username: username.trim(),
               bio: bio.trim(),
               email: email.trim()
          };
          localStorage.setItem('profileSettings', JSON.stringify(profileSettings));

          // Verify the save worked
          const savedSettings = JSON.parse(localStorage.getItem('profileSettings'));
          if (!savedSettings || savedSettings.displayName !== displayName.trim()) {
               throw new Error('Failed to save profile settings');
          }

          // Update user profile in navbar immediately
          const userImg = userProfile.querySelector('img');
          if (userImg) {
               userImg.src = `https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=${displayName.charAt(0).toUpperCase()}`;
          }

          // Update channel user ID immediately
          channelName = displayName;
          localStorage.setItem('channelName', channelName);

          // Update channel avatar to match profile avatar
          if (channelAvatar) {
               const profileAvatarImg = document.getElementById('profile-avatar');
               if (profileAvatarImg) {
                    channelAvatar.src = profileAvatarImg.src;
                    channelAvatarUrl = profileAvatarImg.src;
                    localStorage.setItem('channelAvatarUrl', channelAvatarUrl);
               }
          }

          // Update channel page if currently viewing it
          if (document.getElementById('your-channel-page').classList.contains('active')) {
               loadChannelPage();
          }

          // Show success message
          showMessage('Profile updated successfully!', 'success');

          // Simulate loading state briefly
          saveBtn.innerHTML = '<div class="loading"></div> Saving...';
          saveBtn.disabled = true;

          setTimeout(() => {
               saveBtn.innerHTML = 'Save Changes';
               saveBtn.disabled = false;
          }, 1000);

     } catch (error) {
          console.error('Error saving profile settings:', error);
          showMessage('Failed to save profile settings. Please try again.', 'error');
          saveBtn.innerHTML = 'Save Changes';
          saveBtn.disabled = false;
     }
});

// Change Avatar
document.querySelector('.change-avatar-btn').addEventListener('click', () => {
     // Use the actual file input instead of simulation
     const avatarUpload = document.getElementById('avatar-upload');
     if (avatarUpload) {
          avatarUpload.click();
     } else {
          showMessage('File upload not available', 'error');
     }
});

// Toggle Switches
toggleSwitches.forEach(toggle => {
     toggle.addEventListener('change', () => {
          const settingName = toggle.id;
          const isEnabled = toggle.checked;

          switch (settingName) {
               case 'private-account':
                    showMessage(`Private account ${isEnabled ? 'enabled' : 'disabled'}`, 'success');
                    break;
               case '2fa':
                    if (isEnabled) {
                         showMessage('Two-factor authentication enabled', 'success');
                    } else {
                         showMessage('Two-factor authentication disabled', 'success');
                    }
                    break;
               case 'email-notifications':
                    showMessage(`Email notifications ${isEnabled ? 'enabled' : 'disabled'}`, 'success');
                    break;
          }
     });
});

// Delete Account Modal
deleteAccountBtn.addEventListener('click', () => {
     deleteModal.style.display = 'block';
});

cancelBtn.addEventListener('click', () => {
     deleteModal.style.display = 'none';
});

confirmDeleteBtn.addEventListener('click', () => {
     // Simulate account deletion
     confirmDeleteBtn.innerHTML = '<div class="loading"></div> Deleting...';
     confirmDeleteBtn.disabled = true;

     setTimeout(() => {
          showMessage('Account deleted successfully', 'success');
          deleteModal.style.display = 'none';
          confirmDeleteBtn.innerHTML = 'Delete Account';
          confirmDeleteBtn.disabled = false;

          // Redirect to home after deletion
          setTimeout(() => {
               showPage('home-page');
          }, 2000);
     }, 3000);
});

// Notification System
function showMessage(message, type = 'success') {
     // Remove existing messages
     const existingMessages = document.querySelectorAll('.message');
     existingMessages.forEach(msg => msg.remove());

     // Create new message
     const messageEl = document.createElement('div');
     messageEl.className = `message ${type}`;
     messageEl.textContent = message;

     document.body.appendChild(messageEl);

     // Auto remove after 3 seconds
     setTimeout(() => {
          messageEl.style.animation = 'slideInRight 0.3s ease reverse';
          setTimeout(() => {
               messageEl.remove();
          }, 300);
     }, 3000);
}

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-btn');

searchInput.addEventListener('keypress', (e) => {
     if (e.key === 'Enter') {
          performSearch(searchInput.value);
     }
});

searchBtn.addEventListener('click', () => {
     if (isListening) {
          toggleVoiceSearch();
     } else {
          performSearch(searchInput.value);
     }
});

// Voice search button functionality
searchBtn.addEventListener('click', () => {
     if (isListening) {
          toggleVoiceSearch();
     } else {
          toggleVoiceSearch();
     }
});

function performSearch(query) {
     if (!query.trim()) {
          showMessage('Please enter a search term', 'error');
          return;
     }

     const searchTerm = query.toLowerCase().trim();
     const results = {
          videos: [],
          channels: [],
          playlists: []
     };

     // Search in videos
     searchData.videos.forEach(video => {
          if (video.title.toLowerCase().includes(searchTerm) ||
               video.channel.toLowerCase().includes(searchTerm) ||
               video.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
               results.videos.push(video);
          }
     });

     // Search in channels
     searchData.channels.forEach(channel => {
          if (channel.name.toLowerCase().includes(searchTerm) ||
               channel.handle.toLowerCase().includes(searchTerm)) {
               results.channels.push(channel);
          }
     });

     // Search in playlists
     searchData.playlists.forEach(playlist => {
          if (playlist.name.toLowerCase().includes(searchTerm) ||
               playlist.channel.toLowerCase().includes(searchTerm)) {
               results.playlists.push(playlist);
          }
     });

     // Display search results
     displaySearchResults(results, searchTerm);
}

// Display search results
function displaySearchResults(results, query) {
     const homePage = document.getElementById('home-page');
     const videoGrid = document.getElementById('home-video-grid');

     if (!homePage || !videoGrid) {
          showMessage('Search results page not found', 'error');
          return;
     }

     // Show home page
     showPage('home-page');

     // Update page header
     const pageHeader = homePage.querySelector('.page-header h1');
     if (pageHeader) {
          pageHeader.textContent = `Search Results for "${query}"`;
     }

     // Clear existing videos
     videoGrid.innerHTML = '';

     // Display video results
     if (results.videos.length > 0) {
          results.videos.forEach(video => {
               const videoCard = createVideoCard(video);
               videoGrid.appendChild(videoCard);
          });
     } else {
          videoGrid.innerHTML = `
               <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                    <h3>No videos found for "${query}"</h3>
                    <p>Try different keywords or check your spelling</p>
               </div>
          `;
     }

     showMessage(`Found ${results.videos.length} videos for "${query}"`, 'success');
}

// Voice Search functionality
let isListening = false;
let recognition = null;

function initializeVoiceSearch() {
     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
          recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = 'en-US';

          recognition.onstart = () => {
               isListening = true;
               const searchBtn = document.querySelector('.search-btn');
               if (searchBtn) {
                    searchBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                    searchBtn.style.color = '#ff4444';
               }
               showMessage('Listening... Speak now', 'success');
          };

          recognition.onresult = (event) => {
               const transcript = event.results[0][0].transcript;
               const searchInput = document.querySelector('.search-bar input');
               if (searchInput) {
                    searchInput.value = transcript;
                    performSearch(transcript);
               }
          };

          recognition.onend = () => {
               isListening = false;
               const searchBtn = document.querySelector('.search-btn');
               if (searchBtn) {
                    searchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                    searchBtn.style.color = '';
               }
               showMessage('Voice search ended', 'success');
          };

          recognition.onerror = (event) => {
               isListening = false;
               const searchBtn = document.querySelector('.search-btn');
               if (searchBtn) {
                    searchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                    searchBtn.style.color = '';
               }
               showMessage('Voice search error: ' + event.error, 'error');
          };
     } else {
          console.warn('Speech recognition not supported');
     }
}

// Toggle voice search
function toggleVoiceSearch() {
     if (!recognition) {
          showMessage('Voice search not supported in this browser', 'error');
          return;
     }

     if (isListening) {
          recognition.stop();
     } else {
          recognition.start();
     }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
     // Show loader on initial load
     showLoader();

     setTimeout(() => {
          // Show home page by default
          showPage('home-page');
          hideLoader();

          // Load Profile Settings
          loadProfileSettings();

          // Initialize voice search
          initializeVoiceSearch();

          // Add channel button event listeners
          const customizeBtn = document.querySelector('.customize-btn');
          const shareBtn = document.querySelector('.share-btn');

          if (customizeBtn) {
               customizeBtn.addEventListener('click', () => {
                    customizeChannel();
               });
          }

          if (shareBtn) {
               shareBtn.addEventListener('click', () => {
                    shareChannel();
               });
          }

          // Add subscribe button to channel page with proper visibility logic
          const subscribeBtn = document.createElement('button');
          subscribeBtn.className = `subscribe-btn ${isSubscribed ? 'subscribed' : ''}`;
          subscribeBtn.innerHTML = isSubscribed ? '<i class="fas fa-bell-slash"></i> Subscribed' : '<i class="fas fa-bell"></i> Subscribe';
          subscribeBtn.addEventListener('click', subscribeToChannel);

          const channelActions = document.querySelector('.channel-actions');
          if (channelActions) {
               // Remove existing subscribe button if any
               const existingSubscribeBtn = channelActions.querySelector('.subscribe-btn');
               if (existingSubscribeBtn) {
                    existingSubscribeBtn.remove();
               }
               channelActions.appendChild(subscribeBtn);
          }

          // Profile Avatar Upload
          const avatarUpload = document.getElementById('avatar-upload');
          const changeAvatarBtn = document.getElementById('change-avatar-btn');
          const profileAvatarImg = document.getElementById('profile-avatar');
          const userAvatarImg = document.getElementById('user-avatar');

          if (changeAvatarBtn) {
               changeAvatarBtn.addEventListener('click', () => {
                    if (avatarUpload) {
                         avatarUpload.click();
                    } else {
                         showMessage('File upload not available', 'error');
                    }
               });
          }

          if (avatarUpload) {
               avatarUpload.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                         // Validate file type
                         if (!file.type.startsWith('image/')) {
                              showMessage('Please select an image file', 'error');
                              return;
                         }

                         // Validate file size (max 5MB)
                         if (file.size > 5 * 1024 * 1024) {
                              showMessage('File size too large. Please select an image under 5MB.', 'error');
                              return;
                         }

                         const reader = new FileReader();
                         reader.onload = (e) => {
                              const imageUrl = e.target.result;

                              // Update profile avatar
                              if (profileAvatarImg) {
                                   profileAvatarImg.src = imageUrl;
                              }

                              // Update user avatar in navbar
                              if (userAvatarImg) {
                                   userAvatarImg.src = imageUrl;
                              }

                              // Save to localStorage
                              localStorage.setItem('profileAvatar', imageUrl);
                              localStorage.setItem('userAvatar', imageUrl);

                              // Also update channel avatar
                              if (channelAvatar) {
                                   channelAvatar.src = imageUrl;
                                   channelAvatarUrl = imageUrl;
                                   localStorage.setItem('channelAvatarUrl', imageUrl);
                              }

                              showMessage('Profile avatar updated successfully!', 'success');
                         };

                         reader.onerror = () => {
                              showMessage('Error reading file. Please try again.', 'error');
                         };

                         reader.readAsDataURL(file);
                    } else {
                         showMessage('No file selected', 'error');
                    }
               });
          } else {
               console.error('Avatar upload element not found');
          }

          // Load saved avatars
          if (profileAvatarImg) profileAvatarImg.src = profileAvatar;
          if (userAvatarImg) userAvatarImg.src = userAvatar;

          // Setup Channel Avatar Upload
          setupChannelAvatarUpload();

          // Load saved channel avatar
          if (channelAvatar) {
               channelAvatar.src = channelAvatarUrl;
          }

          // About Section Editing
          const editDescriptionBtn = document.getElementById('edit-description-btn');
          const editDetailsBtn = document.getElementById('edit-details-btn');
          const editLinksBtn = document.getElementById('edit-links-btn');
          const channelDescriptionEl = document.getElementById('channel-description');

          if (editDescriptionBtn) {
               editDescriptionBtn.addEventListener('click', () => {
                    const newDescription = prompt('Enter new description:', channelDescription);
                    if (newDescription !== null) {
                         channelDescription = newDescription;
                         localStorage.setItem('channelDescription', channelDescription);
                         channelDescriptionEl.textContent = channelDescription;
                         showMessage('Description updated successfully!', 'success');
                    }
               });
          }

          if (editDetailsBtn) {
               editDetailsBtn.addEventListener('click', () => {
                    const location = prompt('Enter location:', 'Worldwide');
                    const website = prompt('Enter website URL:', '-');

                    if (location !== null && website !== null) {
                         const detailsEl = document.getElementById('channel-details');
                         detailsEl.innerHTML = `
                              <div class="detail-item">
                                   <span class="detail-label">Joined</span>
                                   <span class="detail-value">January 2024</span>
                              </div>
                              <div class="detail-item">
                                   <span class="detail-label">Location</span>
                                   <span class="detail-value">${location}</span>
                              </div>
                              <div class="detail-item">
                                   <span class="detail-label">Website</span>
                                   <span class="detail-value">${website}</span>
                              </div>
                         `;
                         showMessage('Details updated successfully!', 'success');
                    }
               });
          }

          if (editLinksBtn) {
               editLinksBtn.addEventListener('click', () => {
                    const twitter = prompt('Enter Twitter URL:', '#');
                    const github = prompt('Enter GitHub URL:', '#');
                    const linkedin = prompt('Enter LinkedIn URL:', '#');

                    if (twitter !== null && github !== null && linkedin !== null) {
                         const linksEl = document.getElementById('channel-links');
                         linksEl.innerHTML = `
                              <a href="${twitter}" class="channel-link" target="_blank">
                                   <i class="fab fa-twitter"></i>
                                   Twitter
                              </a>
                              <a href="${github}" class="channel-link" target="_blank">
                                   <i class="fab fa-github"></i>
                                   GitHub
                              </a>
                              <a href="${linkedin}" class="channel-link" target="_blank">
                                   <i class="fab fa-linkedin"></i>
                                   LinkedIn
                              </a>
                         `;
                         showMessage('Links updated successfully!', 'success');
                    }
               });
          }

          // Load saved channel description
          if (channelDescriptionEl) {
               channelDescriptionEl.textContent = channelDescription;
          }

          // Initialize Camera
          if (cameraVideo) {
               initializeCamera();
          }

          // Update Channel User ID
          updateChannelUserID();

          // Show welcome message
          setTimeout(() => {
               showMessage('Welcome to SocialTube! 🎉', 'success');
          }, 1000);
     }, 1500);
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
     clearTimeout(scrollTimeout);
     scrollTimeout = setTimeout(() => {
          // Handle scroll-based animations or lazy loading here
     }, 100);
});

// Add some fun interactions
document.addEventListener('click', (e) => {
     // Create ripple effect on buttons
     if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('nav-btn')) {
          const ripple = document.createElement('div');
          ripple.style.position = 'absolute';
          ripple.style.borderRadius = '50%';
          ripple.style.background = 'rgba(255, 255, 255, 0.3)';
          ripple.style.transform = 'scale(0)';
          ripple.style.animation = 'ripple 0.6s linear';
          ripple.style.left = e.offsetX + 'px';
          ripple.style.top = e.offsetY + 'px';
          ripple.style.width = ripple.style.height = '20px';
          ripple.style.pointerEvents = 'none';

          e.target.style.position = 'relative';
          e.target.style.overflow = 'hidden';
          e.target.appendChild(ripple);

          setTimeout(() => {
               ripple.remove();
          }, 600);
     }
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Channel Avatar Upload
function setupChannelAvatarUpload() {
     if (channelAvatar) {
          channelAvatar.addEventListener('click', () => {
               if (channelAvatarUpload) {
                    channelAvatarUpload.click();
               } else {
                    showMessage('Channel avatar upload not available', 'error');
               }
          });
     }

     if (channelAvatarUpload) {
          channelAvatarUpload.addEventListener('change', (e) => {
               const file = e.target.files[0];
               if (file) {
                    // Validate file type
                    if (!file.type.startsWith('image/')) {
                         showMessage('Please select an image file', 'error');
                         return;
                    }

                    // Validate file size (max 5MB)
                    if (file.size > 5 * 1024 * 1024) {
                         showMessage('File size too large. Please select an image under 5MB.', 'error');
                         return;
                    }

                    const reader = new FileReader();
                    reader.onload = (e) => {
                         const imageUrl = e.target.result;

                         // Update channel avatar
                         if (channelAvatar) {
                              channelAvatar.src = imageUrl;
                         }

                         // Save channel avatar URL
                         channelAvatarUrl = imageUrl;
                         localStorage.setItem('channelAvatarUrl', imageUrl);

                         // Also update profile avatar and user avatar for consistency
                         const profileAvatarImg = document.getElementById('profile-avatar');
                         const userAvatarImg = document.getElementById('user-avatar');

                         if (profileAvatarImg) {
                              profileAvatarImg.src = imageUrl;
                              localStorage.setItem('profileAvatar', imageUrl);
                         }

                         if (userAvatarImg) {
                              userAvatarImg.src = imageUrl;
                              localStorage.setItem('userAvatar', imageUrl);
                         }

                         showMessage('Channel avatar updated successfully!', 'success');
                    };

                    reader.onerror = () => {
                         showMessage('Error reading file. Please try again.', 'error');
                    };

                    reader.readAsDataURL(file);
               } else {
                    showMessage('No file selected', 'error');
               }
          });
     } else {
          console.error('Channel avatar upload element not found');
     }
}

// Profile Banner Upload
function setupBannerUpload() {
     if (profileBanner) {
          profileBanner.addEventListener('click', () => {
               if (bannerUpload) {
                    bannerUpload.click();
               } else {
                    showMessage('Banner upload not available', 'error');
               }
          });
     }

     if (changeBannerBtn) {
          changeBannerBtn.addEventListener('click', () => {
               if (bannerUpload) {
                    bannerUpload.click();
               } else {
                    showMessage('Banner upload not available', 'error');
               }
          });
     }

     if (bannerUpload) {
          bannerUpload.addEventListener('change', (e) => {
               const file = e.target.files[0];
               if (file) {
                    // Validate file type
                    if (!file.type.startsWith('image/')) {
                         showMessage('Please select an image file', 'error');
                         return;
                    }

                    // Validate file size (max 10MB for banner)
                    if (file.size > 10 * 1024 * 1024) {
                         showMessage('File size too large. Please select an image under 10MB.', 'error');
                         return;
                    }

                    const reader = new FileReader();
                    reader.onload = (e) => {
                         const imageUrl = e.target.result;

                         // Update profile banner
                         if (profileBanner) {
                              profileBanner.src = imageUrl;
                         }

                         // Update channel banner
                         const channelBannerImg = document.getElementById('channel-banner-img');
                         if (channelBannerImg) {
                              channelBannerImg.src = imageUrl;
                         }

                         // Save banner URL
                         profileBannerUrl = imageUrl;
                         localStorage.setItem('profileBannerUrl', imageUrl);

                         showMessage('Channel banner updated successfully!', 'success');
                    };

                    reader.onerror = () => {
                         showMessage('Error reading file. Please try again.', 'error');
                    };

                    reader.readAsDataURL(file);
               } else {
                    showMessage('No file selected', 'error');
               }
          });
     } else {
          console.error('Banner upload element not found');
     }
}

// Channel User ID Matching
function updateChannelUserID() {
     // Use saved profile settings or fallback to defaults
     const displayName = profileSettings.displayName || 'John Doe';
     const username = profileSettings.username || '@johndoe';

     // Update channel name to match user's name
     channelName = displayName;
     localStorage.setItem('channelName', channelName);

     // Update channel handle
     const channelHandle = document.querySelector('.channel-handle');
     if (channelHandle) {
          channelHandle.textContent = username;
     }

     // Update channel title
     const channelTitle = document.querySelector('.channel-details h1');
     if (channelTitle) {
          channelTitle.textContent = channelName;
     }
}

// Create Video Button
document.getElementById('camera-btn').addEventListener('click', () => {
     cameraModal.style.display = 'block';
     initializeCamera();
});

// Camera Event Listeners
if (startRecordingBtn) {
     startRecordingBtn.addEventListener('click', startRecording);
}

if (stopRecordingBtn) {
     stopRecordingBtn.addEventListener('click', stopRecording);
}

if (switchCameraBtn) {
     switchCameraBtn.addEventListener('click', switchCamera);
}

// Close camera modal and stop recording
document.querySelectorAll('.close-modal').forEach(btn => {
     btn.addEventListener('click', () => {
          if (cameraModal.style.display === 'block') {
               if (mediaRecorder && mediaRecorder.state === 'recording') {
                    stopRecording();
               }
               if (mediaStream) {
                    mediaStream.getTracks().forEach(track => track.stop());
               }
               cameraModal.style.display = 'none';
               recordingTime.textContent = '00:00';
               startRecordingBtn.disabled = false;
               stopRecordingBtn.disabled = true;
          } else {
               document.querySelectorAll('.modal').forEach(modal => {
                    modal.style.display = 'none';
               });
          }
     });
});

// Notifications Button
document.getElementById('notifications-btn').addEventListener('click', () => {
     showMessage('Opening notifications...', 'success');
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
     // Ctrl/Cmd + K for search
     if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          searchInput.focus();
     }

     // Escape to close modal
     if (e.key === 'Escape') {
          document.querySelectorAll('.modal').forEach(modal => {
               if (modal.style.display === 'block') {
                    modal.style.display = 'none';
               }
          });
     }

     // Ctrl/Cmd + D for dark mode toggle
     if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
          e.preventDefault();
          themeToggle.click();
     }
});

// Settings Form Validation
const formInputs = document.querySelectorAll('.profile-form input, .profile-form textarea');

formInputs.forEach(input => {
     input.addEventListener('blur', () => {
          validateInput(input);
     });
});

function validateInput(input) {
     const value = input.value.trim();

     switch (input.id) {
          case 'display-name':
               if (value.length < 2) {
                    showInputError(input, 'Display name must be at least 2 characters');
               } else {
                    clearInputError(input);
               }
               break;
          case 'username':
               if (!value.startsWith('@')) {
                    showInputError(input, 'Username must start with @');
               } else if (value.length < 3) {
                    showInputError(input, 'Username must be at least 3 characters');
               } else {
                    clearInputError(input);
               }
               break;
          case 'email':
               const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
               if (!emailRegex.test(value)) {
                    showInputError(input, 'Please enter a valid email address');
               } else {
                    clearInputError(input);
               }
               break;
     }
}

function showInputError(input, message) {
     // Remove existing error
     clearInputError(input);

     // Add error styling
     input.style.borderColor = '#ff4444';

     // Create error message
     const errorMsg = document.createElement('div');
     errorMsg.className = 'error-message';
     errorMsg.style.color = '#ff4444';
     errorMsg.style.fontSize = '12px';
     errorMsg.style.marginTop = '4px';
     errorMsg.textContent = message;

     input.parentNode.appendChild(errorMsg);
}

function clearInputError(input) {
     input.style.borderColor = '';
     const errorMsg = input.parentNode.querySelector('.error-message');
     if (errorMsg) {
          errorMsg.remove();
     }
}

// Auto-save functionality
let autoSaveTimeout;
formInputs.forEach(input => {
     input.addEventListener('input', () => {
          clearTimeout(autoSaveTimeout);
          autoSaveTimeout = setTimeout(() => {
               // Auto-save after 2 seconds of no typing
               const displayName = document.getElementById('display-name').value;
               const username = document.getElementById('username').value;
               const bio = document.getElementById('bio').value;
               const email = document.getElementById('email').value;

               // Update profile settings
               profileSettings = {
                    displayName: displayName.trim(),
                    username: username.trim(),
                    bio: bio.trim(),
                    email: email.trim()
               };
               localStorage.setItem('profileSettings', JSON.stringify(profileSettings));

               // Update channel name immediately
               if (displayName.trim()) {
                    channelName = displayName.trim();
                    localStorage.setItem('channelName', channelName);

                    // Update channel page if currently viewing it
                    if (document.getElementById('your-channel-page').classList.contains('active')) {
                         loadChannelPage();
                    }
               }

               showMessage('Auto-saved changes', 'success');
          }, 2000);
     });
});

// Load Profile Settings
function loadProfileSettings() {
     const displayNameInput = document.getElementById('display-name');
     const usernameInput = document.getElementById('username');
     const bioInput = document.getElementById('bio');
     const emailInput = document.getElementById('email');

     if (displayNameInput) displayNameInput.value = profileSettings.displayName;
     if (usernameInput) usernameInput.value = profileSettings.username;
     if (bioInput) bioInput.value = profileSettings.bio;
     if (emailInput) emailInput.value = profileSettings.email;

     // Load banner image
     if (profileBanner) {
          profileBanner.src = profileBannerUrl;
     }

     // Also update channel banner if on channel page
     const channelBannerImg = document.getElementById('channel-banner-img');
     if (channelBannerImg) {
          channelBannerImg.src = profileBannerUrl;
     }
}

// Verify Profile Settings
function verifyProfileSettings() {
     console.log('Current Profile Settings:', profileSettings);
     console.log('localStorage Profile Settings:', localStorage.getItem('profileSettings'));
}

// Test Profile Settings Function
function testProfileSettings() {
     console.log('=== Profile Settings Test ===');
     console.log('Current profileSettings:', profileSettings);
     console.log('localStorage profileSettings:', localStorage.getItem('profileSettings'));

     // Test saving
     const testSettings = {
          displayName: 'Test User',
          username: '@testuser',
          bio: 'Test bio',
          email: 'test@example.com'
     };

     localStorage.setItem('profileSettings', JSON.stringify(testSettings));
     profileSettings = testSettings;

     console.log('After test save:', profileSettings);
     console.log('localStorage after test:', localStorage.getItem('profileSettings'));

     // Reload settings
     loadProfileSettings();
     console.log('Settings reloaded');
}

// Add test function to global scope for debugging
window.testProfileSettings = testProfileSettings;
window.verifyProfileSettings = verifyProfileSettings;

// Test Image Upload Function
function testImageUpload() {
     console.log('=== Image Upload Test ===');

     // Test profile avatar upload
     const avatarUpload = document.getElementById('avatar-upload');
     const profileAvatar = document.getElementById('profile-avatar');
     const userAvatar = document.getElementById('user-avatar');

     console.log('Profile avatar upload:', avatarUpload);
     console.log('Profile avatar image:', profileAvatar);
     console.log('User avatar image:', userAvatar);

     // Test channel avatar upload
     const channelAvatarUpload = document.getElementById('channel-avatar-upload');
     const channelAvatar = document.getElementById('channel-avatar');

     console.log('Channel avatar upload:', channelAvatarUpload);
     console.log('Channel avatar image:', channelAvatar);

     // Test banner upload
     const bannerUpload = document.getElementById('banner-upload');
     const profileBanner = document.getElementById('profile-banner');

     console.log('Banner upload:', bannerUpload);
     console.log('Profile banner image:', profileBanner);

     // Test localStorage
     console.log('Profile avatar in localStorage:', localStorage.getItem('profileAvatar'));
     console.log('User avatar in localStorage:', localStorage.getItem('userAvatar'));
     console.log('Channel avatar in localStorage:', localStorage.getItem('channelAvatarUrl'));
     console.log('Profile banner in localStorage:', localStorage.getItem('profileBannerUrl'));

     // Test triggering uploads
     if (avatarUpload) {
          console.log('Triggering profile avatar upload...');
          avatarUpload.click();
     }

     if (channelAvatarUpload) {
          console.log('Triggering channel avatar upload...');
          channelAvatarUpload.click();
     }

     if (bannerUpload) {
          console.log('Triggering banner upload...');
          bannerUpload.click();
     }
}

// Add to global scope
window.testImageUpload = testImageUpload;

// Clear saved images for testing
function clearSavedImages() {
     localStorage.removeItem('profileAvatar');
     localStorage.removeItem('userAvatar');
     localStorage.removeItem('channelAvatarUrl');
     localStorage.removeItem('profileBannerUrl');

     // Reset to default avatars
     const profileAvatarImg = document.getElementById('profile-avatar');
     const userAvatarImg = document.getElementById('user-avatar');
     const channelAvatarImg = document.getElementById('channel-avatar');
     const profileBannerImg = document.getElementById('profile-banner');

     if (profileAvatarImg) {
          profileAvatarImg.src = 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=U';
     }

     if (userAvatarImg) {
          userAvatarImg.src = 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=U';
     }

     if (channelAvatarImg) {
          channelAvatarImg.src = 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=U';
     }

     if (profileBannerImg) {
          profileBannerImg.src = 'https://via.placeholder.com/800x200/4CAF50/FFFFFF?text=Channel+Banner';
     }

     // Reset channel banner
     const channelBannerImg = document.getElementById('channel-banner-img');
     if (channelBannerImg) {
          channelBannerImg.src = 'https://via.placeholder.com/1200x200/4CAF50/FFFFFF?text=Channel+Banner';
     }

     showMessage('All saved images cleared', 'success');
}

// Add to global scope
window.clearSavedImages = clearSavedImages;

// Test Channel Functionality
function testChannelFunctionality() {
     console.log('=== Channel Functionality Test ===');

     // Test buttons
     const customizeBtn = document.querySelector('.customize-btn');
     const shareBtn = document.querySelector('.share-btn');
     const subscribeBtn = document.querySelector('.subscribe-btn');

     console.log('Customize button:', customizeBtn);
     console.log('Share button:', shareBtn);
     console.log('Subscribe button:', subscribeBtn);

     // Test image upload elements
     const avatarUpload = document.getElementById('avatar-upload');
     const channelAvatarUpload = document.getElementById('channel-avatar-upload');
     const profileAvatar = document.getElementById('profile-avatar');
     const channelAvatar = document.getElementById('channel-avatar');

     console.log('Profile avatar upload:', avatarUpload);
     console.log('Channel avatar upload:', channelAvatarUpload);
     console.log('Profile avatar image:', profileAvatar);
     console.log('Channel avatar image:', channelAvatar);

     // Test localStorage
     console.log('Profile avatar in localStorage:', localStorage.getItem('profileAvatar'));
     console.log('Channel avatar in localStorage:', localStorage.getItem('channelAvatarUrl'));

     // Test functions
     console.log('customizeChannel function:', typeof customizeChannel);
     console.log('shareChannel function:', typeof shareChannel);
     console.log('subscribeToChannel function:', typeof subscribeToChannel);

     // Test button clicks
     if (customizeBtn) {
          console.log('Testing customize button click...');
          customizeBtn.click();
     }

     if (shareBtn) {
          console.log('Testing share button click...');
          shareBtn.click();
     }

     if (subscribeBtn) {
          console.log('Testing subscribe button click...');
          subscribeBtn.click();
     }
}

// Add to global scope
window.testChannelFunctionality = testChannelFunctionality;

// Initialize banner upload functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
     setupBannerUpload();
     loadProfileSettings();

     // Also add direct event listener for banner button
     const changeBannerBtn = document.getElementById('change-banner-btn');
     if (changeBannerBtn) {
          changeBannerBtn.addEventListener('click', (e) => {
               e.preventDefault();
               const bannerUpload = document.getElementById('banner-upload');
               if (bannerUpload) {
                    bannerUpload.click();
               } else {
                    showMessage('Banner upload not available', 'error');
               }
          });
     }
});

// Also initialize when settings page is loaded
document.addEventListener('click', (e) => {
     if (e.target && e.target.closest('[data-page="settings-page"]')) {
          setTimeout(() => {
               setupBannerUpload();
               loadProfileSettings();
          }, 100);
     }
});

// Initialize banner upload when settings page is shown
function initializeSettingsPage() {
     setTimeout(() => {
          setupBannerUpload();
          loadProfileSettings();
     }, 200);
}

// Add to global scope for testing
window.initializeSettingsPage = initializeSettingsPage;

// Debug function to test banner button
function testBannerButton() {
     console.log('=== Banner Button Test ===');

     const changeBannerBtn = document.getElementById('change-banner-btn');
     const bannerUpload = document.getElementById('banner-upload');
     const profileBanner = document.getElementById('profile-banner');

     console.log('Change Banner Button:', changeBannerBtn);
     console.log('Banner Upload Input:', bannerUpload);
     console.log('Profile Banner Image:', profileBanner);

     if (changeBannerBtn) {
          console.log('Button text:', changeBannerBtn.textContent);
          console.log('Button clickable:', !changeBannerBtn.disabled);

          // Test button click
          console.log('Testing button click...');
          changeBannerBtn.click();
     } else {
          console.error('Change Banner Button not found!');
     }

     if (bannerUpload) {
          console.log('Banner upload input found');
     } else {
          console.error('Banner upload input not found!');
     }
}

// Add to global scope
window.testBannerButton = testBannerButton;
