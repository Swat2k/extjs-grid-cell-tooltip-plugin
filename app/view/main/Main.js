Ext.define('App.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    requires: [
        'App.plugins.CellTooltip',
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox'
    ],
    layout: 'fit',
    items: [{
        xtype: 'grid',
        store: 'personnel',
        plugins: [{
            ptype: 'celltooltip'
        }],
        columns: [
            { 
                text: 'Name', 
                dataIndex: 'name',
                cellTooltip: false
            },
            { 
                text: 'Email', 
                dataIndex: 'email',
                flex: 1 
            },
            { 
                text: 'Phone', 
                dataIndex: 'phone' 
            },
            {
                xtype: 'templatecolumn', 
                tpl: '{name} ({email}) <img src="{image}">',
                cellTooltipHtmlEncode: false
            }
        ],
    }]
});
