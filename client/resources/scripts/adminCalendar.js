document.addEventListener('DOMContentLoaded', () => {
    const adminCalendarBody = document.getElementById('adminCalendarBody');

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

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const aggregateDishes = (dayEvents) => {
        const dishCounts = {};

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

        return Object.entries(dishCounts).map(([dish, count]) => `${count} ${dish}`).join('<br>');
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
                const totalDishes = aggregateDishes(dayEvents);
                totalDishesCell.innerHTML = totalDishes ? `<span>${totalDishes}</span>` : '';
                totalDishesCell.classList.add('total-dishes');
                totalDishesCell.rowSpan = Math.max(dayEvents.length, maxEvents);
                row.appendChild(totalDishesCell);
            }

            adminCalendarBody.appendChild(row);
        }
    });
});
