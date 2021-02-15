const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputLocation () { return $('#bigsearch-query-detached-query') }
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    searchLocation () {
        return this.inputLocation;
    }
    search (searchCheck) {
        return $(searchCheck);
    }
    multiSearch (searchCheck) {
        return $$(searchCheck);
    }
    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open();
    }
}

module.exports = new LoginPage();
