import * from './airtable.browser.js';
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keyKEDd4VpZwHDga6' }).base('apphQRB2KoFoHPxOG');
var contactId = '';
let button = document.createElement('button');
button.innerHTML = 'Go to contact';
button.setAttribute("style", "display: none;");
document.querySelectorAll('body')[0].appendChild(button)
var loadTable = function() {
var mail = document.querySelectorAll('.c-profile__details .email')[0].textContent;

base('Test').select({
    filterByFormula: "{Email} = '" + mail + "'"
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
	contactId = record.id;
	if(record){
	    button.setAttribute("style", 'display: block');
	}
    });

    fetchNextPage();
}, function done(error) {
    console.log(error);
});
};

button.addEventListener('click', function(){
var win = window.open("https://www.google.com/contacts/view/con_" + contactId, '_blank');
// var win = window.open("https://ecommerce.airportal.app/contacts/view/con_" + contactId, '_blank');
win.focus();
})

loadTable();
