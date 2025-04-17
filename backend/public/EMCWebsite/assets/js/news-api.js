/**
 * Electronic Music Council - News API Integration
 * Fetches and displays electronic music news from News API
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the news carousel if it exists on the page
    const newsCarousel = document.getElementById('newsCarousel');
    if (newsCarousel) {
        fetchElectronicMusicNews();
    }
});

/**
 * Fetch electronic music news from News API
 */
async function fetchElectronicMusicNews() {
    const newsContainer = document.getElementById('newsCarousel');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!newsContainer) return;
    
    // Show loading spinner
    newsContainer.innerHTML = '<div class="news-loading"><div class="spinner"></div><p>Loading latest electronic music news...</p></div>';
    
    // News API key
    const apiKey = '96f334c20cc745229bb50c873ec494e5';
    
    // Use keywords to filter for electronic music news
    const keywords = 'electronic music OR techno OR house music OR EDM OR DJ';
    const endpoint = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keywords)}&language=en&sortBy=publishedAt&pageSize=15&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        if (data.status === 'ok' && data.articles && data.articles.length > 0) {
            // Filter articles to ensure they're related to electronic music
            const electronicMusicArticles = data.articles.filter(article => {
                const lowerTitle = article.title.toLowerCase();
                const lowerDescription = article.description ? article.description.toLowerCase() : '';
                
                return (
                    lowerTitle.includes('electronic') || 
                    lowerTitle.includes('techno') || 
                    lowerTitle.includes('house music') || 
                    lowerTitle.includes('edm') || 
                    lowerTitle.includes('dj') ||
                    lowerDescription.includes('electronic music') ||
                    lowerDescription.includes('techno') ||
                    lowerDescription.includes('house music') ||
                    lowerDescription.includes('edm') ||
                    lowerDescription.includes('dj')
                );
            });
            
            if (electronicMusicArticles.length > 0) {
                renderNewsCarousel(electronicMusicArticles, newsContainer, indicatorsContainer);
            } else {
                newsContainer.innerHTML = '<div class="news-error"><p>No electronic music news found. Please try again later.</p></div>';
            }
        } else {
            newsContainer.innerHTML = '<div class="news-error"><p>Could not load news. Please try again later.</p></div>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<div class="news-error"><p>Error loading news. Please try again later.</p></div>';
    }
}

/**
 * Render news articles in the carousel
 */
function renderNewsCarousel(articles, container, indicatorsContainer) {
    container.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Create carousel items
    articles.forEach((article, index) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'carousel-item';
        
        // Format the date
        const publishedDate = new Date(article.publishedAt);
        const formattedDate = publishedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create HTML for news item
        newsItem.innerHTML = `
            <div class="carousel-item-image">
                <img src="${article.urlToImage || 'assets/images/news-placeholder.jpg'}" 
                     alt="${article.title}" 
                     onerror="this.src='assets/images/news-placeholder.jpg'">
            </div>
            <div class="carousel-item-content">
                <span class="carousel-source">${article.source.name}</span>
                <span class="carousel-item-date">${formattedDate}</span>
                <h3 class="carousel-item-title">${article.title}</h3>
                <p class="carousel-item-description">${article.description || 'Read more to learn about this news item.'}</p>
                <a href="${article.url}" class="text-link" target="_blank">Read More <span class="arrow">→</span></a>
            </div>
        `;
        
        container.appendChild(newsItem);
        
        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (index === 0) {
            indicator.classList.add('active');
        }
        indicator.dataset.index = index;
        indicatorsContainer.appendChild(indicator);
    });
    
    // Initialize carousel functionality
    initCarousel(container, indicatorsContainer);
}

/**
 * Initialize carousel navigation functionality
 */
function initCarousel(container, indicatorsContainer) {
    const items = container.querySelectorAll('.carousel-item');
    const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    let currentIndex = 0;
    let itemWidth = items[0].offsetWidth + 20; // Width + margin
    let itemsPerView = getItemsPerView();
    
    // Update item width on window resize
    window.addEventListener('resize', () => {
        itemWidth = items[0].offsetWidth + 20;
        itemsPerView = getItemsPerView();
        moveToIndex(currentIndex);
    });
    
    function getItemsPerView() {
        if (window.innerWidth >= 1024) {
            return 3;
        } else if (window.innerWidth >= 768) {
            return 2;
        } else {
            return 1;
        }
    }
    
    // Move carousel to specified index
    function moveToIndex(index) {
        if (index < 0) {
            index = 0;
        } else if (index > items.length - itemsPerView) {
            index = items.length - itemsPerView;
        }
        
        currentIndex = index;
        container.style.transform = `translateX(-${index * itemWidth}px)`;
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Previous button
    prevButton.addEventListener('click', () => {
        moveToIndex(currentIndex - 1);
    });
    
    // Next button
    nextButton.addEventListener('click', () => {
        moveToIndex(currentIndex + 1);
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToIndex(index);
        });
    });
}

// Mockup function for testing without API key
function loadMockElectronicMusicNews() {
    const mockArticles = [
        {
            source: { name: 'DJ Mag' },
            author: 'DJ Mag Staff',
            title: 'New Techno Festival Announced in Cork for Summer 2025',
            description: 'The Electronic Music Council has partnered with international promoters to bring a major techno festival to Cork next summer.',
            url: '#',
            urlToImage: 'assets/images/news-placeholder.jpg',
            publishedAt: '2025-04-12T09:30:00Z',
            content: 'Full article content here...'
        },
        {
            source: { name: 'Resident Advisor' },
            author: 'RA Staff',
            title: 'Pioneering Electronic Producer Releases Breakthrough Album',
            description: 'The innovative new album blends techno, ambient and experimental sounds to create a unique sonic landscape.',
            url: '#',
            urlToImage: 'assets/images/news-placeholder.jpg',
            publishedAt: '2025-04-10T14:20:00Z',
            content: 'Full article content here...'
        },
        {
            source: { name: 'Mixmag' },
            author: 'Mixmag Staff',
            title: 'House Music Legend Announces World Tour',
            description: 'The legendary DJ and producer will bring their signature sound to venues across Europe, North America, and Asia.',
            url: '#',
            urlToImage: 'assets/images/news-placeholder.jpg',
            publishedAt: '2025-04-09T11:15:00Z',
            content: 'Full article content here...'
        },
        {
            source: { name: 'Electronic Beats' },
            author: 'EB Team',
            title: 'New Technology Revolutionizes Electronic Music Production',
            description: 'The groundbreaking software uses AI to help producers create unique sounds and compositions.',
            url: '#',
            urlToImage: 'assets/images/news-placeholder.jpg',
            publishedAt: '2025-04-08T16:45:00Z',
            content: 'Full article content here...'
        },
        {
            source: { name: 'Four Four Magazine' },
            author: 'Four Four Staff',
            title: 'Cork's Electronic Music Scene Gains International Recognition',
            description: 'The vibrant electronic music community in Cork has been highlighted as one of Europe's most exciting emerging scenes.',
            url: '#',
            urlToImage: 'assets/images/news-placeholder.jpg',
            publishedAt: '2025-04-07T09:00:00Z',
            content: 'Full article content here...'
        }
    ];
    
    const newsContainer = document.getElementById('newsCarousel');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (newsContainer) {
        renderNewsCarousel(mockArticles, newsContainer, indicatorsContainer);
    }
}

// Comment out the API fetch and uncomment this line to use mock data for testing
// loadMockElectronicMusicNews();
