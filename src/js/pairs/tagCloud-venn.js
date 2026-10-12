// A9-947 pair tagCloud-venn: a tag cloud and a venn diagram over one fictional support desk (ACME).

function create_tag_cloud_chart(palette) {
    var chart = anychart.tagCloud([
        {x: 'Login', value: 120}, {x: 'Password', value: 105}, {x: 'Billing', value: 96},
        {x: 'Refund', value: 82}, {x: 'Invoice', value: 74}, {x: 'Shipping', value: 70},
        {x: 'Delivery', value: 64}, {x: 'Account', value: 60}, {x: 'Export', value: 52},
        {x: 'Mobile app', value: 48}, {x: 'Sync', value: 44}, {x: 'Upgrade', value: 41},
        {x: 'API', value: 38}, {x: 'Import', value: 35}, {x: 'Discount', value: 32},
        {x: 'Notifications', value: 29}, {x: 'Reports', value: 27}, {x: 'Dashboard', value: 25},
        {x: 'Permissions', value: 22}, {x: 'Integration', value: 20}, {x: 'Timeout', value: 18},
        {x: 'Language', value: 15}, {x: 'Dark mode', value: 13}, {x: 'Backup', value: 11}
    ]);
    chart.title('Support ticket topics, tickets per month');
    chart.angles([0, 90]);
    return v9_palette(chart, palette);
}

function create_venn_chart(palette) {
    var chart = anychart.venn([
        {x: 'Email', value: 120},
        {x: 'Chat', value: 90},
        {x: 'Phone', value: 60},
        {x: ['Email', 'Chat'], value: 30},
        {x: ['Chat', 'Phone'], value: 15},
        {x: ['Email', 'Phone'], value: 25},
        {x: ['Email', 'Chat', 'Phone'], value: 8}
    ]);
    chart.title('Customers by support channel used');
    chart.intersections().labels().format('{%Value}');
    chart.legend(false); // circles are labeled; a legend would list every intersection too
    return v9_palette(chart, palette);
}

v9Panels['tagCloud-venn'] = [create_tag_cloud_chart, create_venn_chart];
