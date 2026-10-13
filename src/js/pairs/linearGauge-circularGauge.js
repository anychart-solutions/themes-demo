// A9-947 pair linearGauge-circularGauge (rework round 2): the same reading on both gauges, after the
// AnyChart blog "Linear gauge for a typing speed test": a scale split into shaded ranges, one pointer,
// one value label. No colour is written here: both sets of ranges are shaded by an ordinal colour scale
// that carries no colours of its own and so takes them from the theme.

function create_linear_gauge_chart(palette) {
    // indoor CO2 reading, ppm: 400 to 800 fresh, to 1000 acceptable, to 1500 stuffy, above that poor
    var chart = anychart.gauges.linear();
    chart.data([940]);
    chart.title('Meeting room CO2 level, ppm');
    chart.layout('horizontal');
    chart.padding([10, 30, 10, 20]); // room for the last axis label
    chart.scale().minimum(400).maximum(2000);
    chart.scale().ticks().interval(200);
    chart.scale().minorTicks().interval(100);
    chart.axis(0).scale(chart.scale()).orientation('bottom').offset('5%');
    var scaleBar = chart.scaleBar(0);
    scaleBar.width('5%');
    scaleBar.colorScale(anychart.scales.ordinalColor().ranges([
        {from: 400, to: 800},
        {from: 800, to: 1000},
        {from: 1000, to: 1500},
        {from: 1500, to: 2000}
    ]));
    var pointer = chart.marker(0);
    pointer.name('CO2 now');
    chart.tooltip().titleFormat('CO2 now').format('{%value} ppm');
    pointer.type('triangle-down').width('5%').offset('-6%').zIndex(1);
    pointer.labels().enabled(true).offsetY('-7%').useHtml(true).format('<b>{%value}</b> ppm');
    return v9_palette(chart, palette);
}

function create_circular_gauge_chart(palette) {
    // cabin humidity, percent: 0 to 30 dry, to 60 comfortable, to 80 humid, above that wet
    var chart = anychart.gauges.circular();
    chart.data([42]);
    chart.title('Cabin humidity, percent');
    chart.startAngle(270).sweepAngle(180);
    chart.fill(null).stroke(null); // no dial plate behind the band, the page background shows through
    // ponytail: the Contrast theme gives the axis its own start angle 0; pin axis 0 and bind every pointer to it.
    // No bar pointer here: the circular bar pointer throws under the Contrast theme (engine theme gap, THEME-GAPS.md).
    chart.axis(0).startAngle(270).sweepAngle(180).radius('100%').width('1%');
    chart.axis(0).scale().minimum(0).maximum(100);
    chart.axis(0).scale().ticks().interval(10);
    chart.axis(0).scale().minorTicks().interval(5);
    chart.axis(0).labels().position('outside').format('{%value}%');
    chart.axis(0).ticks().enabled(true).position('outside').length('3%');
    chart.axis(0).minorTicks().enabled(true).position('outside').length('1.5%');
    // four ranges coloured by the same kind of ordinal colour scale as the linear gauge (no colours
    // given, the scale shades them from the theme); the circular gauge takes no colour scale itself,
    // so each range asks the scale for its colour
    var bounds = [[0, 30], [30, 60], [60, 80], [80, 100]];
    var colours = anychart.scales.ordinalColor().ranges([
        {from: 0, to: 30}, {from: 30, to: 60}, {from: 60, to: 80}, {from: 80, to: 100}
    ]);
    for (var i = 0; i < bounds.length; i++) {
        chart.range(i).axisIndex(0).from(bounds[i][0]).to(bounds[i][1]).radius('88%').startSize('9%').endSize('9%') // band inside the axis, ticks stay clear of it
            .fill(colours.valueToColor((bounds[i][0] + bounds[i][1]) / 2));
    }
    chart.tooltip().titleFormat('Humidity now').format('{%value} %');
    chart.tooltip().title().enabled(true);
    chart.tooltip().separator().enabled(true);
    chart.needle(0).axisIndex(0).dataIndex(0).startRadius(0).middleRadius('35%').endRadius('86%')
        .startWidth('4%').middleWidth('2.5%').endWidth('0.5%');
    chart.cap().enabled(true).radius('8%');
    chart.label(0).useHtml(true).text('<b>42</b> %').anchor('left-center').offsetX(180).offsetY('14%').fontSize(18); // beside the pivot, clear of the needle
    return v9_palette(chart, palette);
}

v9Panels['linearGauge-circularGauge'] = [create_linear_gauge_chart, create_circular_gauge_chart];
