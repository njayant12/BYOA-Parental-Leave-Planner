function generateLeavePlan() {
    const dueDate = new Date(document.getElementById('due-date').value);
    const mothersLeave = parseInt(document.getElementById('mothers-leave').value);
    const fathersLeave = parseInt(document.getElementById('fathers-leave').value);
    const breakStart = new Date(document.getElementById('break-start-date').value);
    const breakLength = parseInt(document.getElementById('break-length').value);
    const grandparentHelp = parseInt(document.getElementById('grandparent-help').value) || 0;

    // Calculate the timeline
    const birthDate = new Date(dueDate);
    const mothersLeaveEnd = new Date(birthDate);
    mothersLeaveEnd.setDate(birthDate.getDate() + mothersLeave * 7);

    const breakEnd = new Date(breakStart);
    breakEnd.setDate(breakStart.getDate() + breakLength * 7);

    // Calculate father's leave segments
    const resumeDate = new Date(breakEnd);
    const weeksBeforeBreak = Math.floor((breakStart - birthDate) / (1000 * 60 * 60 * 24 * 7));
    const remainingWeeks = fathersLeave - weeksBeforeBreak;
    const fathersLeaveEnd = new Date(resumeDate);
    fathersLeaveEnd.setDate(resumeDate.getDate() + remainingWeeks * 7);

    // Generate the leave plan
    const leavePlan = `
        Baby's Due Date: ${dueDate.toDateString()}\n
        Mother's Leave: ${birthDate.toDateString()} to ${mothersLeaveEnd.toDateString()}\n
        Father's Leave Segment 1: ${birthDate.toDateString()} to ${breakStart.toDateString()}\n
        Break/Trip: ${breakStart.toDateString()} to ${breakEnd.toDateString()}\n
        Father's Leave Segment 2: ${resumeDate.toDateString()} to ${fathersLeaveEnd.toDateString()}\n
        Grandparent Help: ${grandparentHelp} weeks\n
    `;

    // Display the leave plan
    document.getElementById('leave-plan-output').innerText = leavePlan;

    // Create the timeline
    const timelineContainer = document.getElementById('timeline-container');
    timelineContainer.innerHTML = '';

    const events = [
        { label: "Baby's Birth", date: birthDate },
        { label: "Break/Trip Start", date: breakStart },
        { label: "Break/Trip End", date: breakEnd },
        { label: "Mother's Leave Ends", date: mothersLeaveEnd },
        { label: "Father's Leave Ends", date: fathersLeaveEnd }
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