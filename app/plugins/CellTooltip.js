Ext.define('App.plugins.CellTooltip', {
	extend: 'Ext.plugin.Abstract',
	alias: 'plugin.celltooltip',
	tdCells: [],
	tips: [],
	init: function(grid) {
		let me = this,
			view = grid.getView();
		me.tdCells = [];
		me.tips = [];
		view.on('itemmouseleave', me.removeMarkup, me);
		view.on('itemmouseenter', me.addMarkup, me);
		return me.callParent();
	},
	removeMarkup: function() {
		let me = this;
		me.tdCells.map(x => me.removeTooltip(x));
	},
	addMarkup: function(view, record, tdCell, index, e) {
		let me = this,
			cmp = me.getCmp(),
			store = cmp.getStore(),
			columns = cmp.getColumns(),
			cellTd;
		if (store) {
			columns.filter(x => x.isVisible(true) && !me.isTooltipDisabled(x, record, store, view)).map((column, columnIndex) => {
				cellTd = view.getCell(record, columnIndex);
				me.processCellTd(cellTd, column, e);
			});
			let summaryTdEls = view.getEl().query(`.${Ext.baseCSSPrefix}grid-row-summary > td`);
			for (let cellTd of summaryTdEls) {
				me.processCellTd(cellTd, undefined, e);
			}
		}
	},
	privates: {
		addTooltip: function(cellTd, tooltipText, column, e) {
			let me = this;
			cellTd.setAttribute('overflow-tooltip', true);
			if (me.tdCells.some(x => x === cellTd)) {
				return;
			}
			let tip = me.buildTooltip(cellTd, tooltipText, column, e);
			me.tdCells.push(cellTd);
			me.tips.push(tip);
		},
		removeTooltip: function(cellTd) {
			let me = this,
				indexToDelete = me.tdCells.findIndex(x => x === cellTd);
			if (indexToDelete > -1) {
				me.tips[indexToDelete].destroy();
				me.tips = Ext.Array.removeAt(me.tips, indexToDelete);
				me.tdCells = Ext.Array.removeAt(me.tdCells, indexToDelete);
			}
			cellTd.removeAttribute('overflow-tooltip');
		},
		isTooltipSet: function(cellTd) {
			return cellTd.hasAttribute('overflow-tooltip');
		},
		isTooltipDisabled: function(column, record, store, view) {
			return column.cellTooltip === false;
		},
		isOverflow: function(el) {
			return el.scrollWidth > el.offsetWidth;
		},
		processCellTd: function(cellTd, column, e) {
			let me = this;
			if (!cellTd) return true;
			let cellInnerDiv = cellTd.querySelector(`.${Ext.baseCSSPrefix}grid-cell-inner`);
			if (cellTd.hasAttribute('data-qtip') && !cellTd.hasAttribute('overflow-tooltip')) {
				return true;
			}
			if (me.isOverflow(cellInnerDiv) && cellTd.hasAttribute('overflow-tooltip')) {
				return true;
			}
			if (me.isOverflow(cellInnerDiv) && !me.isTooltipSet(cellTd)) {
				me.addTooltip(cellTd, cellInnerDiv.innerHTML, column, e);
			} else if (me.isTooltipSet(cellTd)) {
				me.removeTooltip(cellTd);
			}
		},
		buildTooltip: function(target, text, column, e) {
			let cellTd = e.getTarget('td'),
				tip = Ext.create('Ext.tip.ToolTip', {
					target: target,
					html: text,
					hideDelay: 10,
					showDelay: 30
				});
			if (cellTd && cellTd === target && cellTd.hasAttribute('role') && cellTd.getAttribute('role') === 'gridcell') {
				tip.show();
			}
			return tip;
		}
	}
});
