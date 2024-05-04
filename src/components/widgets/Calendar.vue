<template>
    <div>
        <div class="flex gap-[12px] items-center mb-[12px]">
            <div @click="prevMonth" class="cursor-pointer"><img src="/arrow_left.svg" alt="previous month"></div>
            <h2 class="text-subtitle font-bold relative bottom-[2px]">{{ monthYear }}</h2>
            <div @click="nextMonth" class="cursor-pointer"><img src="/arrow_right.svg" alt="next month"></div>
        </div>
        <div class="grid gap-[20px] grid-cols-7">
            <div class="col-span-5 bg-offWhite-light px-[20px] pb-[32px] pt-[48px]">
                <table>
                    <thead>
                        <tr class="relative bottom-[16px] text-[14px]">
                            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="week in calendar" :key="week">
                            <td v-for="day in week" :key="day.date" class="calendar-cell">
                                <!-- Check if the day is not from the previous or next month before rendering the day number -->
                                <template v-if="!day.fromNextMonth && !day.fromPrevMonth">
                                    {{ day.date }}
                                </template>
                                <ul v-if="!day.fromNextMonth && !day.fromPrevMonth">
                                    <li v-for="task in dayTasks(day.date)" :key="task.id">{{ task.name }}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="bg-primary-light col-span-2 px-[20px] py-[32px] text-btn font-bold">
                <h3>Aankomende Activiteiten</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentDate: new Date(),
            monthYear: '',
            daysOfWeek: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'],
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
                // Mark days from the previous month
                const fromPrevMonth = currentDay.getMonth() !== month;
                week.push({ date: currentDay.getDate(), tasks: [], fromPrevMonth });

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

            // Check if the last week has less than 7 days and add days from the next month if necessary
            const lastWeek = calendar[calendar.length - 1];
            if (lastWeek.length < 7) {
                let nextMonthDate = new Date(year, month + 1, 1);
                while (lastWeek.length < 7) {
                    lastWeek.push({ date: nextMonthDate.getDate(), tasks: [], fromNextMonth: true });
                    nextMonthDate.setDate(nextMonthDate.getDate() + 1);
                }
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
    border: 1px solid #9EBDFF;
    vertical-align: top;
    padding-left: 10px;
    padding-top: 5px;
    background-color: rgba(237, 240, 245, 0.4);
}

/* Conditional styling for Saturdays */
.calendar-cell:nth-child(7n+6), .calendar-cell:nth-child(7n+7) {
    background-color: #EDF0F5; /* Change this color to your desired color for Saturdays */
}
</style>