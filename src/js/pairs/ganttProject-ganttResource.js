// A9-947 pair ganttProject-ganttResource: a website relaunch plan and the team that staffs it.
// Gantt has no palette: the theme styles bars, grid and connectors.

// Show exactly the second quarter (no cut-off Q1/Q3 header slivers), without fitAll() (which needs a drawn chart).
// zoomTo() alone is clamped to the data range, which clipped the Go live milestone at the right
// edge, so the scale bounds are widened first.
function v9_gantt_layout(chart) {
    var scale = chart.getTimeline().scale();
    scale.minimum(Date.UTC(2026, 3, 1));
    scale.maximum(Date.UTC(2026, 6, 1));
    chart.zoomTo(Date.UTC(2026, 3, 1), Date.UTC(2026, 6, 1));
    chart.dataGrid().column(0).enabled(false);
    chart.splitterPosition('28%');
}

function create_gantt_project_chart(palette) {
    var data = [
        {id: 'd', name: 'Design', actualStart: '2026-04-01', actualEnd: '2026-04-30', children: [
            {id: 'd1', name: 'Research', actualStart: '2026-04-01', actualEnd: '2026-04-10',
                progressValue: '100%', connectTo: 'd2', connectorType: 'finish-start'},
            {id: 'd2', name: 'Wireframes', actualStart: '2026-04-11', actualEnd: '2026-04-22',
                progressValue: '80%', connectTo: 'd3', connectorType: 'finish-start'},
            {id: 'd3', name: 'Visual design', actualStart: '2026-04-23', actualEnd: '2026-04-30',
                progressValue: '40%', connectTo: 'b1', connectorType: 'finish-start'}
        ]},
        {id: 'b', name: 'Build', actualStart: '2026-04-27', actualEnd: '2026-06-05', children: [
            {id: 'b1', name: 'Front end', actualStart: '2026-05-01', actualEnd: '2026-05-29',
                progressValue: '20%'},
            {id: 'b2', name: 'Back end', actualStart: '2026-04-27', actualEnd: '2026-05-22',
                progressValue: '30%', connectTo: 'b3', connectorType: 'finish-start'},
            {id: 'b3', name: 'Content', actualStart: '2026-05-25', actualEnd: '2026-06-05'}
        ]},
        {id: 'l', name: 'Launch', actualStart: '2026-06-08', actualEnd: '2026-06-22', children: [
            {id: 'l1', name: 'Testing', actualStart: '2026-06-08', actualEnd: '2026-06-19',
                connectTo: 'l2', connectorType: 'finish-start'},
            {id: 'l2', name: 'Go live', actualStart: '2026-06-22', actualEnd: '2026-06-22'}
        ]}
    ];
    var chart = anychart.ganttProject();
    chart.data(anychart.data.tree(data, 'as-tree'));
    chart.title('Website relaunch plan');
    v9_gantt_layout(chart);
    chart.defaultRowHeight(25); // 11 rows fill the panel down to the credits
    // progress labels collide with connectors at this size; the bars show progress anyway
    chart.getTimeline().elements().labels(false);
    return chart;
}

function create_gantt_resource_chart(palette) {
    var data = [
        {id: 'r1', name: 'Anna (design)', periods: [
            {id: 'r1_1', start: '2026-04-01', end: '2026-04-10'},
            {id: 'r1_2', start: '2026-04-13', end: '2026-04-30'},
            {id: 'r1_3', start: '2026-06-08', end: '2026-06-12'}]},
        {id: 'r2', name: 'Ben (front end)', periods: [
            {id: 'r2_1', start: '2026-04-23', end: '2026-04-30'},
            {id: 'r2_2', start: '2026-05-01', end: '2026-05-29'}]},
        {id: 'r3', name: 'Chen (back end)', periods: [
            {id: 'r3_1', start: '2026-04-27', end: '2026-05-22'},
            {id: 'r3_2', start: '2026-06-08', end: '2026-06-19'}]},
        {id: 'r4', name: 'Dana (content)', periods: [
            {id: 'r4_1', start: '2026-04-06', end: '2026-04-17'},
            {id: 'r4_2', start: '2026-05-25', end: '2026-06-05'}]},
        {id: 'r5', name: 'Eli (QA)', periods: [
            {id: 'r5_1', start: '2026-05-11', end: '2026-05-15'},
            {id: 'r5_2', start: '2026-06-08', end: '2026-06-19'},
            {id: 'r5_3', start: '2026-06-22', end: '2026-06-26'}]},
        {id: 'r6', name: 'Fay (project lead)', periods: [
            {id: 'r6_1', start: '2026-04-01', end: '2026-04-03'},
            {id: 'r6_2', start: '2026-04-27', end: '2026-05-01'},
            {id: 'r6_3', start: '2026-06-01', end: '2026-06-05'},
            {id: 'r6_4', start: '2026-06-22', end: '2026-06-26'}]},
        {id: 'r7', name: 'Gus (SEO)', periods: [
            {id: 'r7_1', start: '2026-05-25', end: '2026-06-05'},
            {id: 'r7_2', start: '2026-06-15', end: '2026-06-26'}]}
    ];
    var chart = anychart.ganttResource();
    chart.data(anychart.data.tree(data, 'as-tree'));
    chart.title('Website relaunch team load');
    v9_gantt_layout(chart);
    chart.defaultRowHeight(39); // 7 rows fill the panel down to the credits
    return chart;
}

v9Panels['ganttProject-ganttResource'] = [create_gantt_project_chart, create_gantt_resource_chart];
