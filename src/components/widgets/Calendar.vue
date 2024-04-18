<template>
    <div>
        <h2>{{ monthYear }}</h2>
        <button @click="prevMonth">Previous Month</button>
        <button @click="nextMonth">Next Month</button>
        <table>
            <thead>
                <tr>
                    <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="week in calendar" :key="week">
                    <td v-for="day in week" :key="day.date" class="calendar-cell">
                        {{ day.date }}
                        <ul>
                            <li v-for="task in dayTasks(day.date)" :key="task.id">{{ task.name }}</li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentDate: new Date(),
            monthYear: '',
            daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            calendar: []
        };
    },
    mounted() {
        this.generateCalendar();
    },
    methods: {
        generateCalendar() {
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth();

            const firstDayOfMonth = new Date(year, month, 1);
            const startingDayOfWeek = firstDayOfMonth.getDay(); // Get the day of the week for the first day of the month
            const firstDayOfWeek = (startingDayOfWeek === 0) ? 6 : (startingDayOfWeek - 1); // Adjusted to start from Monday (0 for Monday, 6 for Sunday)

            const lastDayOfMonth = new Date(year, month + 1, 0);

            this.monthYear = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${year}`;

            const calendar = [];
            let week = [];
            let currentDay = new Date(firstDayOfMonth);

            // Move to the first day of the week
            currentDay.setDate(currentDay.getDate() - firstDayOfWeek);

            while (currentDay <= lastDayOfMonth) {
                week.push({ date: currentDay.getDate(), tasks: [] });

                // Simulated tasks data for demonstration
                // Replace this with your actual tasks data retrieval logic
                const tasksForDay = this.generateTasksForDay(currentDay);
                week[week.length - 1].tasks = tasksForDay;

                if (currentDay.getDay() === 0 || currentDay >= lastDayOfMonth) {
                    calendar.push(week);
                    week = [];
                }

                currentDay.setDate(currentDay.getDate() + 1);
            }

            this.calendar = calendar;
        },
        generateTasksForDay(date) {
            // Simulated tasks data for demonstration
            // Replace this with your actual tasks data retrieval logic
            const tasks = [
                { id: 1, name: 'Task 1' },
                { id: 2, name: 'Task 2' },
                { id: 3, name: 'Task 3' },
                // Add more tasks here as needed
            ];

            // Return tasks for the given date
            return tasks.filter(task => {
                const taskDate = new Date(task.date);
                return taskDate.getFullYear() === date.getFullYear() &&
                    taskDate.getMonth() === date.getMonth() &&
                    taskDate.getDate() === date.getDate();
            });
        },
        dayTasks(date) {
            for (const week of this.calendar) {
                for (const day of week) {
                    if (day.date === date) {
                        return day.tasks;
                    }
                }
            }
            return [];
        },
        nextMonth() {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.generateCalendar();
        },
        prevMonth() {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.generateCalendar();
        }
    }
};
</script>

<style scoped>
.calendar-cell {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    text-align: center;
}

</style>