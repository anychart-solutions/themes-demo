// A9-947 pair calendar-timeline: a calendar of daily commits and a project-year timeline.
// Neither type has chart.palette, so v9_palette is a no-op here; the theme colors both.

function create_calendar_chart(palette) {
    // two years (2024, 2025) of daily commits, deterministic: weekday rhythm plus a slow seasonal wave
    var data = [];
    var day = Date.UTC(2024, 0, 1);
    for (var i = 0; i < 731; i++) {
        var d = new Date(day + i * 86400000);
        var weekday = d.getUTCDay();
        if (weekday === 0 || weekday === 6) {
            if (i % 5 !== 0) continue; // ponytail: most weekends empty, a few weekend pushes
        }
        var value = Math.round(6 + 4 * Math.sin(i / 29) + (i * 7) % 5 + (weekday === 2 ? 3 : 0));
        data.push({x: d.toISOString().slice(0, 10), value: value});
    }
    var chart = anychart.calendar(data);
    chart.title('ACME repository, commits per day');
    return v9_palette(chart, palette);
}

function create_timeline_chart(palette) {
    var chart = anychart.timeline();
    chart.title('ACME app launch, project year');
    // phases run back to back: overlapping ranges stack into taller bars that cover each other
    chart.range([
        {name: 'Scope', start: Date.UTC(2025, 0, 6), end: Date.UTC(2025, 1, 14)},
        {name: 'Design', start: Date.UTC(2025, 1, 17), end: Date.UTC(2025, 3, 11)},
        {name: 'Backend', start: Date.UTC(2025, 3, 14), end: Date.UTC(2025, 5, 27)},
        {name: 'Frontend', start: Date.UTC(2025, 5, 30), end: Date.UTC(2025, 7, 29)},
        {name: 'Testing', start: Date.UTC(2025, 8, 1), end: Date.UTC(2025, 9, 17)},
        {name: 'Beta', start: Date.UTC(2025, 9, 20), end: Date.UTC(2025, 10, 21)},
        {name: 'Marketing', start: Date.UTC(2025, 10, 24), end: Date.UTC(2026, 0, 23)}
    ]).name('Phases').direction('up').height(48); // taller bars fill the band above the axis
    // engineering milestones above the phases, business milestones below the axis
    chart.moment([
        {x: Date.UTC(2025, 0, 6), y: 'Kickoff'},
        {x: Date.UTC(2025, 3, 11), y: 'Design sign-off'},
        {x: Date.UTC(2025, 7, 29), y: 'Feature complete'},
        {x: Date.UTC(2025, 9, 10), y: 'Code freeze'}
    ]).name('Engineering').direction('up');
    chart.moment([
        {x: Date.UTC(2025, 1, 20), y: 'Seed round'},
        {x: Date.UTC(2025, 6, 1), y: 'Funding'},
        {x: Date.UTC(2025, 9, 20), y: 'Beta open'},
        {x: Date.UTC(2025, 10, 24), y: 'Launch'}
    ]).name('Business').direction('down');
    // room on both ends so the first and last milestone labels are not clipped
    chart.scale().minimum(Date.UTC(2024, 11, 1));
    chart.scale().maximum(Date.UTC(2026, 2, 1));
    return v9_palette(chart, palette);
}

v9Panels['calendar-timeline'] = [create_calendar_chart, create_timeline_chart];
