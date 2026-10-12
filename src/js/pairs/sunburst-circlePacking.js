// A9-947 pair: sunburst and circle packing, one small tree each.

function create_sunburst_chart(palette) {
    var data = [{name: 'ACME', value: 281, children: [
        {name: 'Engineering', value: 106, children: [
            {name: 'Platform', value: 42},
            {name: 'Mobile', value: 28},
            {name: 'Data', value: 22},
            {name: 'QA', value: 14}
        ]},
        {name: 'Sales', value: 66, children: [
            {name: 'Enterprise', value: 30},
            {name: 'SMB', value: 18},
            {name: 'Retail', value: 18}
        ]},
        {name: 'Marketing', value: 54, children: [
            {name: 'Brand', value: 16},
            {name: 'Digital', value: 20},
            {name: 'Events', value: 18}
        ]},
        {name: 'Operations', value: 55, children: [
            {name: 'Support', value: 20},
            {name: 'Finance', value: 18},
            {name: 'IT', value: 17}
        ]}
    ]}];
    var chart = anychart.sunburst(data, 'as-tree');
    chart.title('ACME budget by department and team, M$');
    // the default mode splits sectors equally; this one sizes them by value
    // (parent-dependent reads the parent totals, so they are in the data)
    chart.calculationMode('parent-dependent');
    // outer sectors are wide and shallow: names along the arc fit at a readable size
    chart.leaves().labels().position('circular');
    return v9_palette(chart, palette);
}

function create_circle_packing_chart(palette) {
    var data = [
        {name: 'Electronics', children: [
            {name: 'Phones', value: 120},
            {name: 'Laptops', value: 95},
            {name: 'Tablets', value: 45},
            {name: 'Audio', value: 38}
        ]},
        {name: 'Home', children: [
            {name: 'Furniture', value: 70},
            {name: 'Kitchen', value: 52},
            {name: 'Lighting', value: 24},
            {name: 'Decor', value: 30}
        ]},
        {name: 'Sports', children: [
            {name: 'Cycling', value: 40},
            {name: 'Fitness', value: 34},
            {name: 'Outdoor', value: 28}
        ]},
        {name: 'Books', children: [
            {name: 'Fiction', value: 26},
            {name: 'Non-fiction', value: 22},
            {name: 'Kids', value: 16}
        ]}
    ];
    var chart = anychart.circlePacking(data, 'as-tree');
    chart.title('Store catalogue by category, items sold (k)');
    return v9_palette(chart, palette);
}

v9Panels['sunburst-circlePacking'] = [create_sunburst_chart, create_circle_packing_chart];
