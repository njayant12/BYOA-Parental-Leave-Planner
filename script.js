function generateLeavePlan() {
    const dueDate = new Date(document.getElementById('due-date').value);
    const mothersLeave = parseInt(document.getElementById('mothers-leave').value);
    const fathersLeave = parseInt(document.getElementById('fathers-leave').value);
    const mothersLeaveOffset = parseInt(document.getElementById('mothers-leave-offset').value) || 0;
    const fathersLeaveOffset = parseInt(document.getElementById('fathers-leave-offset').value) || 0;
    const tripTiming = parseInt(document.getElementById('trip-timing').value);
    const grandparentHelp = parseInt(document.getElementById('grandparent-help').value) || 0;

    // Calculate the timeline
    const birthDate = new Date(dueDate);

    const mothersLeaveStart = new Date(birthDate);
    mothersLeaveStart.setDate(birthDate.getDate() + mothersLeaveOffset * 7);
    const mothersLeaveEnd = new Date(mothersLeaveStart);
    mothersLeaveEnd.setDate(mothersLeaveStart.getDate() + mothersLeave * 7);

    const fathersLeaveStart = new Date(birthDate);
    fathersLeaveStart.setDate(birthDate.getDate() + fathersLeaveOffset * 7);
    const fathersLeaveEnd = new Date(fathersLeaveStart);
    fathersLeaveEnd.setDate(fathersLeaveStart.getDate() + fathersLeave * 7);

    const tripDate = new Date(birthDate);
    tripDate.setMonth(birthDate.getMonth() + tripTiming);

    // Generate the leave plan
    const leavePlan = `
        Baby's Due Date: ${dueDate.toDateString()}\n
        Mother's Leave: ${mothersLeaveStart.toDateString()} to ${mothersLeaveEnd.toDateString()}\n
        Father's Leave: ${fathersLeaveStart.toDateString()} to ${fathersLeaveEnd.toDateString()}\n
        Desired Trip Date: ${tripDate.toDateString()}\n
        Grandparent Help: ${grandparentHelp} weeks\n
    `;

    // Display the leave plan
    document.getElementById('leave-plan-output').innerText = leavePlan;

    // Create the timeline
    const timelineContainer = document.getElementById('timeline-container');
    timelineContainer.innerHTML = '';

    const events = [
        { label: "Baby's Birth", start: birthDate, end: birthDate },
        { label: "Mother's Leave", start: mothersLeaveStart, end: mothersLeaveEnd },
        { label: "Father's Leave", start: fathersLeaveStart, end: fathersLeaveEnd },
        { label: "Trip Date", start: tripDate, end: tripDate }
    ];

    events.forEach(event => {
        const bar = document.createElement('div');
        bar.className = 'timeline-bar';

        const label = document.createElement('span');
        label.className = 'timeline-label';
        label.textContent = event.label;

        const date = document.createElement('span');
        date.className = 'timeline-date';
        if (event.start.getTime() === event.end.getTime()) {
            date.textContent = event.start.toDateString();
        } else {
            date.textContent = `${event.start.toDateString()} - ${event.end.toDateString()}`;
        }

        bar.appendChild(label);
        bar.appendChild(date);
        timelineContainer.appendChild(bar);
    });
} 