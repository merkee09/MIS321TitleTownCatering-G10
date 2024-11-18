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
                    dishes: event.eventName === 'Available' ? '' : (event.dishes && event.dishes.trim() !== '' ? event.dishes : 'No dishes chosen'),
                });
            });

            console.log('Grouped Events:', groupedEvents); // Debugging log
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
                if (typeof event.dishes === 'string' && event.dishes !== '' && event.dishes !== 'No dishes chosen') {
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

            const result = Object.entries(dishCounts).map(([dish, count]) => `${count} ${dish}`).join('<br>');
            console.log('Aggregated Dishes:', result); // Debugging log
            return result || null;
        };

        daysOfWeek.forEach(day => {
            const dayEvents = events[day] || [];
            console.log(`Events for ${day}:`, dayEvents); // Debugging log to ensure events are correctly grouped
            const maxEvents = Math.max(dayEvents.length, 2); // Ensure a minimum of 2 rows per day

            for (let i = 0; i < maxEvents; i++) {
                const event = dayEvents[i] || { event: 'Available', location: '', time: '', dishes: '' };
                const row = document.createElement('tr');

                // Add day name only for the first row of each day
                if (i === 0) {
                    const dayCell = document.createElement('td');
                    dayCell.textContent = day;
                    dayCell.classList.add('day');
                    dayCell.rowSpan = maxEvents;
                    row.appendChild(dayCell);
                }

                // Event cell
                const eventCell = document.createElement('td');
                eventCell.innerHTML = event.event ? `<span>${event.event}</span>` : '';
                eventCell.classList.add(event.event === 'Available' ? 'available' : 'event');
                row.appendChild(eventCell);

                // Location cell
                const locationCell = document.createElement('td');
                locationCell.innerHTML = event.location ? `<span>${event.location}</span>` : '';
                locationCell.classList.add('location');
                row.appendChild(locationCell);

                // Time cell
                const timeCell = document.createElement('td');
                timeCell.innerHTML = event.time ? `<span>${event.time}</span>` : '';
                timeCell.classList.add('time');
                row.appendChild(timeCell);

                // Dishes cell
                const dishesCell = document.createElement('td');
                dishesCell.innerHTML = event.dishes ? `<span>${event.dishes.replace(/, /g, '<br>')}</span>` : '';
                dishesCell.classList.add('dishes');
                row.appendChild(dishesCell);

                // Add total dishes only for the first row of each day
                if (i === 0) {
                    const totalDishesCell = document.createElement('td');
                    if (dayEvents.length > 0) {
                        const totalDishes = aggregateDishes(dayEvents); // Aggregate dishes if there are events
                        totalDishesCell.innerHTML = totalDishes ? `<span>${totalDishes}</span>` : ''; // Blank if no valid dishes
                    } else {
                        totalDishesCell.innerHTML = ''; // Blank if no events
                    }
                    totalDishesCell.classList.add('total-dishes');
                    totalDishesCell.rowSpan = maxEvents;
                    row.appendChild(totalDishesCell);
                }

                adminCalendarBody.appendChild(row);
            }
        });
    };

    // Initialize calendar
    const events = await fetchEvents();
    if (events) {
        console.log('Final Grouped Events:', events); // Debugging log to inspect grouped events
        renderCalendar(events);
    }
});
