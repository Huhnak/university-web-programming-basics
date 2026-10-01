/* eslint-disable no-unused-vars */

function calculatePrice(params) {
    const { courseFeePerHour, totalWeeks, weekLength, dateStart, timeStart, persons,
            earlyRegistration, groupEnrollment, intensiveCourse,
            supplementary, personalized, excursions, assessment, interactive } = params;

    const durationInHours = totalWeeks * weekLength;

    let weekendMultiplier = 1;
    if (dateStart) {
        const day = new Date(dateStart).getDay();
        if (day === 0 || day === 6) weekendMultiplier = 1.5;
    }

    let morningSurcharge = 0;
    let eveningSurcharge = 0;
    if (timeStart) {
        const hours = parseInt(timeStart.split(':')[0]);
        if (hours >= 9 && hours < 12) morningSurcharge = 400;
        else if (hours >= 18 && hours < 20) eveningSurcharge = 1000;
    }

    const baseTotal = ((courseFeePerHour * durationInHours * weekendMultiplier)
        + morningSurcharge + eveningSurcharge) * persons;

    let total = baseTotal;

    if (earlyRegistration) total *= 0.9;
    if (groupEnrollment) total *= 0.85;
    if (intensiveCourse) total *= 1.2;
    if (supplementary) total += 2000 * persons;
    if (personalized) total += 1500 * totalWeeks;
    if (excursions) total *= 1.25;
    if (assessment) total += 300;
    if (interactive) total *= 1.5;

    return {
        total: Math.round(total),
        breakdown: { baseTotal: Math.round(baseTotal), durationInHours, weekendMultiplier, morningSurcharge, eveningSurcharge },
    };
}

function getAutoOptions(dateStart, persons, weekLength) {
    let earlyRegistration = false;
    if (dateStart) {
        const diffDays = (new Date(dateStart) - new Date()) / (1000 * 60 * 60 * 24);
        earlyRegistration = diffDays >= 30;
    }
    return {
        earlyRegistration,
        groupEnrollment: persons >= 5,
        intensiveCourse: weekLength >= 5,
    };
}

function calcEndDate(dateStart, totalWeeks) {
    if (!dateStart) return '—';
    const end = new Date(dateStart);
    end.setDate(end.getDate() + totalWeeks * 7 - 1);
    return end.toLocaleDateString('ru-RU');
}
