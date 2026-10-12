// A9-947 pair linearGauge-circularGauge: linear gauge (KPI against target) and
// circular gauge (score, one needle, one target-zone range). Colors come from the theme.

function create_linear_gauge_chart(palette) {
    // rows bound by dataIndex: 0 actual, 1 target, 2 healthy band
    var chart = anychart.gauges.linear();
    chart.data([{value: 82}, {value: 90}, {low: 75, high: 105}]);
    chart.title('Monthly sales vs target, k$');
    chart.scale().minimum(0).maximum(120);
    chart.layout('horizontal');
    chart.legend(true);
    chart.axis(0).scale(chart.scale()).offset('70%');
    chart.rangeBar(2).name('Healthy band').width('50%').offset('15%');
    chart.bar(0).name('Actual').width('24%').offset('28%');
    chart.marker(1).name('Target').width('9%').offset('4%');
    return v9_palette(chart, palette);
}

function create_circular_gauge_chart(palette) {
    var chart = anychart.gauges.circular();
    chart.data([72]);
    chart.title('Customer satisfaction: 72 / 100, target zone 75+');
    chart.startAngle(270).sweepAngle(180);
    // ponytail: the Contrast theme on staging gives the axis its own start angle 0 and drops
    // pointers bound to the implicit axis and the needle geometry; pin axis 0, bind the pointers, set the needle shape
    chart.axis(0).startAngle(270).sweepAngle(180);
    chart.axis(0).scale().minimum(0).maximum(100);
    chart.axis(0).scale().ticks().interval(10);
    chart.needle(0).axisIndex(0).dataIndex(0).startRadius(0).middleRadius('40%').endRadius('85%')
        .startWidth('2%').middleWidth('1.5%').endWidth('0.5%');
    chart.cap().enabled(true);
    chart.range(0).axisIndex(0).from(75).to(100).radius('70%').startSize('6%').endSize('6%');
    return v9_palette(chart, palette);
}

v9Panels['linearGauge-circularGauge'] = [create_linear_gauge_chart, create_circular_gauge_chart];
