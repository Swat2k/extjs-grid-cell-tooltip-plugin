Ext.define('App.plugins.CellTooltip', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.celltooltip',

    init: function (grid) {
        let me = this;
        grid.on('afterlayout', me.onAfterLayout, me);
        return me.callParent();
    },

    onAfterLayout: function () {
        let me = this,
            cmp = me.getCmp(),
            store = cmp.getStore(),
            columns = cmp.getColumns(),
            view = cmp.getView(),
            cellTd, cellInnerDiv;

        store.each(function (record) {
            columns.filter(x => !x.isHidden() && !me.isTooltipDisabled(x, record, store, view)).map( (column, columnIndex) => {

                cellTd = view.getCell(record, columnIndex);

                if (!cellTd) return true;

                cellInnerDiv = cellTd.querySelector(`.${Ext.baseCSSPrefix}grid-cell-inner`);

                if (cellTd.hasAttribute('data-qtip') && !cellTd.hasAttribute('overflow-tooltip')) {
                    return true;
                }

                if (me.isOverflow(cellInnerDiv) && cellTd.hasAttribute('overflow-tooltip')) {
                    return true;
                }

                if (me.isOverflow(cellInnerDiv) && !me.isTooltipSet(cellTd)) {

                    me.addTooltip(cellTd, cellInnerDiv.innerHTML, column);

                } else if (me.isTooltipSet(cellTd)) {

                    me.removeTooltip(cellTd);

                }

            });
        }, me);
    },

    addTooltip: function (cellTd, qTipText, column) {
        cellTd.setAttribute('overflow-tooltip', true);
        qTipText = this.isTooltipHtmlEncodeDisabled(column) ? qTipText : Ext.String.htmlEncode(qTipText);
        Ext.tip.QuickTipManager.register({
            target: cellTd,
            text: qTipText
        });
    },

    removeTooltip: function (cellTd) {
        cellTd.removeAttribute('overflow-tooltip');
        Ext.tip.QuickTipManager.unregister(cellTd);
    },

    isTooltipSet: function (cellTd) {
        return cellTd.hasAttribute('overflow-tooltip');
    },

    isTooltipDisabled: function (column, record, store, view) {
        return column.cellTooltip === false;
    },

    isTooltipHtmlEncodeDisabled: function(column) {
        return column.cellTooltipHtmlEncode === false;
    },

    isOverflow: function(el) {
        return el.scrollWidth > el.offsetWidth
    }
});