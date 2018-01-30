var plots = {};
plots['stock1'] = {};
plots['stock2'] = {};
plots['stock3'] = {};
plots['stock4'] = {};

function create_column_stock(palette) {
    var dataTable = anychart.data.table();
    dataTable.addData(get_ixic_daily_short_data());
    var mapping = dataTable.mapAs();
    mapping.addField('high', 2, 'max');
    mapping.addField('low', 3, 'min');
    mapping.addField('value', 1, 'column');

    var scrollMapping = dataTable.mapAs();
    scrollMapping.addField('value', 5);

    var chart = anychart.stock();
    var plot1 = chart.plot(0);
    plot1.column(mapping).name('ACME');

    var plot2 = chart.plot(1);
    plot2.rangeColumn(mapping).name('ACME');
    chart.scroller().column(scrollMapping);
    chart.selectRange('2007-04-01', '2008-08-28');

    if (palette) {
        plot1.palette(palette);
        plot2.palette(palette);
    }

    plots['stock1']['1'] = plot1;
    plots['stock1']['2'] = plot2;

    return chart;
}
function create_line_stock(palette) {
    var dataTable = anychart.data.table();
    dataTable.addData(get_ixic_daily_short_data());
    var dataSet1 = dataTable.mapAs({'value': 2});
    var dataSet2 = dataTable.mapAs({'value': 3});
    var dataSet3 = dataTable.mapAs({'value': 4});
    var scrollMapping = dataTable.mapAs();
    scrollMapping.addField('value', 5);

    var chart = anychart.stock();
    var plot1 = chart.plot(0);
    plot1.xAxis().background().enabled(true);
    plot1.xGrid(true)
        .xMinorGrid(true);

    plot1.line(dataSet1).name('MSFT');

    var plot2 = chart.plot(1);
    plot2.marker(dataSet3).name('ACME');
    plot2.xAxis().background().enabled(true);
    plot2.xGrid(true)
        .xMinorGrid(true);
    chart.scroller().line(scrollMapping);
    chart.selectRange('2007-04-01', '2008-08-28');

    if (palette) {
        plot1.palette(palette);
        plot2.palette(palette);
    }

    plots['stock2']['1'] = plot1;
    plots['stock2']['2'] = plot2;

    return chart;
}
function create_ohlc_stock(palette) {
    var dataTable = anychart.data.table();
    dataTable.addData(get_ixic_daily_short_data());
    var mapping = dataTable.mapAs();
    mapping.addField('open', 1, 'first');
    mapping.addField('high', 2, 'max');
    mapping.addField('low', 3, 'min');
    mapping.addField('close', 4, 'last');
    mapping.addField('value', 4, 'last');

    var scrollMapping = dataTable.mapAs();
    scrollMapping.addField('value', 5);

    var chart = anychart.stock();
    var plot1 = chart.plot(0);
    plot1.ohlc(mapping).name('CSCO');

    var plot2 = chart.plot(1);
    plot2.candlestick(mapping).name('CSCO');
    chart.scroller().line(mapping);
    chart.selectRange('2007-04-01', '2008-08-28');

    if (palette) {
        plot1.palette(palette);
        plot2.palette(palette);
    }

    plots['stock3']['1'] = plot1;
    plots['stock3']['2'] = plot2;

    return chart;
}
function create_area_stock(palette) {
    var dataTable = anychart.data.table();
    dataTable.addData(get_ixic_daily_short_data());
    var mapping = dataTable.mapAs();
    mapping.addField('high', 2, 'max');
    mapping.addField('low', 3, 'min');
    mapping.addField('value', 1, 'column');

    var scrollMapping = dataTable.mapAs();
    scrollMapping.addField('value', 5);

    var chart = anychart.stock();
    var plot1 = chart.plot(0);
    plot1.area(mapping).name('MSFT');

    var plot2 = chart.plot(1);
    plot2.rangeArea(mapping).name('MSFT');

    chart.scroller().stepArea(scrollMapping);
    chart.selectRange('2007-04-01', '2008-08-28');

    if (palette) {
        plot1.palette(palette);
        plot2.palette(palette);
    }

    plots['stock4']['1'] = plot1;
    plots['stock4']['2'] = plot2;

    return chart;
}