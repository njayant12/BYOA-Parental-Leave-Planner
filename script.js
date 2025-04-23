function generateLeavePlan() {
    const dueDate = new Date(document.getElementById('due-date').value);
    const mothersLeave = parseInt(document.getElementById('mothers-leave').value);
    const fathersLeave = parseInt(document.getElementById('fathers-leave').value);
    const tripTiming = parseInt(document.getElementById('trip-timing').value);
    const grandparentHelp = parseInt(document.getElementById('grandparent-help').value) || 0;

    // Calculate the timeline
    const birthDate = new Date(dueDate);
    const mothersLeaveEnd = new Date(birthDate);
    mothersLeaveEnd.setDate(birthDate.getDate() + mothersLeave * 7);

    const fathersLeaveEnd = new Date(birthDate);
    fathersLeaveEnd.setDate(birthDate.getDate() + fathersLeave * 7);

    const tripDate = new Date(birthDate);
    tripDate.setMonth(birthDate.getMonth() + tripTiming);

    // Generate the leave plan
    const leavePlan = `
        Baby's Due Date: ${dueDate.toDateString()}\n
        Mother's Leave: ${birthDate.toDateString()} to ${mothersLeaveEnd.toDateString()}\n
        Father's Leave: ${birthDate.toDateString()} to ${fathersLeaveEnd.toDateString()}\n
        Desired Trip Date: ${tripDate.toDateString()}\n
        Grandparent Help: ${grandparentHelp} weeks\n
    `;

    // Display the leave plan
    document.getElementById('leave-plan-output').innerText = leavePlan;

    // Create the timeline
    const timelineContainer = document.getElementById('timeline-container');
    timelineContainer.innerHTML = '';

    const events = [
        { label: "Baby's Birth", date: birthDate },
        { label: "Mother's Leave Ends", date: mothersLeaveEnd },
        { label: "Father's Leave Ends", date: fathersLeaveEnd },
        { label: "Trip Date", date: tripDate }
    ];

    events.forEach(event => {
        const bar = document.createElement('div');
        bar.className = 'timeline-bar';

        const label = document.createElement('span');
        label.className = 'timeline-label';
        label.textContent = event.label;

        const date = document.createElement('span');
        date.className = 'timeline-date';
        date.textContent = event.date.toDateString();

        bar.appendChild(label);
        bar.appendChild(date);
        timelineContainer.appendChild(bar);
    });
} 