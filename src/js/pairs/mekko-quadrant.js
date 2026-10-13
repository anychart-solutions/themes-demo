// A9-947 pair: Mekko & Quadrant. Same contract as chart-v9.js:
// create_<x>(palette) returns an undrawn chart; index.js puts it on a stage.

// --- mekko: column width = region sales, segment height = segment share -------
function create_mekko_chart(palette) {
    var data = anychart.data.set([
        ['N. America', 84, 66, 50],
        ['Europe', 53, 57, 40],
        ['APAC', 39, 42, 59],
        ['LatAm', 13, 25, 22],
        ['Mid East', 12, 14, 14]
    ]);
    var segments = ['Enterprise', 'Mid-market', 'Consumer'];
    var chart = anychart.mekko();
    chart.title('ACME sales by region and segment, M$');
    for (var i = 0; i < segments.length; i++) {
        chart.mekko(data.mapAs({x: 0, value: i + 1})).name(segments[i]);
    }
    chart.legend(true);
    chart.xAxis().staggerMode(true); // narrow columns: keep every region name
    return v9_palette(chart, palette);
}

// --- quadrant: effort (x) against impact (y), one marker per project ----------
function create_quadrant_chart(palette) {
    var chart = anychart.quadrant([
        {x: 15, value: 85, name: 'SSO login'},
        {x: 25, value: 62, name: 'Dark mode'},
        {x: 35, value: 78, name: 'Search fix'},
        {x: 68, value: 82, name: 'New billing'},
        {x: 82, value: 72, name: 'Mobile app'},
        {x: 60, value: 65, name: 'API v2'},
        {x: 20, value: 25, name: 'New icons'},
        {x: 38, value: 35, name: 'Tooltips'},
        {x: 75, value: 20, name: 'Legacy port'},
        {x: 88, value: 38, name: 'Rewrite CMS'}
    ]);
    chart.title('ACME roadmap, effort against impact');
    chart.quarters({
        leftTop: {title: {text: 'Quick wins'}},
        rightTop: {title: {text: 'Major projects'}},
        leftBottom: {title: {text: 'Fill-ins'}},
        rightBottom: {title: {text: 'Thankless tasks'}}
    });
    chart.xAxis(0).title('Effort');
    chart.yAxis(0).title('Impact');
    chart.getSeriesAt(0).name('Projects').labels().enabled(true).format('{%name}');
    return v9_palette(chart, palette);
}

v9Panels['mekko-quadrant'] = [create_mekko_chart, create_quadrant_chart];
