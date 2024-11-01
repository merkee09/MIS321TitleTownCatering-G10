document.addEventListener('DOMContentLoaded', () => {
    // Get the table body element where the calendar rows will be added
    const adminCalendarBody = document.getElementById('adminCalendarBody');

    // Define the events for each day of the week
    const events = {
        'Sunday': [],
        'Monday': [
            { event: 'Wedding', location: 'Randall Park', time: '10am-3pm', dishes: '2 mashed potatoes, 3 chicken and dumplings' },
            { event: 'Birthday', location: 'Hewson Hall', time: '4pm-6pm', dishes: '10 pecan pies, 8 chicken and dumplings' }
        ],
        'Tuesday': [],
        'Wednesday': [
            { event: 'Graduation', location: 'River Walk', time: '2pm-5pm', dishes: '3 pecan pies, 5 peach coblers' }
        ],
        'Thursday': [],
        'Friday': [
            { event: 'Birthday', location: 'Alston Hall', time: '1pm-3pm', dishes: '5 chicken and dumplings, 2 birthday cakes' }
        ],
        'Saturday': []
    };

    // List of days in a week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Function to aggregate dishes
    const aggregateDishes = (dayEvents) => {
        const dishCounts = {};

        // Loop through each event to count the dishes
        dayEvents.forEach(event => {
            const dishes = event.dishes.split(', ');
            dishes.forEach(dish => {
                const [quantity, ...dishNameParts] = dish.split(' ');
                const dishName = dishNameParts.join(' ');
                if (dishCounts[dishName]) {
                    dishCounts[dishName] += parseInt(quantity, 10);
                } else {
                    dishCounts[dishName] = parseInt(quantity, 10);
                }
            });
        });

        // Convert the dish counts to a string with line breaks
        return Object.entries(dishCounts).map(([dish, count]) => `${count} ${dish}`).join('<br>');
    };

    // Go through each day of the week
    daysOfWeek.forEach(day => {
        // Get the events for the current day
        const dayEvents = events[day] || [];
        // Maximum number of events to show per day
        const maxEvents = 2;

        // Go through each event for the current day
        for (let i = 0; i < maxEvents; i++) {
            // Get the current event or show "Available" if no event
            const event = dayEvents[i] || { event: 'Available', location: '', time: '', dishes: '' };
            // Create a new row in the table
            const row = document.createElement('tr');

            // Add the day name only for the first event of the day
            if (i === 0) {
                const dayCell = document.createElement('td');
                dayCell.textContent = day;
                dayCell.classList.add('day');
                // Span the cell for the number of events or maxEvents, whichever is greater
                dayCell.rowSpan = Math.max(dayEvents.length, maxEvents);
                row.appendChild(dayCell);
            }

            // Create and add the event cell
            const eventCell = document.createElement('td');
            eventCell.innerHTML = event.event ? `<span>${event.event}</span>` : '';
            eventCell.classList.add(event.event === 'Available' ? 'available' : 'event');
            row.appendChild(eventCell);

            // Create and add the location cell
            const locationCell = document.createElement('td');
            locationCell.innerHTML = event.location ? `<span>${event.location}</span>` : '';
            locationCell.classList.add('location');
            row.appendChild(locationCell);

            // Create and add the time cell
            const timeCell = document.createElement('td');
            timeCell.innerHTML = event.time ? `<span>${event.time}</span>` : '';
            timeCell.classList.add('time');
            row.appendChild(timeCell);

            // Create and add the dishes cell
            const dishesCell = document.createElement('td');
            dishesCell.innerHTML = event.dishes ? `<span>${event.dishes.replace(/, /g, '<br>')}</span>` : '';
            dishesCell.classList.add('dishes');
            row.appendChild(dishesCell);

            // Add the total dishes cell only for the first event of the day
            if (i === 0) {
                const totalDishesCell = document.createElement('td');
                // Aggregate all dishes for the day
                const totalDishes = aggregateDishes(dayEvents);
                totalDishesCell.innerHTML = totalDishes ? `<span>${totalDishes}</span>` : '';
                totalDishesCell.classList.add('total-dishes');
                // Span the cell for the number of events or maxEvents, whichever is greater
                totalDishesCell.rowSpan = Math.max(dayEvents.length, maxEvents);
                row.appendChild(totalDishesCell);
            }

            // Add the row to the table body
            adminCalendarBody.appendChild(row);
        }
    });
});
