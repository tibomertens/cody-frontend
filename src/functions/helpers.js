export const formatDate = (dateTime) => {
    const daysOfWeek = [
        "Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"
    ];
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const date = new Date(dateTime);
    const dayOfWeekIndex = date.getDay();
    const day = date.getDate();
    const monthIndex = date.getMonth();

    return `${daysOfWeek[dayOfWeekIndex]} ${day} ${months[monthIndex]}`;
};


export const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};