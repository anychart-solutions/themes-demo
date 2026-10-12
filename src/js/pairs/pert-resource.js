// A9-947 pair pert-resource: a PERT network of a small office move and a three-week
// resource timeline of the ACME support team. Same contract as chart-v9.js.

function create_pert_chart(palette) {
    // durations in days; Plan > Lease > Build > Cable > Move > Open is the critical path (16 days)
    var data = [
        {id: '1', name: 'Plan', duration: 2},
        {id: '2', name: 'Lease', duration: 3, dependsOn: ['1']},
        {id: '3', name: 'Budget', duration: 1, dependsOn: ['1']},
        {id: '4', name: 'Build', duration: 5, dependsOn: ['2']},
        {id: '5', name: 'Desks', duration: 2, dependsOn: ['3']},
        {id: '6', name: 'Cable', duration: 3, dependsOn: ['4']},
        {id: '7', name: 'Notify', duration: 1, dependsOn: ['3']},
        {id: '8', name: 'IT kit', duration: 2, dependsOn: ['3']},
        {id: '9', name: 'Move', duration: 2, dependsOn: ['5', '6', '7', '8']},
        {id: '10', name: 'Open', duration: 1, dependsOn: ['9']}
    ];
    var chart = anychart.pert();
    chart.data(data, 'asTable');
    chart.title('Office move, task days');
    return v9_palette(chart, palette);
}

function create_resource_chart(palette) {
    // hours per day of each activity; a full working day is 8 h
    var a = function (name, start, end, hours) {
        return {name: name, start: start, end: end, minutesPerDay: hours * 60};
    };
    // short names so each bar label with its '(8h)' suffix fits on one line in the monospace themes
    var data = [
        {name: 'Anna, lead', activities: [
            a('Hiring', '2026-03-02', '2026-03-06', 8), a('Calls', '2026-03-09', '2026-03-13', 4),
            a('Rota', '2026-03-17', '2026-03-20', 6)]},
        {name: 'Ben, agent', activities: [
            a('Phones', '2026-03-02', '2026-03-06', 6), a('Course', '2026-03-09', '2026-03-13', 8),
            a('Phones', '2026-03-16', '2026-03-20', 6)]},
        {name: 'Chloe, agent', activities: [
            a('Chat', '2026-03-03', '2026-03-06', 4), a('Phones', '2026-03-09', '2026-03-13', 6),
            a('Chat', '2026-03-16', '2026-03-19', 4)]},
        {name: 'David, agent', activities: [
            a('Email', '2026-03-02', '2026-03-06', 8), a('Chat', '2026-03-09', '2026-03-12', 8),
            a('Email', '2026-03-16', '2026-03-20', 8)]},
        {name: 'Eva, QA', activities: [
            a('Review', '2026-03-02', '2026-03-06', 4), a('Report', '2026-03-09', '2026-03-13', 6),
            a('Review', '2026-03-16', '2026-03-20', 4)]},
        {name: 'Frank, IT', activities: [
            a('Kit', '2026-03-03', '2026-03-06', 6), a('CRM', '2026-03-09', '2026-03-12', 8),
            a('Backup', '2026-03-16', '2026-03-20', 4)]}
    ];
    var chart = anychart.resource(data);
    // ponytail: one zoom level of 21 px days (1 to 21 March fit the narrowest theme) with a day row
    // and a month row; the engine's week row prints week numbers ('w MMM') that read as dates.
    chart.zoomLevels([{
        id: 'days', unit: 'day', count: 1, unitPixSize: 21,
        levels: [
            {unit: 'day', count: 1, formats: ['d'], hAlign: 'center', padding: 0, height: 30},
            {unit: 'month', count: 1, formats: ['MMMM']}
        ]
    }]);
    chart.zoomLevel(0);
    chart.resourceListWidth(130);
    chart.pixPerHour(4); // bar height = hours per day (8 h = 32 px)
    chart.minRowHeight(37); // one-line names: six rows (37 px + cell padding) fit without a scrollbar in themes with a taller title
    chart.currentStartDate('2026-03-02');
    // working days only: weekends off
    chart.calendar().availabilities([
        {each: 'week', on: 5, isWorking: false},
        {each: 'week', on: 6, isWorking: false}
    ]);
    chart.title('Support team schedule, three weeks');
    return v9_palette(chart, palette);
}

v9Panels['pert-resource'] = [create_pert_chart, create_resource_chart];
