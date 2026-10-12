// A9-947 pair sankey-wordTree: Sankey diagram + word tree.
// Same contract as chart-v9.js: create_<x>(palette) returns an undrawn chart.

function create_sankey_chart(palette) {
    // ACME web shop, one week: traffic source -> landing page -> outcome
    var chart = anychart.sankey([
        {from: 'Search', to: 'Home', weight: 42},
        {from: 'Search', to: 'Product', weight: 30},
        {from: 'Social', to: 'Home', weight: 18},
        {from: 'Social', to: 'Blog', weight: 16},
        {from: 'Email', to: 'Product', weight: 20},
        {from: 'Home', to: 'Purchase', weight: 14},
        {from: 'Home', to: 'Bounce', weight: 46},
        {from: 'Product', to: 'Purchase', weight: 28},
        {from: 'Product', to: 'Bounce', weight: 22},
        {from: 'Blog', to: 'Purchase', weight: 3},
        {from: 'Blog', to: 'Bounce', weight: 13}
    ]);
    chart.title('Site visits: source to outcome (k)');
    return v9_palette(chart, palette);
}

function create_word_tree_chart(palette) {
    // customer reviews of a coffee shop; root word "coffee"
    var chart = anychart.wordtree([
        ['coffee is strong and fresh'],
        ['coffee is strong but bitter'],
        ['coffee is too hot'],
        ['coffee is always fresh'],
        ['coffee tastes great'],
        ['coffee tastes burnt'],
        ['coffee tastes like chocolate'],
        ['coffee was cold'],
        ['coffee was worth the wait'],
        ['coffee comes fast'],
        ['coffee comes with a smile'],
        ['coffee costs too much']
    ]);
    chart.word('coffee');
    chart.title('Customer reviews: what they say about coffee');
    return v9_palette(chart, palette);
}

v9Panels['sankey-wordTree'] = [create_sankey_chart, create_word_tree_chart];
