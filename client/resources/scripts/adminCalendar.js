document.addEventListener('DOMContentLoaded', async () => {
    const adminCalendarBody = document.getElementById('adminCalendarBody');

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Fetch events from API
    async function fetchEvents() {
        try {
            const response = await fetch('http://localhost:5003/api/event');
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const eventData = await response.json();

            // Group events by days of the week
            const groupedEvents = daysOfWeek.reduce((acc, day) => {
                acc[day] = [];
                return acc;
            }, {});

            eventData.forEach(event => {
                const eventStartDate = new Date(event.eventStartTime);
                const eventDuration = parseInt(event.eventDuration, 10) || 0;
                const eventEndDate = new Date(eventStartDate);
                eventEndDate.setHours(eventStartDate.getHours() + eventDuration);

                const dayName = daysOfWeek[eventStartDate.getDay()];
                groupedEvents[dayName].push({
                    event: event.eventName || 'Available',
                    location: event.eventVenueName || '',
                    time: `${formatTime(eventStartDate)} - ${formatTime(eventEndDate)}`,
                    dishes: event.dishes && event.dishes.trim() !== '' ? event.dishes : 'No dishes chosen',
                });
            });

            return groupedEvents;
        } catch (error) {
            console.error('Error fetching events:', error);
            return null;
        }
    }

    // Helper function to format time
    function formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    // Render events into the calendar
    const renderCalendar = (events) => {
        const aggregateDishes = (dayEvents) => {
            const dishCounts = {};

            dayEvents.forEach(event => {
                if (typeof event.dishes === 'string' && event.dishes !== 'No dishes chosen') {
                    const dishes = event.dishes.split(', ');
                    dishes.forEach(dish => {
                        const [quantity, ...dishNameParts] = dish.split(' ');
                        const dishName = dishNameParts.join(' ');
                        const parsedQuantity = parseInt(quantity, 10) || 0;

                        if (dishCounts[dishName]) {
                            dishCounts[dishName] += parsedQuantity;
                        } else {
                            dishCounts[dishName] = parsedQuantity;
                        }
                    });
                }
            });

            return Object.entries(dishCounts).map(([dish, count]) => `${count} ${dish}`).join('<br>') || 'No dishes chosen';
        };

        daysOfWeek.forEach(day => {
            const dayEvents = events[day] || [];
            const maxEvents = 2;

            for (let i = 0; i < maxEvents; i++) {
                const event = dayEvents[i] || { event: 'Available', location: '', time: '', dishes: '' };
                const row = document.createElement('tr');

                if (i === 0) {
                    const dayCell = document.createElement('td');
                    dayCell.textContent = day;
                    dayCell.classList.add('day');
                    dayCell.rowSpan = Math.max(dayEvents.length, maxEvents);
                    row.appendChild(dayCell);
                }

                const eventCell = document.createElement('td');
                eventCell.innerHTML = event.event ? `<span>${event.event}</span>` : '';
                eventCell.classList.add(event.event === 'Available' ? 'available' : 'event');
                row.appendChild(eventCell);

                const locationCell = document.createElement('td');
                locationCell.innerHTML = event.location ? `<span>${event.location}</span>` : '';
                locationCell.classList.add('location');
                row.appendChild(locationCell);

                const timeCell = document.createElement('td');
                timeCell.innerHTML = event.time ? `<span>${event.time}</span>` : '';
                timeCell.classList.add('time');
                row.appendChild(timeCell);

                const dishesCell = document.createElement('td');
                dishesCell.innerHTML = event.dishes ? `<span>${event.dishes.replace(/, /g, '<br>')}</span>` : '';
                dishesCell.classList.add('dishes');
                row.appendChild(dishesCell);

                if (i === 0) {
                    const totalDishesCell = document.createElement('td');
                    const totalDishes = dayEvents.length > 0 ? aggregateDishes(dayEvents) : '';
                    totalDishesCell.innerHTML = totalDishes
                        ? `<span>${totalDishes}</span>`
                        : '<span>No dishes chosen</span>';
                    totalDishesCell.classList.add('total-dishes');
                    totalDishesCell.rowSpan = Math.max(dayEvents.length, maxEvents);
                    row.appendChild(totalDishesCell);
                }

                adminCalendarBody.appendChild(row);
            }
        });
    };

    // Initialize calendar
    const events = await fetchEvents();
    if (events) {
        renderCalendar(events);
    }
});