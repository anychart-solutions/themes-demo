function create_pie_chart(palette) {
    var chart = anychart.pie(data_set_1);
    if (palette) chart.palette(palette);
    chart.labels().position('inside');
    return chart;
}
function create_donut_chart(palette) {
    var chart = anychart.pie(data_set_1);
    chart.innerRadius('45%');
    if (palette) chart.palette(palette);
    chart.labels().position('inside');
    return chart;
}
function create_pyramid_chart(palette) {
    var chart = anychart.pyramid(data_set_1);
    if (palette) chart.palette(palette);
    chart.labels().position('inside');
    return chart;
}
function create_spline_area_chart(palette) {
    var chart = anychart.area();
    if (palette) chart.palette(palette);
    // Y axis title
    chart.yAxis().title('Relative humidity');
    // Y axis labels formatting
    chart.yAxis().labels().format('{%Value}%');
    // create first series with mapped data
    var series_1 = chart.splineArea(data_set_8.mapAs({x: [0], value: [1]}));
    series_1.name('Gotham').hovered().markers()
        .enabled(true)
        .type('circle')
        .size(10)
        .stroke('1.5 #fff');
    series_1.tooltip().valuePostfix('%');
    // create second series with mapped data
    var series_2 = chart.splineArea(data_set_8.mapAs({x: [0], value: [2]}));
    series_2.name('Mos Eisley').hovered().markers()
        .enabled(true)
        .type('star5')
        .size(10)
        .stroke('1.5 #fff');
    series_2.tooltip().valuePostfix('%');
    // Minimum and maximum
    chart.yScale()
        .minimum(0)
        .maximum(100);
    return chart;
}
function create_funnel_chart(palette) {
    var chart = anychart.funnel(data_set_1);
    if (palette) chart.palette(palette);
    chart.labels().position('outside-left');
    return chart;
}
function create_bar_chart(palette) {
    var chart = anychart.bar();
    chart.padding().right(50);
    if (palette) chart.palette(palette);
    chart.bar(data_set_5.mapAs({x: [0], value: [1]}));
    chart.interactivity().hoverMode('by-x');
    chart.getSeriesAt(0).hovered()
        .fill('orange')
        .stroke('#EF6C00');
    var tooltip = chart.tooltip();
    tooltip.positionMode('point');
    tooltip.titleFormat(function () {
        return this.x
    });
    tooltip.format(function () {
        return '$' + parseInt(this.value).toLocaleString();
    });
    tooltip.position('outside-right')
        .anchor('left-center')
        .offsetX(5)
        .offsetY(0);

    return chart;
}
function create_area_chart(palette) {
    var chart = anychart.area();
    chart.yScale().stackMode('percent');
    if (palette) chart.palette(palette);
    chart.area(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');
    chart.area(data_set_2.mapAs({x: [0], value: [2]})).name('Pears');
    chart.area(data_set_2.mapAs({x: [0], value: [3]})).name('Peaches');
    return chart;
}
function create_column_chart(palette) {
    var chart = anychart.column();
    if (palette) chart.palette(palette);
    chart.yGrid(true);
    chart.xGrid(1);
    chart.xMinorGrid(true);
    chart.xAxis().ticks(true);
    chart.yAxis().ticks(true)
        .minorTicks(true);
    chart.yAxis().labels().format('${%Value}');
    chart.interactivity().hoverMode('single');
    chart.tooltip().positionMode('point');
    // helper function to setup label settings for all series
    var setupSeriesLabels = function (series, name) {
        series.name(name);
        series.tooltip().titleFormat(function () {
            return this.x;
        });
        series.tooltip().format(function () {
            return this.seriesName + ': $' + parseInt(this.value).toLocaleString();
        });
        series.tooltip()
            .position('center-top')
            .anchor('center-bottom')
            .offsetX(0)
            .offsetY(5);
    };
    // temp variable to store series instance
    var series;
    // create first series with mapped data
    series = chart.column(data_set_6.mapAs({x: [0], value: [1]}));
    setupSeriesLabels(series, 'Florida');
    // create second series with mapped data
    series = chart.column(data_set_6.mapAs({x: [0], value: [2]}));
    setupSeriesLabels(series, 'Texas');
    // create third series with mapped data
    series = chart.column(data_set_6.mapAs({x: [0], value: [3]}));
    setupSeriesLabels(series, 'Arizona');
    // create fourth series with mapped data
    series = chart.column(data_set_6.mapAs({x: [0], value: [4]}));
    setupSeriesLabels(series, 'Nevada');
    return chart;
}
function create_line_chart(palette) {
    var chart = anychart.line();
    var series;
    var seriesCount;
    if (palette) chart.palette(palette);
    if (!seriesCount) seriesCount = lineSeriesName.length;
    for (var i = 0; i < seriesCount; i++) {
        series = chart.line(data_set_7.mapAs({x: [0], value: [i + 1]})).name(lineSeriesName[i]);
        series.hovered().markers()
            .enabled(true)
            .type('circle')
            .size(4);
        series.tooltip()
            .position('outside-right')
            .anchor('left-center')
            .offsetX(5)
            .offsetY(5);
    }
    // turn on the crosshair
    chart.crosshair()
        .enabled(true)
        .yLabel(false)
        .yStroke(null);
    return chart;
}
function create_3D_pie_chart(palette) {
    var chart = anychart.pie3d(data_set_1);
    chart.innerRadius('45%');
    if (palette) chart.palette(palette);
    chart.labels().position('outside-left');
    return chart;
}
function create_3D_bar_chart(palette) {
    var chart = anychart.bar3d();
    if (palette) chart.palette(palette);
    chart.bar(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');

    return chart;
}
function create_3D_area_chart(palette) {
    var chart = anychart.area3d();
    if (palette) chart.palette(palette);
    chart.area(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');
    return chart;
}
function create_3D_column_chart(palette) {
    var chart = anychart.column3d();
    chart.title('Fruit Sales');
    chart.legend().enabled(true);
    if (palette) chart.palette(palette);
    chart.column(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');
    chart.column(data_set_2.mapAs({x: [0], value: [2]})).name('Pears');

    return chart;
}
function create_bubble_chart(palette) {
    var chart;
    var map_training_data = data_set_9.mapAs({
        x: [1],
        value: [2],
        size: [4],
        training: [0],
        data: [3]
    });

    var sportsmen1 = map_training_data.filter('training', training_filter_constructor(1));
    var sportsmen2 = map_training_data.filter('training', training_filter_constructor(2));
    var sportsmen3 = map_training_data.filter('training', training_filter_constructor(3));
    var sportsmen4 = map_training_data.filter('training', training_filter_constructor(4));
    // create scatter chart
    chart = anychart.scatter();

    if (palette) chart.palette(palette);

    // set chart title text settings
    var title = chart.title();
    title.enabled(true)
        .text('Best sportsmen training data')
        .padding([0, 0, 10, 0])
        .align('center');

    // turn on grids
    chart.yGrid(true);
    chart.xGrid(true);
    chart.xMinorGrid(true);
    chart.yMinorGrid(true);
    chart.minBubbleSize(5);
    chart.maxBubbleSize(40);

    // set chart axes settings
    chart.xAxis()
        .title('Average pulse during training')
        .minorTicks(true);
    chart.yAxis()
        .title('Average power')
        .minorTicks(true);

    var tooltipFormatter = function (data) {
        return data.getData('data') + '<br/>' +
            'Power: <span style="color: #d2d2d2; font-size: 12px">' + data.getData('value') + '</span></strong><br/>' +
            'Pulse: <span style="color: #d2d2d2; font-size: 12px">' + data.getData('x') + '</span></strong><br/>' +
            'Duration: <span style="color: #d2d2d2; font-size: 12px">' + data.getData('size') + ' min.</span></strong>';
    };

    var series;

    // create first series with mapped data
    series = chart.bubble(sportsmen1);
    series.name('Christopher Sanchez');
    series.tooltip()
        .useHtml(true)
        .fontColor('#fff')
        .format(tooltipFormatter);
    // create second series with mapped data
    series = chart.bubble(sportsmen2);
    series.name('Judy Evans');
    series.tooltip()
        .useHtml(true)
        .fontColor('#fff')
        .format(tooltipFormatter);
    // create third series with mapped data
    series = chart.bubble(sportsmen3);
    series.name('Walter Burke');
    series.tooltip()
        .useHtml(true)
        .fontColor('#fff')
        .format(tooltipFormatter);
    // create forth series with mapped data
    series = chart.bubble(sportsmen4);
    series.name('Daniel Williamson');
    series.tooltip()
        .useHtml(true)
        .fontColor('#fff')
        .format(tooltipFormatter);

    function training_filter_constructor(val) {
        return function (fieldVal) {
            return fieldVal == val;
        }
    }

    return chart
}
function create_marker_chart(palette) {
    var chart = anychart.scatter();
    if (palette) chart.palette(palette);

    var map_training_data = data_set_9.mapAs({
        x: [1],
        value: [2],
        training: [0],
        data: [3]
    });

    var sportsmen1 = map_training_data.filter('training', training_filter_constructor(1));
    var sportsmen2 = map_training_data.filter('training', training_filter_constructor(2));
    var sportsmen3 = map_training_data.filter('training', training_filter_constructor(3));
    var sportsmen4 = map_training_data.filter('training', training_filter_constructor(4));
    var sportsmen5 = map_training_data.filter('training', training_filter_constructor(5));
    var sportsmen6 = map_training_data.filter('training', training_filter_constructor(6));
    var sportsmen7 = map_training_data.filter('training', training_filter_constructor(7));
    var sportsmen8 = map_training_data.filter('training', training_filter_constructor(8));
    var sportsmen9 = map_training_data.filter('training', training_filter_constructor(9));
    var sportsmen10 = map_training_data.filter('training', training_filter_constructor(10));

    // set chart title text settings
    chart.title()
        .enabled(true)
        .text('Best sportsmen training data')
        .padding([0, 0, 10, 0])
        .align('center');

    // turn on grids
    chart.yGrid(true)
        .xGrid(true)
        .xMinorGrid(true)
        .yMinorGrid(true);

    // set chart axes settings
    chart.xAxis()
        .title('Average pulse during training')
        .minorTicks(true);
    chart.yAxis()
        .title('Average power')
        .minorTicks(true);

    var tooltipFormatter = function (data) {
        return data.getData('data') + '<br/>' +
            'Power: <span style="color: #d2d2d2; font-size: 12px">' + data.getData('value') + '</span></strong><br/>' +
            'Pulse: <span style="color: #d2d2d2; font-size: 12px">' + data.getData('x') + '</span></strong>';
    };

    var data = [
        {
            'name': 'Christopher Sanchez',
            'data': sportsmen1
        },

        {
            'name': 'Judy Evans',
            'data': sportsmen2
        },

        {
            'name': 'Walter Burke',
            'data': sportsmen3
        },

        {
            'name': 'Daniel Williamson',
            'data': sportsmen4
        },

        {
            'name': 'Fred Peterson',
            'data': sportsmen5
        },

        {
            'name': 'Jason Anderson',
            'data': sportsmen6
        },

        {
            'name': 'Brenda Boyd',
            'data': sportsmen7
        },

        {
            'name': 'Joshua Hanson',
            'data': sportsmen8
        },

        {
            'name': 'William Ortiz',
            'data': sportsmen9
        },

        {
            'name': 'Roger Jones',
            'data': sportsmen10
        }
    ];

    // create second series with mapped data
    for (var i = 0; i < data.length; i++) {
        createSeries(data[i].data, data[i].name);
    }

    function createSeries(data, name) {
        var series = chart.marker(data);
        series.name(name);
        series.tooltip()
            .useHtml(true)
            .fontColor('#fff')
            .format(tooltipFormatter);
    }

    function training_filter_constructor(val) {
        return function (fieldVal) {
            return fieldVal == val;
        }
    }

    return chart;
}
function create_box_chart(palette) {
    var chart = anychart.box();
    chart.title('April Fruits Sales');
    if (palette) chart.palette(palette);
    chart.box(data_set_3).name('April Sales');
    return chart;
}
function create_error_chart(palette) {
    var chart = anychart.marker();
    if (palette) chart.palette(palette);
    chart.marker(data_set_4.mapAs({
        name: [0],
        x: [2],
        value: [1],
        xLowerError: [3],
        xUpperError: [4],
        valueLowerError: [5],
        valueUpperError: [6]
    })).name('April Sales');
    return chart;
}
function create_polar_line_chart(palette) {
    var chart = anychart.polar();
    if (palette) chart.palette(palette);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var seriesData_1 = data_set_11.mapAs({x: [0], value: [1]});
    // map data for the second series, take x from the second column and value from the third column of data set
    var seriesData_2 = data_set_11.mapAs({x: [2], value: [3]});
    // map data for the second series, take x from the fourth column and value from the fifth column of data set
    var seriesData_3 = data_set_11.mapAs({x: [4], value: [5]});
    // set chart yScale settings
    chart.yScale()
        .minimum(0)
        .maximum(16);
    chart.yScale().ticks().interval(2);
    // set chart xScale settings
    chart.xScale().maximum(360);
    chart.xScale().ticks().interval(30);
    // set xAxis formatting settings
    chart.xAxis().labels().format(function () {
        return this['value'] + '°'
    });
    // disable chart title
    chart.title(false);
    // set chart legend settings
    chart.legend()
        .align('center')
        .enabled(true);

    var series1 = chart.marker(seriesData_1);
    series1.type('star5')
        .name('Signal A');

    var series2 = chart.marker(seriesData_2);
    series2.name('Signal B');

    var series3 = chart.marker(seriesData_3);
    series3.name('Signal C');

    return chart;
}
function create_polar_marker_chart(palette) {
    var chart = anychart.polar();
    if (palette) chart.palette(palette);
    chart.marker(data_set_2.mapAs({x: [11], value: [1]})).name('Apples');
    chart.marker(data_set_2.mapAs({x: [11], value: [2]})).name('Oranges');
    chart.marker(data_set_2.mapAs({x: [11], value: [3]})).name('Peaches');
    return chart;
}
function create_radar_line_chart(palette) {
    var chart = anychart.radar();
    if (palette) chart.palette(palette);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var data1 = data_set_10.mapAs({x: [0], value: [1]});
    // map data for the second series, take x from the zero column and value from the second column of data set
    var data2 = data_set_10.mapAs({x: [0], value: [2]});
    // map data for the third series, take x from the zero column and value from the third column of data set
    var data3 = data_set_10.mapAs({x: [0], value: [3]});
    // set chart yScale settings
    chart.yScale()
        .minimum(-.2)
        .maximum(1)
        .ticks().interval(.2);
    // set chart legend settings
    chart.legend()
        .align('center')
        .enabled(true);
    // create point data labels formation function
    var labelFormattingFunction = function () {
        return this.x + ': ' + this.value.toFixed(2)
    };
    // create first series with mapped data
    chart.line(data1)
        .name('USA')
        .tooltip().format(labelFormattingFunction);
    // create second series with mapped data
    chart.line(data2)
        .name('Russia').tooltip()
        .format(labelFormattingFunction);
    // create third series with mapped data
    chart.line(data3)
        .name('China')
        .tooltip().format(labelFormattingFunction);

    return chart;
}
function create_radar_area_chart(palette) {
    var chart = anychart.radar();
    if (palette) chart.palette(palette);
    chart.area(data_set_2.mapAs({x: [0], value: [1]})).name('Apples');
    chart.area(data_set_2.mapAs({x: [0], value: [2]})).name('Oranges');
    chart.area(data_set_2.mapAs({x: [0], value: [3]})).name('Peaches');
    chart.yScale().stackMode('percent');
    return chart;
}
function create_choropleth_map(palette) {
    var filterConstructor = function (target) {
        return function (val) {
            return val == target;
        }
    };
    var chart = anychart.map();
    chart.geoData(anychart.maps['austria']);
    if (palette) chart.palette(palette);
    chart.choropleth(dataSet_austria_map_1.filter('series', filterConstructor('1'))).name('First');
    chart.choropleth(dataSet_austria_map_1.filter('series', filterConstructor('2'))).name('Second');
    chart.choropleth(dataSet_austria_map_1.filter('series', filterConstructor('3'))).name('Third');
    chart.choropleth(dataSet_austria_map_1.filter('series', filterConstructor('4'))).name('Forth');
    chart.legend().enabled(true);
    return chart;
}
function create_choropleth_range_map(palette) {
    var chart = anychart.map();
    chart.geoData(anychart.maps['austria']);
    if (palette) chart.palette(palette);
    var series = chart.choropleth(dataSet_austria_map_1);
    series.colorScale(anychart.scales.linearColor());
    var colorRange = chart.colorRange();
    colorRange.enabled(true);
    return chart;
}
function create_bubble_markers_map(palette) {
    var chart = anychart.map();
    if (palette) chart.palette(palette);
    chart.title('Bubble & Marker Series');
    chart.geoData(anychart.maps['austria']);
    chart.minBubbleSize(7)
        .maxBubbleSize(20);
    chart.bubble(dataSet_austria_map_2);

    return chart;
}
function create_connector_map(palette) {
    var chart = anychart.connector();
    chart.geoData(anychart.maps['austria']);
    if (palette) chart.palette(palette);
    chart.marker(dataSet_austria_map_3);
    chart.connector(dataSet_austria_map_4);
    chart.connector(dataSet_austria_map_5);
    return chart;
}
function create_sparkline_chart() {
    var data = data_13();

    var fontFamilyText = "'Verdana', Helvetica, Arial, sans-serif";
    var headerFontColor = '#545f69';
    var borderColor = '#CECECE';

    // create table for sparkline charts layout
    table = anychart.standalones.table();
    // set table size settings
    table.bounds('5%', '20px', '90%', '90%');
    // set table contents (sparkline charts and text)
    table.contents([
        ['Region', 'Actual Sales (mn)', null, null, 'Gross\nMargin', 'Profit Trend\n12 Month'],
        ['Alabama', '$4,916', createLine(data['alabama'], 'actualSales'), null, '$1,172', createColumn(data['alabama'], 'profitTrend')],
        ['Alaska', '$3,916', createLine(data['alaska'], 'actualSales'), null, '-$791', createColumn(data['alaska'], 'profitTrend')],
        ['Arizona', '$4,916', createLine(data['arizona'], 'actualSales'), null, '$1,010', createColumn(data['arizona'], 'profitTrend')],
        ['Idaho', '$5,916', createLine(data['idaho'], 'actualSales'), null, '$1,030', createColumn(data['idaho'], 'profitTrend')],
        ['Illinois', '$4,916', createLine(data['illinois'], 'actualSales'), null, '-$90', createColumn(data['illinois'], 'profitTrend')],
        ['Indiana', '$5,916', createLine(data['indiana'], 'actualSales'), null, '-$139', createColumn(data['indiana'], 'profitTrend')],
        ['Ohio', '$5,916', createLine(data['ohio'], 'actualSales'), null, '$1,196', createColumn(data['ohio'], 'profitTrend')],
        ['Oklahoma', '$4,916', createLine(data['oklahoma'], 'actualSales'), null, '-$127', createColumn(data['oklahoma'], 'profitTrend')],
        ['Oregon', '$6,916', createLine(data['oregon'], 'actualSales'), null, '-$16', createColumn(data['oregon'], 'profitTrend')],
        ['Vermont', '$4,916', createLine(data['vermont'], 'actualSales'), null, '$1,240', createColumn(data['vermont'], 'profitTrend')],
        ['Virginia', '$7,916', createLine(data['virginia'], 'actualSales'), null, '$4,172', createColumn(data['virginia'], 'profitTrend')],
        ['Washington', '$5,916', createLine(data['washington'], 'actualSales'), null, '-$390', createColumn(data['washington'], 'profitTrend')]
    ]);

    // span [0,1] and [0,2] cell
    table.getCell(0, 1).colSpan(2);

    // disable borders for all cells in the table
    table.cellBorder(null);

    // set dashed bottom border for all cells in the table
    table.cellBorder().bottom({color: borderColor, dash: '1 1'});

    // set default text settings for the table
    table.hAlign('center');
    table.vAlign('middle');
    table.fontSize('12px');
    table.fontFamily(fontFamilyText);

    // set fixed height for the first row
    table.getRow(0).height(40).fontColor(headerFontColor);

    // set fixed width for some of the tables columns
    table.getCol(0).width(90).hAlign('left');
    table.getCol(1).width(65);
    table.getCol(3).width(20).cellBorder().bottom('none');
    table.getCol(4).width(65);

    function createLine(data, field) {
        var sparkline = anychart.sparkline(data[field]);
        sparkline.seriesType('line');
        sparkline.height('100%');
        sparkline.margin()
            .top('5%')
            .bottom('5%');
        sparkline.padding(0);
        return sparkline;
    }

    function createColumn(data, field) {
        var sparkline = anychart.sparkline(data[field]);
        sparkline.seriesType('column');
        sparkline.height('100%');
        sparkline.margin()
            .top('5%')
            .bottom('5%');
        sparkline.padding(0);
        return sparkline;
    }

    return table
}
function create_bullet(data, palette) {
    var target = eval(data['toGoal'].join('+'));
    var actual = eval(data['actualSales'].join('+'));
    return anychart.bullet([
        {value: Math.round(actual), type: 'bar'},
        {value: Math.round(target), 'type': 'line'}
    ]);
}
function create_bullet_range(data, palette) {
    var target = eval(data['toGoal'].join('+'));
    var actual = eval(data['actualSales'].join('+'));
    var bullet = anychart.bullet([
        {value: Math.round(actual), 'type': 'x'},
        {value: Math.round(target), 'type': 'ellipse'}
    ]);
    bullet.range().from(0).to(Math.round(target) * 2 / 5);
    bullet.range(1).from(Math.round(target) * 2 / 5).to(Math.round(target) * 3 / 5);
    bullet.range(2).from(Math.round(target) * 3 / 5).to(Math.round(target) * 4 / 5);
    bullet.range(3).from(Math.round(target) * 4 / 5).to(Math.round(target) + 2);
    bullet.range(4).from(Math.round(target) + 2).to(37);
    return bullet;
}
function create_sparkline_area(palette) {
    var table = anychart.standalones.table();
    table.cellPadding(0).cellBorder(anychart.themes.defaultTheme.defaultBackground.fill);
    table.contents([
        [create_sparkline(table_data['Alabama'], 'area', palette)],
        [create_sparkline(table_data['Alaska'], 'area', palette)],
        [create_sparkline(table_data['Arizona'], 'area', palette)],
        [create_sparkline(table_data['Idaho'], 'area', palette)],
        [create_sparkline(table_data['Illinois'], 'area', palette)],
        [create_sparkline(table_data['Indiana'], 'area', palette)],
        [create_sparkline(table_data['Ohio'], 'area', palette)],
        [create_sparkline(table_data['Oklahoma'], 'area', palette)],
        [create_sparkline(table_data['Oregon'], 'area', palette)],
        [create_sparkline(table_data['Vermont'], 'area', palette)],
        [create_sparkline(table_data['Virginia'], 'area', palette)],
        [create_sparkline(table_data['Washington'], 'area', palette)]
    ]);
    return table;
}
function create_sparkline_column(palette) {
    var table = anychart.standalones.table();
    table.cellPadding(0).cellBorder(anychart.themes.defaultTheme.defaultBackground.fill);
    table.contents([
        [create_sparkline(table_data['Alabama'], 'column', palette), create_sparkline(table_data['Ohio'], 'column', palette)],
        [create_sparkline(table_data['Alaska'], 'column', palette), create_sparkline(table_data['Oklahoma'], 'column', palette)],
        [create_sparkline(table_data['Arizona'], 'column', palette), create_sparkline(table_data['Oregon'], 'column', palette)],
        [create_sparkline(table_data['Idaho'], 'column', palette), create_sparkline(table_data['Vermont'], 'column', palette)],
        [create_sparkline(table_data['Illinois'], 'column', palette), create_sparkline(table_data['Virginia'], 'column', palette)],
        [create_sparkline(table_data['Indiana'], 'column', palette), create_sparkline(table_data['Washington'], 'column', palette)]
    ]);
    return table;
}
function create_sparkline_line(palette) {
    var table = anychart.standalones.table();
    table.cellPadding(0).cellBorder(anychart.themes.defaultTheme.defaultBackground.fill);
    table.contents([
        [create_sparkline(table_data['Alabama'], 'line', palette)],
        [create_sparkline(table_data['Alaska'], 'line', palette)],
        [create_sparkline(table_data['Arizona'], 'line', palette)],
        [create_sparkline(table_data['Idaho'], 'line', palette)],
        [create_sparkline(table_data['Illinois'], 'line', palette)],
        [create_sparkline(table_data['Indiana'], 'line', palette)],
        [create_sparkline(table_data['Ohio'], 'line', palette)],
        [create_sparkline(table_data['Oklahoma'], 'line', palette)],
        [create_sparkline(table_data['Oregon'], 'line', palette)],
        [create_sparkline(table_data['Vermont'], 'line', palette)],
        [create_sparkline(table_data['Virginia'], 'line', palette)],
        [create_sparkline(table_data['Washington'], 'line', palette)]
    ]);
    return table;
}
function create_sparkline_win_loss(palette) {
    var table = anychart.standalones.table();
    table.cellPadding(0).cellBorder(anychart.themes.defaultTheme.defaultBackground.fill);
    table.contents([
        [create_sparkline(t1, 'winLoss', palette)],
        [create_sparkline(t2, 'winLoss', palette)],
        [create_sparkline(t3, 'winLoss', palette)],
        [create_sparkline(t4, 'winLoss', palette)],
        [create_sparkline(t5, 'winLoss', palette)],
        [create_sparkline(t6, 'winLoss', palette)],
        [create_sparkline(t7, 'winLoss', palette)],
        [create_sparkline(t8, 'winLoss', palette)],
        [create_sparkline(t9, 'winLoss', palette)],
        [create_sparkline(t10, 'winLoss', palette)],
        [create_sparkline(t11, 'winLoss', palette)],
        [create_sparkline(t12, 'winLoss', palette)]
    ]);
    return table;
}
function create_bullet_chart(palette) {
    table = anychart.standalones.table();
    table.hAlign('center');

    table.contents([
        [null],
        [null],
        [
            null,
            createBulletChart('A'),
            createBulletChart('B1'),
            createBulletChart('B2'),
            createBulletChart('B3'),
            createBulletChart('B5'),
            createBulletChart('B6'),
            createBulletChart('B7'),
            createBulletChart('B9'),
            createBulletChart('B12'),
            createBulletChart('C'),
            createBulletChart('D'),
            createBulletChart('E'),
            createBulletChart('K'),
            null
        ], [
            null,
            'A',
            'B1',
            'B2',
            'B3',
            'B5',
            'B6',
            'B7',
            'B9',
            'B12',
            'C',
            'D',
            'E',
            'K',
            null
        ],
        [null]
    ]);
    table.getRow(0).height(20);
    table.getRow(1).height(60);
    table.getRow(3).height(20);
    table.getRow(2).cellPadding(10, 10, 10, 10);
    table.getRow(4).height(20);
    table.getCell(1, 1).colSpan(13).useHtml(true)
        .content('The Content of Vitamins of Corporate Dinners. ACME corp. <br/>' +
            '<span  style="color:#929292; font-size: 13px;">(Actual to Norm)</span>')
        .fontSize(15)
        .vAlign('bottom');
    table.cellBorder(null);

    table.vAlign('middle');

    function createBulletChart(name) {
        var data = data_12()[name];
        var target = data['norm'];
        var actual = data['actual'];
        var bullet = anychart.bullet([
            {value: actual, type: 'bar', gap: 0.7, stroke: null},
            {
                value: target, 'type': 'line', 'gap': 0.2,
                stroke: {thickness: 2}
            }
        ]);
        bullet.background(true)
            .padding(10, 0, 0, 0)
            .layout('vertical')
            .axis(null)
            .title(false);
        return bullet;
    }

    return table
}
function create_bullet_range_chart(palette) {
    var table = anychart.standalones.table();
    table.cellPadding(0).cellBorder(anychart.themes.defaultTheme.defaultBackground.fill);
    table.contents([
        [create_bullet_range(table_data['Alabama'], palette)],
        [create_bullet_range(table_data['Alaska'], palette)],
        [create_bullet_range(table_data['Arizona'], palette)],
        [create_bullet_range(table_data['Idaho'], palette)],
        [create_bullet_range(table_data['Illinois'], palette)]
    ]);
    return table;
}
function create_ohlc(palette) {
    var chart = anychart.financial();
    chart.ohlc([
        {x: Date.UTC(2007, 7, 28), open: 511.53, high: 514.98, low: 505.79, close: 506.40},
        {x: Date.UTC(2007, 7, 29), open: 507.84, high: 513.30, low: 507.23, close: 512.88},
        {x: Date.UTC(2007, 7, 30), open: 512.36, high: 515.40, low: 510.58, close: 511.40},
        {x: Date.UTC(2007, 7, 31), open: 513.10, high: 516.50, low: 511.47, close: 515.25},
        {x: Date.UTC(2007, 8, 4), open: 515.02, high: 528.00, low: 514.62, close: 525.15}
    ]);
    return chart;
}
function create_candlestick(palette) {
    var chart = anychart.financial();
    chart.candlestick([
        {x: Date.UTC(2007, 7, 28), open: 511.53, high: 514.98, low: 505.79, close: 506.40},
        {x: Date.UTC(2007, 7, 29), open: 507.84, high: 513.30, low: 507.23, close: 512.88},
        {x: Date.UTC(2007, 7, 30), open: 512.36, high: 515.40, low: 510.58, close: 511.40},
        {x: Date.UTC(2007, 7, 31), open: 513.10, high: 516.50, low: 511.47, close: 515.25},
        {x: Date.UTC(2007, 8, 4), open: 515.02, high: 528.00, low: 514.62, close: 525.15}
    ]);
    return chart;
}
function create_heat_map_color_scaled(palette) {
    var chart = anychart.heatMap([
        {x: 'Rare', y: 'Insignificant', heat: 0},
        {x: 'Rare', y: 'Minor', heat: 0},
        {x: 'Rare', y: 'Moderate', heat: 0},
        {x: 'Rare', y: 'Major', heat: 0},
        {x: 'Rare', y: 'Extreme', heat: 0},
        {x: 'Unlikely', y: 'Insignificant', heat: 0},
        {x: 'Unlikely', y: 'Minor', heat: 0},
        {x: 'Unlikely', y: 'Moderate', heat: 0},
        {x: 'Unlikely', y: 'Major', heat: 1},
        {x: 'Unlikely', y: 'Extreme', heat: 1},
        {x: 'Possible', y: 'Insignificant', heat: 0},
        {x: 'Possible', y: 'Minor', heat: 0},
        {x: 'Possible', y: 'Moderate', heat: 1},
        {x: 'Possible', y: 'Major', heat: 1},
        {x: 'Possible', y: 'Extreme', heat: 1},
        {x: 'Likely', y: 'Insignificant', heat: 0},
        {x: 'Likely', y: 'Minor', heat: 1},
        {x: 'Likely', y: 'Moderate', heat: 1},
        {x: 'Likely', y: 'Major', heat: 2},
        {x: 'Likely', y: 'Extreme', heat: 2},
        {x: 'Almost\nCertain', y: 'Insignificant', heat: 0},
        {x: 'Almost\nCertain', y: 'Minor', heat: 1},
        {x: 'Almost\nCertain', y: 'Moderate', heat: 1},
        {x: 'Almost\nCertain', y: 'Major', heat: 2},
        {x: 'Almost\nCertain', y: 'Extreme', heat: 3}
    ]);
    var scale = anychart.scales.linearColor();
    chart.colorScale(scale);
    // todo: make it possible:
    //var colorRange = chart.colorRange();
    //colorRange.enabled(true);
    return chart;
}
function create_heat_map(palette) {
    var chart;

    // Creates Heat Map
    chart = anychart.heatMap(data_15());

    // Sets chart settings and hover chart settings
    chart.stroke('#fff');
    chart.hovered()
        .stroke('6 #fff')
        .fill('#545f69');
    chart.hovered().labels().fontColor('#fff');

    // Sets selection mode for single selection
    chart.interactivity().selectionMode('none');

    // Sets title
    chart.title().enabled(true).text('Risk Matrix in Project Server').padding([0, 0, 20, 0]);

    // Sets adjust chart labels
    var labels = chart.labels();
    labels.enabled(true).minFontSize(14);
    // variable with list of labels
    var namesList = ['Low', 'Medium', 'High', 'Extreme'];
    // Formats labels
    labels.format(function () {
        // replace values with words for points heat
        return namesList[this.heat];
    });

    // Sets Axes
    chart.yAxis().stroke(null).labels().padding([0, 15, 0, 0]);
    chart.yAxis().ticks(false);
    chart.xAxis()
        .stroke(null)
        .ticks(false);

    // Sets Tooltip
    chart.tooltip().title().useHtml(true);
    chart.tooltip().useHtml(true)
        .titleFormat(function () {
            return '<b>' + namesList[this.heat] + '</b> Residual Risk';
        })
        .format(function () {
            return '<span style="color: #CECECE">Likelihood: </span>' + this.x + '<br/>' +
                '<span style="color: #CECECE">Consequence: </span>' + this.y;
        });

    return chart;
}
function create_tree_map(palette) {
    var data = anychart.data.tree(data_14(), 'as-table');
    var chart = anychart.treeMap(data);

    // sets title
    chart.title()
        .enabled(true)
        .text('Top 1000 Companies by Revenue from INC.com');

    // setting the number of levels shown
    chart.hintDepth(1);
    // hintOpacity setting
    chart.hintOpacity(0.8);
    // disables selection opportunity
    chart.selectionMode('none');

    // sets labels settings
    chart.labels()
        .enabled(true)
        .fontSize(14);

    // sets tooltip settings and formatter
    var tooltip = chart.tooltip();
    tooltip.useHtml(true).format(function () {
        if (this.getData('city'))
            return '<span style="color: #bfbfbf">Revenue: ' + '</span>$' + parseInt(this.value).toLocaleString() + '<br/>' +
                '<span style="color: #bfbfbf">City: ' + '</span>' + this.getData('city');
        return '<span style="color: #bfbfbf">Revenue: ' + '</span>$' + parseInt(this.value).toLocaleString();
    });

    return chart;
}
function create_tree_map_with_color_range(palette) {
    var data = anychart.data.tree([
        {id: 'Cosmetics', parent: null},
        {id: 'Decorative Cosmetics', parent: 'Cosmetics'},
        {id: 'Masking Cosmetics', parent: 'Decorative Cosmetics'},
        {id: 'Powder', parent: 'Masking Cosmetics', value: 20},
        {id: 'Foundation', parent: 'Masking Cosmetics', value: 30},
        {id: 'Rouge', parent: 'Masking Cosmetics', value: 15},
        {id: 'Lips Cosmetics', parent: 'Decorative Cosmetics'},
        {id: 'Pomade', parent: 'Lips Cosmetics', value: 55},
        {id: 'Lip gloss', parent: 'Lips Cosmetics', value: 45},
        {id: 'Lip pencil', parent: 'Lips Cosmetics', value: 50},
        {id: 'Eye Cosmetics', parent: 'Decorative Cosmetics'},
        {id: 'Mascara', parent: 'Eye Cosmetics', value: 35},
        {id: 'Eyeliner', parent: 'Eye Cosmetics', value: 70},
        {id: 'Eye shadow', parent: 'Eye Cosmetics', value: 105},

        {id: 'Face-care Cosmetics', parent: 'Cosmetics'},
        {id: 'Balm Cream', parent: 'Face-care Cosmetics'},

        {id: 'Creams', parent: 'Face-care Cosmetics', value: 400},
        {id: 'Day-care Cream', parent: 'Face-care Cosmetics', value: 300},
        {id: 'Night-care Cream', parent: 'Face-care Cosmetics', value: 400},

        {id: 'Body-care Cosmetics', parent: 'Cosmetics'},
        {id: 'Skin-care', parent: 'Body-care Cosmetics', value: 400},
        {id: 'Hair-care', parent: 'Body-care Cosmetics'},
        {id: 'Shampoo', parent: 'Hair-care', value: 300},
        {id: 'Hair Balm', parent: 'Hair-care', value: 400},
        {id: 'Moisturizer', parent: 'Skin-care', value: 100}
    ], 'as-table');
    var chart = anychart.treeMap(data);
    var colorRange = chart.colorRange();
    colorRange.enabled(true);

    chart.title('Profit from Cosmetics Sales. ACME corp.');
    return chart;
}