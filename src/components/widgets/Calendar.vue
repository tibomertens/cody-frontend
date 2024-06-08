<template>
    <div>
        <div class="flex justify-between">
            <div class="gap-[12px] items-center mb-[12px] hidden 1.5xl:flex">
                <div @click="prevMonth" class="cursor-pointer"><img src="/arrow_left.svg" alt="previous month"></div>
                <h2 class="text-subtitle font-bold relative bottom-[2px]">{{ monthYear }}</h2>
                <div @click="nextMonth" class="cursor-pointer"><img src="/arrow_right.svg" alt="next month"></div>
            </div>
        </div>
        <div v-if="!calendarLoaded" class="h-[603.67px] w-full bg-[#ececec] rounded-[5px] pulsing"></div>
        <div v-if="calendarLoaded"
            class="grid gap-[20px] 1.5xl:grid-cols-7 bg-offWhite-light overflow-x-auto !rounded-t-[5px] xl:!rounded-[5px]">
            <div
                class="col-span-5 bg-offWhite-light px-[12px] lg:pl-[20px] lg:pr-0 pb-[32px] pt-[48px] justify-center hidden 1.5xl:flex">
                <table class="w-full lg:w-auto">
                    <thead>
                        <tr class="relative bottom-[16px] text-[14px]">
                            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="week in calendar" :key="week">
                            <td v-for="day in week" :key="day.date"
                                class="min-w-[100px] max-w-[100px] h-[100px] border cursor-pointer border-primary-light align-top bg-offWhite-light p-[4px] overflow-hidden"
                                :class="{ 'calendar-cell': true }" @click="openAddModel(day)">
                                <template v-if="!day.fromNextMonth && !day.fromPrevMonth">
                                    <div
                                        :class="{ 'bg-primary-dark w-[28px] h-[28px] flex justify-center items-center font-bold text-offWhite-light rounded-full': isCurrentDate(day.date) }">
                                        <span class="relative bottom-[1px]">{{ day.date }}</span>
                                    </div>
                                </template>
                                <ul v-if="!day.fromNextMonth && !day.fromPrevMonth"
                                    class="list-none overflow-y-auto max-h-80 mt-4"
                                    :class="{ 'relative !top-[4px]': !isCurrentDate(day.date) }">
                                    <li v-for="task in dayTasks(day.date)" :key="task.id"
                                        class="bg-primary-light text-sm font-semibold rounded-md px-2 py-1 mb-4 whitespace-nowrap overflow-hidden truncate cursor-pointer"
                                        @click.stop="openExpandModal(task)">{{ task.title }}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div
                class="upcoming bg-primary-light min-h-[500px] col-span-2 px-[20px] pb-[32px] pt-[28px] font-bold flex flex-col justify-between rounded-[5px] h-full">
                <div class="h-full">
                    <h3 class="text-btn">Aankomende activiteiten</h3>
                    <div class="flex flex-col gap-[16px] max-h-[440px] overflow-y-auto h-full mt-[20px]">
                        <!-- Add max height and overflow-y-auto to make the container scrollable -->
                        <div v-if="upcomingTasks.length > 0" v-for="task in upcomingTasks"
                            class="bg-offWhite-light rounded-[5px] py-[12px] px-[12px] cursor-pointer"
                            @click="openExpandModal(task)">
                            <div class="flex justify-between">
                                <h4>{{ formatDate(task.date) }}</h4>
                                <p class="font-normal text-[1em]">{{ formatTime(task.date) }}</p>
                            </div>
                            <div class="mt-[12px]">
                                <p class="font-light">{{ task.title }}</p>
                            </div>
                        </div>
                        <div v-else class="h-full">
                            <div class="flex justify-center items-center h-full">
                                <h3>Er zijn geen aankomende activiteiten</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <a class="h-[48px] mt-[6px] 1.5xl:mt-[0px] w-full cursor-pointer bg-primary-dark rounded-[5px] text-white font-bold text-[1.1rem] md:text-btn text-center flex items-center justify-center hover:bg-[#3390FF] active:bg-[#0056CC] transition duration-200 ease-in-out"
                        @click="openAddModel()">
                        <p class="relative bottom-[1px] flex gap-2"><span
                                class="relative bottom-[1px] right-[4px]">+</span> Nieuwe
                            activiteit <div v-if="!taskLoaded"
                                class="animate-spin w-[26px] h-[26px] relative top-[2px]">
                                <img src="/loading-animation.png" alt="loading animation">
                            </div>
                        </p>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <UpdateTask :showModal="showUpdateModal" @closeModal="closeModal" :task="clickedTask"
        @updateTask="handleTaskChange" />
    <ExpandedTask :showModal="showExpandedModal" @closeModal="closeModal" :task="clickedTask"
        @updateTask="openUpdateModal" @removeTask="handleTaskChange" />
    <AddTask :showModal="showAddModal" :selectedDate="selectedDate" @closeModal="closeModal" @addTask="handleTaskChange" :userId="userId" />
</template>


<script setup>
import { ref, onMounted } from 'vue';
import UpdateTask from '../modals/UpdateTask.vue';
import ExpandedTask from '../modals/ExpandedTask.vue';
import AddTask from '../modals/AddTask.vue';

import { getTasks } from '../../functions/tasks';
import { isValidToken, getUser } from '../../functions/user';
import { formatDate, formatTime } from '../../functions/helpers';

