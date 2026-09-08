// Chart types added for AnyChart 9 (A9-755). Same contract as chart.js:
// create_<x>(palette) returns an undrawn chart; index.js puts it on a stage.
// One small dataset per family; palette applied only where the type has one.

function v9_palette(chart, palette) {
    if (palette && typeof chart.palette === 'function') chart.palette(palette);
    return chart;
}

// --- node-link -----------------------------------------------------------------
var v9_flows = [
    {from: 'Coal', to: 'Electricity', weight: 25},
    {from: 'Gas', to: 'Electricity', weight: 20},
    {from: 'Gas', to: 'Heating', weight: 15},
    {from: 'Solar', to: 'Electricity', weight: 12},
    {from: 'Wind', to: 'Electricity', weight: 14},
    {from: 'Electricity', to: 'Industry', weight: 30},
    {from: 'Electricity', to: 'Homes', weight: 26},
    {from: 'Electricity', to: 'Transport', weight: 15},
    {from: 'Heating', to: 'Homes', weight: 15}
];

function create_dependency_wheel_chart(palette) {
    var chart = anychart.dependencyWheel(v9_flows);
    chart.title('Energy flow, TWh');
    return v9_palette(chart, palette);
}
function create_arc_diagram_chart(palette) {
    var chart = anychart.arcDiagram(v9_flows);
    chart.title('Energy flow, TWh');
    return v9_palette(chart, palette);
}

// --- part-of-whole: one traffic table, twelve months x three channels ------------
var v9_traffic = anychart.data.set([
    ['Jan', 18, 12, 6], ['Feb', 20, 14, 7], ['Mar', 23, 16, 9], ['Apr', 25, 19, 11],
    ['May', 27, 21, 13], ['Jun', 28, 20, 15], ['Jul', 26, 18, 17], ['Aug', 25, 17, 19],
    ['Sep', 29, 19, 21], ['Oct', 31, 22, 23], ['Nov', 33, 24, 25], ['Dec', 36, 27, 28]
]);
var v9_channels = ['Search', 'Social', 'Email'];

function create_stream_graph_chart(palette) {
    var chart = anychart.streamGraph();
    chart.title('Site traffic by channel, monthly visits (k)');
    for (var i = 0; i < v9_channels.length; i++) {
        chart.splineArea(v9_traffic.mapAs({x: 0, value: i + 1})).name(v9_channels[i]);
    }
    return v9_palette(chart, palette);
}
function create_waffle_chart(palette) {
    // the same twelve months summed per channel
    var totals = [0, 0, 0];
    var rows = v9_traffic.data();
    for (var r = 0; r < rows.length; r++) {
        for (var c = 0; c < 3; c++) totals[c] += rows[r][c + 1];
    }
    var chart = anychart.waffle(v9_channels.map(function (name, i) {
        return {name: name, value: totals[i]};
    }));
    chart.title('Site traffic by channel, share of the year');
    return v9_palette(chart, palette);
}

// --- range / marker: one salary table per role ---------------------------------
var v9_salaries = [
    {x: 'Analyst', low: 48, high: 72, value: 58},
    {x: 'Engineer', low: 65, high: 110, value: 86},
    {x: 'Designer', low: 55, high: 90, value: 70},
    {x: 'Manager', low: 80, high: 135, value: 104},
    {x: 'Director', low: 120, high: 190, value: 150}
];

function create_lollipop_chart(palette) {
    var chart = anychart.lollipop();
    chart.title('Salary by role, median (k$)');
    chart.lollipop(v9_salaries).name('Median');
    return v9_palette(chart, palette);
}
function create_dumbbell_chart(palette) {
    var chart = anychart.dumbbell();
    chart.title('Salary by role, range (k$)');
    chart.dumbbell(v9_salaries).name('Low to high');
    return v9_palette(chart, palette);
}

// panel value (index.html option) -> [left factory, right factory]
var v9Panels = {
    'dependencyWheel-arcDiagram': [create_dependency_wheel_chart, create_arc_diagram_chart],
    'streamGraph-waffle': [create_stream_graph_chart, create_waffle_chart],
    'lollipop-dumbbell': [create_lollipop_chart, create_dumbbell_chart]
};
