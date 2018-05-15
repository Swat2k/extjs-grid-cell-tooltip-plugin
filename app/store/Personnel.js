Ext.define('App.store.Personnel', {
    extend: 'Ext.data.Store',

    alias: 'store.personnel',

    storeId: 'personnel',

    data: { items: [
        { name: 'Jean Luc', email: "jeanluc.picard@enterprise.com", phone: "555-111-1111", image: "https://pbs.twimg.com/profile_images/2390637207/zen_dao_circle_square_400x400.jpg" },
        { name: 'Worf',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222", image: "https://pbs.twimg.com/profile_images/2390637207/zen_dao_circle_square_400x400.jpg" },
        { name: 'Deanna',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333", image: "https://pbs.twimg.com/profile_images/2390637207/zen_dao_circle_square_400x400.jpg" },
        { name: 'Data',     email: "mr.data@enterprise.com",        phone: "555-444-4444", image: "https://pbs.twimg.com/profile_images/2390637207/zen_dao_circle_square_400x400.jpg" },
        { name: 'Data',     email: "mr.data@enterprise.com",        phone: "555-444-4444", image: "https://pbs.twimg.com/profile_images/2390637207/zen_dao_circle_square_400x400.jpg" }
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
