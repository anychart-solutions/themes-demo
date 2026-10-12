// A9-947 pair surface-seatMap: a surface plot and a seat map (HANDOUT contract).

// --- surface: yield over nitrogen x water, 11 x 11 grid, peak at a mid value ------
function create_surface_chart(palette) {
    var data = [];
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
            var n = i * 20;   // nitrogen, 0..200 kg/ha
            var w = j * 50;   // water, 0..500 mm
            var dn = (n - 110) / 60;
            var dw = (w - 280) / 150;
            data.push([n, w, Math.round(100 * Math.exp(-(dn * dn + dw * dw) / 2) * 10) / 10]);
        }
    }
    var chart = anychart.surface(data);
    // ponytail: units in the title; surface axis titles sit on the tick labels and vanish with any padding
    chart.title('Crop yield by nitrogen (kg/ha) and water (mm), %');
    chart.xScale().minimum(0).maximum(200).ticks().interval(50);
    chart.yScale().minimum(0).maximum(500).ticks().interval(100);
    chart.zScale().minimum(0).maximum(100);
    return v9_palette(chart, palette);
}

// --- seat map: a small hall, 5 rows x 10 seats, drawn inline as SVG ----------------
function create_seat_map_chart(palette) {
    var rows = 'ABCDE';
    // ponytail: hand-picked bookings, a cluster mid B-C plus a few pairs
    var bookedIds = ['A2', 'A3', 'B4', 'B5', 'B6', 'C4', 'C5', 'C6', 'C7', 'D9', 'D10', 'E1', 'E2'];
    var svg = "<svg xmlns='http://www.w3.org/2000/svg'><g>";
    var free = [];
    var booked = [];
    for (var r = 0; r < rows.length; r++) {
        for (var s = 0; s < 10; s++) {
            var id = rows.charAt(r) + (s + 1);
            // ponytail: an aisle after seat 5
            var x = 20 + s * 44 + (s >= 5 ? 30 : 0);
            svg += "<rect id='" + id + "' x='" + x + "' y='" + (20 + r * 44) + "' width='36' height='36'></rect>";
            (bookedIds.indexOf(id) !== -1 ? booked : free).push({id: id, value: r < 2 ? 60 : 40});
        }
    }
    svg += '</g></svg>';

    var chart = anychart.seatMap();
    chart.geoData(svg);
    chart.title('Hall seating, booked seats');
    // ponytail: two series so the theme palette colors each state and the legend names them
    chart.choropleth(free).name('Free').tooltip().titleFormat('Seat {%id}').format('Price: ${%value}');
    chart.choropleth(booked).name('Booked').tooltip().titleFormat('Seat {%id}').format('Price: ${%value}');
    chart.legend(true);
    chart.interactivity().selectionMode('none');
    return v9_palette(chart, palette);
}

v9Panels['surface-seatMap'] = [create_surface_chart, create_seat_map_chart];