const currentDate = ref(new Date());
const monthYear = ref('');
const daysOfWeek = ref(['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag']);
const calendar = ref([]);
const userId = ref('');
const userData = ref(null);
const selectedMonth = ref('');
const selectedYear = ref('');
let upcomingTasks = ref([]);
let clickedTask = ref(null);

const token = localStorage.getItem('token');

let showUpdateModal = ref(false);
let showExpandedModal = ref(false);
let showAddModal = ref(false);

let calendarLoaded = ref(false);
let taskLoaded = ref(true);

const tasksCache = {};

const selectedDate = ref("today");

onMounted(async () => {
    if (isValidToken(token)) {
        userData.value = await getUser(token);
        userId.value = userData.value._id;

        if (userData.value !== null) {
            generateCalendar();
        } else {
            router.push('/login');
        }
    } else {
        router.push("/login");
    }
});

const generateTasksForDay = async (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Check if tasks for this month are already cached
    if (!tasksCache[year]) {
        tasksCache[year] = {};
    }
    if (!tasksCache[year][month]) {
        // Fetch tasks for the current month if not in cache
        const result = await getTasks(userId.value);
        let tasks = [];
        if (result.success) {
            tasks = result.data;
        }

        // Cache tasks for the month
        tasksCache[year][month] = tasks;

        // Update upcoming tasks
        upcomingTasks.value = await getUpcomingTasks(tasks);
    }

    // Get cached tasks for the specific day
    const tasks = tasksCache[year][month];
    return tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate.getFullYear() === year &&
            taskDate.getMonth() === month &&
            taskDate.getDate() === date.getDate();
    });
};

const dayTasks = (date) => {
    for (const week of calendar.value) {
        for (const day of week) {
            if (day.date === date) {
                return day.tasks;
            }
        }
    }
    return [];
};

const getUpcomingTasks = (tasks) => {
    const today = new Date();

    // Filter tasks that are due today or in the future, then sort them by date.
    const upcomingTasks = tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate >= today;
    }).sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    });

    // Return only the first 3 tasks.
    return upcomingTasks;
};

const isCurrentDate = (day) => {
    const today = new Date();

    return selectedYear.value === today.getFullYear() &&
        selectedMonth.value === today.getMonth() &&
        day === today.getDate();
};

const nextMonth = () => {
    currentDate.value.setMonth(currentDate.value.getMonth() + 1);
    generateCalendar();
};

const prevMonth = () => {
    currentDate.value.setMonth(currentDate.value.getMonth() - 1);
    generateCalendar();
};

const generateCalendar = async () => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    selectedMonth.value = month;
    selectedYear.value = year;

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const firstDayOfWeek = (startingDayOfWeek === 0) ? 6 : (startingDayOfWeek - 1);

    const lastDayOfMonth = new Date(year, month + 1, 0);

    monthYear.value = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${year}`;

    const newCalendar = [];
    let week = [];
    let currentDay = new Date(firstDayOfMonth);

    currentDay.setDate(currentDay.getDate() - firstDayOfWeek);

    while (currentDay <= lastDayOfMonth) {
        const fromPrevMonth = currentDay.getMonth() !== month;
        week.push({ date: currentDay.getDate(), tasks: [], fromPrevMonth });

        // Retrieve tasks for the current day from cache or fetch if not available
        const tasksForDay = await generateTasksForDay(currentDay);
        week[week.length - 1].tasks = tasksForDay;

        if (currentDay.getDay() === 0 || currentDay >= lastDayOfMonth) {
            newCalendar.push(week);
            week = [];
        }

        currentDay.setDate(currentDay.getDate() + 1);
    }

    const lastWeek = newCalendar[newCalendar.length - 1];
    if (lastWeek.length < 7) {
        let nextMonthDate = new Date(year, month + 1, 1);
        while (lastWeek.length < 7) {
            lastWeek.push({ date: nextMonthDate.getDate(), tasks: [], fromNextMonth: true });
            nextMonthDate.setDate(nextMonthDate.getDate() + 1);
        }
    }

    calendar.value = newCalendar;
    calendarLoaded.value = true;
};

const openExpandModal = (task) => {
    clickedTask.value = task;
    showExpandedModal.value = true;
};

const openUpdateModal = () => {
    showUpdateModal.value = true;
};

const openAddModel = (date) => {
    console.log(date);
    if (!date) {
        selectedDate.value = currentDate.value;
        showAddModal.value = true;
        return;
    }
    selectedDate.value = new Date(selectedYear.value, selectedMonth.value, date.date);
    showAddModal.value = true;
};

const closeModal = () => {
    showUpdateModal.value = false;
    showExpandedModal.value = false;
    showAddModal.value = false;
};

const handleTaskChange = async () => {
    taskLoaded.value = false;

    // Clear the entire cache
    for (const year in tasksCache) {
        delete tasksCache[year];
    }
    // Re-fetch tasks
    await generateCalendar();

    taskLoaded.value = true;
};
</script>

<style scoped>
.calendar-cell:nth-child(7n+6),
.calendar-cell:nth-child(7n+7) {
    background-color: #EDF0F5;
}

.calendar-cell ul {
    list-style-type: none;
    padding: 0;
    margin-top: 4px;
    overflow-y: auto;
    max-height: 80px;
}

.calendar-cell ul li {
    background-color: #9EBDFF;
    font-size: 11px;
    font-weight: 500;
    border-radius: 5px;
    padding: 1px 2px;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media (min-width: 1024px) {
    .upcoming {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
    scale: 0.7;
}
</style>