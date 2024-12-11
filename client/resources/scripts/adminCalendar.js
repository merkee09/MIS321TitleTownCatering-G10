document.addEventListener('DOMContentLoaded', async () => {
    const adminCalendarBody = document.getElementById('adminCalendarBody');
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Helper function to calculate the current week range
    function getCurrentWeekRange() {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Set to Sunday

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Saturday

        return { startOfWeek, endOfWeek };
    }

    // Fetch events from API
    async function fetchEvents() {
        try {
            const response = await fetch('http://localhost:5003/api/event');
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const eventData = await response.json();

            const { startOfWeek, endOfWeek } = getCurrentWeekRange();

            // Filter events within the current week
            return eventData.filter(event => {
                const eventDate = new Date(event.eventStartTime);
                return eventDate >= startOfWeek && eventDate <= endOfWeek;
            });
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    }

    // Fetch order items (dishes) from API
    async function fetchOrderItems() {
        try {
            const response = await fetch('http://localhost:5003/api/orderitems');
            if (!response.ok) {
                throw new Error('Failed to fetch order items');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching order items:', error);
            return [];
        }
    }

    // Fetch dish details from API
    async function fetchDishes() {
        try {
            const response = await fetch('http://localhost:5003/api/dish');
            if (!response.ok) {
                throw new Error('Failed to fetch dishes');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching dishes:', error);
            return [];
        }
    }

    // Combine events, order items, and dishes
    async function fetchEventsWithDishes() {
        const events = await fetchEvents();
        const orderItems = await fetchOrderItems();
        const dishes = await fetchDishes();


        const dishMap = {};
        dishes.forEach(dish => {
            dishMap[dish.dishID] = dish.dishName; // Assuming dishID and dishName are in the API
        });

        // Combine order items with dish names
        const orderItemsWithDishes = orderItems.map(orderItem => ({
            ...orderItem,
            dishName: dishMap[orderItem.dishID] || 'Unknown Dish',
        }));

        // Match order items to events
        return events.map(event => {
            const eventOrderItems = orderItemsWithDishes.filter(orderItem => orderItem.eventID === event.eventID);

            // Combine dish information into a readable format
            const eventDishes = eventOrderItems.map(orderItem => `${orderItem.quantity} ${orderItem.dishName}`);

            return {
                ...event,
                dishes: eventDishes.length > 0 ? eventDishes.join(', ') : 'No dishes chosen',
            };
        });
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

            return Object.entries(dishCounts).map(([dish, count]) => `${count} ${dish}`).join('<br>');
        };

        daysOfWeek.forEach(day => {
            const dayEvents = events.filter(event => {
                const eventStartDate = new Date(event.eventStartTime);
                return daysOfWeek[eventStartDate.getDay()] === day;
            });

            const maxEvents = Math.max(dayEvents.length, 2); // Minimum 2 rows per day

            for (let i = 0; i < maxEvents; i++) {
                const event = dayEvents[i] || { eventName: 'Available', eventVenueName: '', eventStartTime: '', dishes: '' };
                const row = document.createElement('tr');

                if (i === 0) {
                    const dayCell = document.createElement('td');
                    dayCell.textContent = day;
                    dayCell.classList.add('day');
                    dayCell.rowSpan = maxEvents;
                    row.appendChild(dayCell);
                }

                const eventCell = document.createElement('td');
                eventCell.innerHTML = event.eventName ? `<span>${event.eventName}</span>` : '';
                eventCell.classList.add(event.eventName === 'Available' ? 'available' : 'event');
                row.appendChild(eventCell);

                const locationCell = document.createElement('td');
                locationCell.innerHTML = event.eventVenueName ? `<span>${event.eventVenueName}</span>` : '';
                locationCell.classList.add('location');
                row.appendChild(locationCell);

                const timeCell = document.createElement('td');
                const eventStartDate = event.eventStartTime ? new Date(event.eventStartTime) : null;
                const eventEndDate = eventStartDate ? new Date(eventStartDate) : null;
                if (eventEndDate) eventEndDate.setHours(eventStartDate.getHours() + (parseInt(event.eventDuration, 10) || 0));
                timeCell.innerHTML = eventStartDate ? `<span>${formatTime(eventStartDate)} - ${formatTime(eventEndDate)}</span>` : '';
                timeCell.classList.add('time');
                row.appendChild(timeCell);

                const dishesCell = document.createElement('td');
                dishesCell.innerHTML = event.dishes ? `<span>${event.dishes.replace(/, /g, '<br>')}</span>` : '';
                dishesCell.classList.add('dishes');
                row.appendChild(dishesCell);

                // Add TOTAL DISHES cell only for the first row of each day
                if (i === 0) {
                    const totalDishesCell = document.createElement('td');
                    if (dayEvents.length === 0) {
                        // No events at all
                        totalDishesCell.innerHTML = '';
                    } else if (dayEvents.some(event => event.eventName !== 'Available')) {
                        const totalDishes = aggregateDishes(dayEvents);
                        totalDishesCell.innerHTML = totalDishes ? `<span>${totalDishes}</span>` : `<span>No dishes chosen</span>`;
                    } else {
                        totalDishesCell.innerHTML = ''; // Leave blank if no valid events
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
    const events = await fetchEventsWithDishes();
    if (events) {
        renderCalendar(events);
    }
});