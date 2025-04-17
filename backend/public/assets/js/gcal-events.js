/**
 * Electronic Music Council - Google Calendar Integration
 * Fetches and displays events from Google Calendar
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize view options for calendar/list toggle
    initViewOptions();
    
    // Load events from Google Calendar for list view
    loadCalendarEvents();
    
    // Load DJ/remix competitions from the existing EMC competitions API
    loadDJCompetitions();
});

/**
 * Initialize view options for toggling between calendar and list view
 */
function initViewOptions() {
    const viewOptions = document.querySelectorAll('.view-option');
    const calendarContainer = document.querySelector('.calendar-container');
    const eventsListContainer = document.querySelector('.events-list-container');
    
    if (viewOptions.length && calendarContainer && eventsListContainer) {
        viewOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                viewOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Show the corresponding view
                const view = this.dataset.view;
                if (view === 'calendar') {
                    calendarContainer.style.display = 'block';
                    eventsListContainer.style.display = 'none';
                } else if (view === 'list') {
                    calendarContainer.style.display = 'none';
                    eventsListContainer.style.display = 'block';
                }
            });
        });
    }
}

/**
 * Load events from Google Calendar API
 * This would typically use the Google Calendar API to fetch events
 * For demo purposes, we'll use sample data
 */
function loadCalendarEvents() {
    const eventsList = document.getElementById('events-list');
    
    if (!eventsList) return;
    
    // In a real implementation, you would fetch events from Google Calendar API
    // For example:
    // const calendarId = 'your-calendar-id@group.calendar.google.com';
    // const apiKey = 'your-api-key';
    // const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${new Date().toISOString()}&maxResults=10&singleEvents=true&orderBy=startTime`;
    
    // For demo purposes, we'll use sample data
    setTimeout(() => {
        const events = getSampleEvents();
        renderEvents(events, eventsList);
    }, 1000);
}

/**
 * Render events in the list view
 */
function renderEvents(events, container) {
    // Clear loading indicator
    container.innerHTML = '';
    
    if (events.length === 0) {
        container.innerHTML = '<div class="events-error"><p>No upcoming events found.</p></div>';
        return;
    }
    
    // Create event list items
    events.forEach(event => {
        const eventDate = new Date(event.start);
        const eventElement = document.createElement('div');
        eventElement.className = 'event-list-item';
        
        eventElement.innerHTML = `
            <div class="event-list-date">
                <span class="day">${eventDate.getDate()}</span>
                <span class="month">${eventDate.toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                <span class="year">${eventDate.getFullYear()}</span>
            </div>
            <div class="event-list-info">
                <h3>${event.title}</h3>
                <div class="event-list-meta">
                    <span class="location"><i class="icon-location"></i> ${event.location}</span>
                    <span class="time"><i class="icon-time"></i> ${formatTime(eventDate)}</span>
                </div>
                <p>${event.description}</p>
                <div class="event-list-actions">
                    <a href="${event.ticketLink}" class="btn btn-primary btn-sm">Get Tickets</a>
                    <a href="${event.calendarLink}" class="btn btn-secondary btn-sm">Add to Calendar</a>
                </div>
            </div>
        `;
        
        container.appendChild(eventElement);
    });
}

/**
 * Format time for display
 */
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

/**
 * Get sample events for demonstration
 */
function getSampleEvents() {
    return [
        {
            title: 'EMC Presents: Small Crab at Liquid Lounge',
            description: 'Join us for an unforgettable night featuring Small Crab, delivering cutting-edge electronic sounds in an intimate venue setting.',
            start: '2025-04-15T22:00:00',
            end: '2025-04-16T02:00:00',
            location: 'Liquid Lounge, Cork',
            ticketLink: '#',
            calendarLink: '#'
        },
        {
            title: 'EMC Presents: Collie at Liquid Lounge',
            description: 'Experience the distinctive sounds of Collie as they take over Liquid Lounge for a night of deep house and techno.',
            start: '2025-04-22T22:00:00',
            end: '2025-04-23T02:00:00',
            location: 'Liquid Lounge, Cork',
            ticketLink: '#',
            calendarLink: '#'
        },
        {
            title: 'Illicit x Outlawd – Bushbaby at Cyprus Avenue',
            description: 'A collaborative event bringing Bushbaby to Cyprus Avenue for a high-energy night of electronic music excellence.',
            start: '2025-04-29T23:00:00',
            end: '2025-04-30T03:00:00',
            location: 'Cyprus Avenue, Cork',
            ticketLink: '#',
            calendarLink: '#'
        },
        {
            title: 'EMC Presents: Behne',
            description: 'Join us for a special night with Behne, showcasing the best in electronic music in an intimate setting.',
            start: '2025-05-05T21:00:00',
            end: '2025-05-06T01:00:00',
            location: 'Dali, Cork',
            ticketLink: '#',
            calendarLink: '#'
        },
        {
            title: 'Cork Electronic Music Workshop',
            description: 'Learn production techniques and industry insights from established artists and producers.',
            start: '2025-05-12T18:00:00',
            end: '2025-05-12T21:00:00',
            location: 'Cork City, TBC',
            ticketLink: '#',
            calendarLink: '#'
        }
    ];
}

