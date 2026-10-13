// A9-947 pair: waterfall + pareto. Same contract as chart-v9.js.

function create_waterfall_chart(palette) {
    // ACME income statement, diff mode: totals have no value and sum the steps above
    var chart = anychart.waterfall([
        {x: 'Revenue', value: 420},
        {x: 'Cost of sales', value: -180},
        {x: 'Gross profit', isTotal: true},
        {x: 'R&D', value: -45},
        {x: 'Marketing', value: -38},
        {x: 'Admin', value: -27},
        {x: 'Other income', value: 12},
        {x: 'Operating profit', isTotal: true},
        {x: 'Interest', value: -9},
        {x: 'Tax', value: -31},
        {x: 'Net profit', isTotal: true}
    ]);
    chart.title('ACME income statement, $M');
    chart.labels(true);
    chart.xAxis().staggerMode(true); // eleven long step names
    return v9_palette(chart, palette);
}

function create_pareto_chart(palette) {
    // the chart sorts the reasons and adds the cumulative % line itself
    var chart = anychart.pareto([
        {x: 'Wrong size', value: 412},
        {x: 'Not as pictured', value: 236},
        {x: 'Damaged', value: 148},
        {x: 'Late delivery', value: 97},
        {x: 'Changed mind', value: 71},
        {x: 'Wrong item', value: 44},
        {x: 'Defective', value: 31},
        {x: 'Other', value: 18}
    ]);
    chart.title('Online store returns by reason');
    chart.xAxis().staggerMode(true);
    chart.getSeriesAt(1).tooltip().format('Cumulative: {%CF}%');
    return v9_palette(chart, palette);
}

v9Panels['waterfall-pareto'] = [create_waterfall_chart, create_pareto_chart];
