var currentPalette, currentSeriesCount, currentTheme, currentTypes;
var chart1, chart2, stock1, stock2;
var stage1, stage2, stage3, stage4, stage5, stage6;
var isStock = false;

function hidePreloader() {
	$('#loader').fadeOut('slow');
}

function disposeCharts() {
    if (chart1) chart1.dispose();
    if (chart2) chart2.dispose();
    if (stock1) stock1.dispose();
    if (stock2) stock2.dispose();
}
function createStages() {
    stage1 = acgraph.create('container-chart-1');
    stage2 = acgraph.create('container-chart-2');
    stage3 = acgraph.create('container-stock-1');
    stage4 = acgraph.create('container-stock-2');
}
function showStockCharts(flag) {
    if (flag) {
        isStock = true;
        $('.container-stock').show();
        $('.container-chart').hide();
    } else {
        isStock = false;
        $('.container-stock').hide();
        $('.container-chart').show();
    }
}

function updateCharts(palette, chartTypes, seriesCount) {
    showStockCharts(false);

    if (chartTypes == 'bar-column') {
        chart1 = create_bar_chart(palette).container(stage1).draw();
        chart2 = create_column_chart(palette).container(stage2).draw();
    } else if (chartTypes == 'pie-donut') {
        chart1 = create_pie_chart(palette).container(stage1).draw();
        chart2 = create_donut_chart(palette).container(stage2).draw();
    } else if (chartTypes == 'line-area') {
        chart1 = create_line_chart(palette).container(stage1).draw();
        chart2 = create_spline_area_chart(palette).container(stage2).draw();
    } else if (chartTypes == 'marker-bubble') {
        chart1 = create_marker_chart(palette).container(stage1).draw();
        chart2 = create_bubble_chart(palette).container(stage2).draw();
    } else if (chartTypes == 'radar-polar') {
        chart1 = create_radar_line_chart(palette).container(stage1).draw();
        chart2 = create_polar_line_chart(palette).container(stage2).draw();
    }
    else if (chartTypes == 'bullet-sparkline') {
        chart1 = create_bullet_chart(palette).container(stage1).draw();
        chart2 = create_sparkline_chart(palette).container(stage2).draw();
    }
    else if (chartTypes == 'treemap-heatmap') {
        chart1 = create_tree_map(palette).container(stage1).draw();
        chart2 = create_heat_map(palette).container(stage2).draw();
    }
    else if (chartTypes == 'error-box') {
        chart1 = create_error_chart(palette).container(stage1).draw();
        chart2 = create_box_chart(palette).container(stage2).draw();
    }
    else if (chartTypes == 'pyramid-funnel') {
        chart1 = create_pyramid_chart(palette).container(stage1).draw();
        chart2 = create_funnel_chart(palette).container(stage2).draw();
    }
    else if (chartTypes == '3dBar-3dColumn') {
        chart1 = create_3D_bar_chart(palette).container(stage1).draw();
        chart2 = create_3D_column_chart(palette).container(stage2).draw();
    }
    else if (chartTypes == '3dPie-3dArea') {
        chart1 = create_3D_pie_chart(palette).container(stage1).draw();
        chart2 = create_3D_area_chart(palette).container(stage2).draw();
    }
    else if (chartTypes == 'polarMarker-radarArea') {
        chart1 = create_radar_area_chart(palette).container(stage1).draw();
        chart2 = create_polar_marker_chart(palette).container(stage2).draw();
    }
    else if (chartTypes == 'choropleth-choroplethRange') {
        chart1 = create_choropleth_map(palette).container(stage1).draw();
        chart2 = create_choropleth_range_map(palette).container(stage2).draw();
    }
    else if (chartTypes == 'bubbleMarkers-connector') {
        chart1 = create_bubble_markers_map(palette).container(stage1).draw();
        chart2 = create_connector_map(palette).container(stage2).draw();
    }
    else {
        showStockCharts(true);
        if (chartTypes == 'stock-line-column') {
            stock1 = create_column_stock(palette).container(stage3).draw();
            stock2 = create_line_stock(palette).container(stage4).draw();
        }
        else if (chartTypes == 'stock-ohlc-area') {
            stock1 = create_ohlc_stock(palette).container(stage3).draw();
            stock2 = create_area_stock(palette).container(stage4).draw();
        }
    }
}
function update() {
    var chartWithOutPalette = ['treemap', 'heatmap', 'bullet', 'sparkline'];

    var $paletteSelect = $('#palettes-select');
    var $chartTypes = $('#chart-types-select');

    if ($chartTypes.find('option:selected').attr('data-palette')) {
        $paletteSelect.attr('disabled', 'disabled').selectpicker('refresh');
    } else {
        $paletteSelect.removeAttr('disabled').selectpicker('refresh');
    }

    var theme = $('#themes-select').val().split('|')[0];
    var chartTypes = $chartTypes.val();
    var paletteName = $paletteSelect.val();
    var palette = anychart.palettes[paletteName];
    var seriesCount = (paletteName == 'monochrome') ? 5 : 10;
    if (theme != currentTheme || palette != currentPalette || chartTypes != currentTypes || seriesCount != seriesCount) {
        currentPalette = palette;
        currentSeriesCount = seriesCount;
        currentTheme = theme;
        currentTypes = chartTypes;
        disposeCharts();
        anychart.theme(theme);
        updateCharts(palette, chartTypes, seriesCount);
    }

    for (var i = 0; i < chartWithOutPalette.length; i++) {
        if (chartTypes.indexOf(chartWithOutPalette[i]) != -1) {
            $paletteSelect.attr('disabled', true).selectpicker('refresh');
            break;
        } else {
            $paletteSelect.removeAttr('disabled').selectpicker('refresh');
        }
    }
}


$(function () {
    createStages();
    update();

    $('#themes-select').on('change', function () {
        var themePalette = $('#themes-select').val().split('|')[1];
        var paletteSelect = $('#palettes-select');
        paletteSelect.val(themePalette);
        paletteSelect.selectpicker('refresh');
        update();
    });

    $('#chart-types-select').on('change', update);

    $('#palettes-select').on('change', function () {
        var paletteName = $('#palettes-select').val();
        var palette = anychart.palettes[paletteName];
        var $chartType = $('#chart-types-select');

        if (palette != currentPalette) {
            if (!isStock && !$chartType.find('option:selected').attr('data-palette')) {
                chart1.palette(palette);
                chart2.palette(palette);
            } else {
                var keys = Object.keys(plots);
                for (var i = 0; i < keys.length; i++) {
                    for (key in plots[keys[i]]) {
                        if (plots[keys[i]].hasOwnProperty(key)) {
                            plots[keys[i]][key].palette(palette);
                        }
                    }
                }
            }
            currentPalette = palette;
        }
    });
});

$(window).on('load', function () {
	hidePreloader();
});