/**
 * Integration with the EMC remix competition scraper
 * Loads and displays current DJ/remix competitions
 */
function loadDJCompetitions() {
    // Check if the competitions section exists on the page
    const competitionsSection = document.querySelector('.dj-competitions');
    if (!competitionsSection) return;
    
    // In a real implementation, you would fetch this data from your remix competition API
    // For example: fetch('/api/remix-competitions')
    
    // For demo purposes, we'll use sample data based on the remixdjcompetitionscraper.py results
    const competitions = [
        {
            platform: 'Skio Music',
            title: 'Remix Competition: Artist X - Track Name',
            deadline: 'Deadline: May 15, 2025',
            description: 'Show off your production skills by remixing this track for a chance to win prizes and official release.',
            image: 'assets/images/competition-placeholder.jpg',
            link: '#'
        },
        {
            platform: 'Spinnin\' Records',
            title: 'Talent Pool: New Producer Contest',
            deadline: 'Deadline: April 30, 2025',
            description: 'Submit your original track for a chance to be released on Spinnin\' Records and gain industry exposure.',
            image: 'assets/images/competition-placeholder.jpg',
            link: '#'
        },
        {
            platform: 'Mixcloud',
            title: 'DJ Mix Competition: Electronic Fusion',
            deadline: 'Deadline: May 5, 2025',
            description: 'Create a 30-minute mix showcasing your DJ skills for a chance to perform at an upcoming EMC event.',
            image: 'assets/images/competition-placeholder.jpg',
            link: '#'
        }
    ];
    
    renderCompetitions(competitions, competitionsSection);
}

/**
 * Render DJ/remix competitions
 */
function renderCompetitions(competitions, container) {
    // Get or create the competition cards container
    let cardsContainer = container.querySelector('.competition-cards');
    if (!cardsContainer) {
        const header = document.createElement('div');
        header.className = 'section-header';
        header.innerHTML = `
            <h2>DJ & Remix Competitions</h2>
            <div class="section-line"></div>
            <p>Showcase your talent and win prizes through these active competitions.</p>
        `;
        
        cardsContainer = document.createElement('div');
        cardsContainer.className = 'competition-cards';
        
        container.appendChild(header);
        container.appendChild(cardsContainer);
    }
    
    // Create competition cards
    competitions.forEach(competition => {
        const card = document.createElement('div');
        card.className = 'competition-card';
        
        card.innerHTML = `
            <div class="competition-image">
                <img src="${competition.image}" alt="${competition.title}">
            </div>
            <div class="competition-content">
                <span class="competition-platform">${competition.platform}</span>
                <h3>${competition.title}</h3>
                <span class="competition-deadline">${competition.deadline}</span>
                <p>${competition.description}</p>
                <a href="${competition.link}" class="text-link" target="_blank">Enter Competition <span class="arrow">→</span></a>
            </div>
        `;
        
        cardsContainer.appendChild(card);
    });
}

/**
 * Functions to integrate with a live Google Calendar
 * These would be used in a production implementation
 */

/**
 * Add Google Calendar button functionality
 * This generates a Google Calendar URL with event details
 */
function generateGoogleCalendarLink(event) {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    
    // Format dates for Google Calendar URL
    const formatDate = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    
    const startFormatted = formatDate(startDate);
    const endFormatted = formatDate(endDate);
    
    // Create Google Calendar URL
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startFormatted}/${endFormatted}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    return calendarUrl;
}

/**
 * Fetch events from Google Calendar API
 * This would be used in a production implementation
 */
function fetchGoogleCalendarEvents(calendarId, apiKey) {
    const timeMin = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&maxResults=10&singleEvents=true&orderBy=startTime`;
    
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                return data.items.map(item => {
                    const start = item.start.dateTime || item.start.date;
                    const end = item.end.dateTime || item.end.date;
                    
                    return {
                        title: item.summary,
                        description: item.description || 'No description available',
                        start: start,
                        end: end,
                        location: item.location || 'Location TBC',
                        ticketLink: extractLinkFromDescription(item.description, 'ticket') || '#',
                        calendarLink: generateGoogleCalendarLink({
                            title: item.summary,
                            description: item.description || '',
                            start: start,
                            end: end,
                            location: item.location || 'TBC'
                        })
                    };
                });
            }
            return [];
        })
        .catch(error => {
            console.error('Error fetching calendar events:', error);
            return [];
        });
}

/**
 * Extract links from event description
 * This is a helper function to find ticket links in event descriptions
 */
function extractLinkFromDescription(description, type) {
    if (!description) return null;
    
    // Regular expression to find URLs in text
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = description.match(urlRegex);
    
    if (matches && matches.length > 0) {
        // If looking specifically for ticket links
        if (type === 'ticket') {
            const ticketLink = matches.find(url => 
                url.includes('ticket') || 
                url.includes('eventbrite') || 
                url.includes('dice.fm') ||
                url.includes('resident') ||
                url.includes('buy')
            );
            return ticketLink || matches[0];
        }
        return matches[0];
    }
    
    return null;
}
