// A9-947 pair org-network: an org chart and a network graph.
// Same contract as chart-v9.js: create_<x>(palette) returns an undrawn chart.

function create_org_chart(palette) {
    var chart = anychart.orgChart([
        {id: 'ceo', name: 'Sarah Johnson', title: 'CEO'},
        {id: 'cto', parent: 'ceo', name: 'Michael Chen', title: 'CTO'},
        {id: 'cfo', parent: 'ceo', name: 'Emily Davis', title: 'CFO'},
        {id: 'coo', parent: 'ceo', name: 'Robert Wilson', title: 'COO'},
        {id: 'eng', parent: 'cto', name: 'David Kim', title: 'Engineering'},
        {id: 'prod', parent: 'cto', name: 'Lisa Zhang', title: 'Product'},
        {id: 'acct', parent: 'cfo', name: 'Diana Ross', title: 'Accounting'},
        {id: 'ops', parent: 'coo', name: 'Peter Jackson', title: 'Operations'},
        {id: 'sales', parent: 'coo', name: 'Maria Lopez', title: 'Sales'}
    ], 'as-table');
    chart.title('ACME leadership team');
    return v9_palette(chart, palette);
}

function create_network_graph_chart(palette) {
    var chart = anychart.graph({
        // ponytail: fixed layout, a left-to-right tree, so no edge runs through a label
        nodes: [
            {id: 'Router', x: 0, y: 177}, {id: 'Firewall', x: 110, y: 177},
            {id: 'Switch A', x: 230, y: 97}, {id: 'Switch B', x: 230, y: 257},
            {id: 'Web', x: 350, y: 33}, {id: 'Backup', x: 350, y: 105},
            {id: 'Mail', x: 350, y: 145}, {id: 'Database', x: 460, y: 69},
            {id: 'Laptop', x: 350, y: 201}, {id: 'Desktop', x: 350, y: 241},
            {id: 'Printer', x: 350, y: 281}, {id: 'Phone', x: 350, y: 321}
        ],
        edges: [
            {from: 'Router', to: 'Firewall'},
            {from: 'Firewall', to: 'Switch A'}, {from: 'Firewall', to: 'Switch B'},
            {from: 'Switch A', to: 'Web'}, {from: 'Switch A', to: 'Database'},
            {from: 'Switch A', to: 'Mail'}, {from: 'Switch A', to: 'Backup'},
            {from: 'Web', to: 'Database'}, {from: 'Backup', to: 'Database'},
            {from: 'Switch B', to: 'Laptop'}, {from: 'Switch B', to: 'Desktop'},
            {from: 'Switch B', to: 'Printer'}, {from: 'Switch B', to: 'Phone'}
        ]
    });
    chart.title('Office IT network');
    chart.layout().type('fixed');
    chart.nodes().labels().enabled(true);
    chart.nodes().labels().format('{%id}');
    return v9_palette(chart, palette);
}

v9Panels['org-network'] = [create_org_chart, create_network_graph_chart];
