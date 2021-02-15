
const searchPage = require('../pageobjects/search.page.js');
let assert = require('assert');

let current = new Date().getDate();
let oneWeek = new Date().getDate() + 7;
let twoWeeks = new Date().getDate() + 14;
let now = new Date();
let daysOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
let selectedValues = {};


describe('Verify that the results match the search criteria', () => {
    it('should have the right title', () => {
        searchPage.open();
        expect(browser).toHaveTitle(
           'Vacation Rentals, Homes, Experiences & Places - Airbnb'
        );
        browser.pause(2000);
     });
     it('verify location Rome, Italy', () => {
        let input = searchPage.searchLocation();
        input.setValue('Rome, Italy');
        assert(input.getValue() === 'Rome, Italy');
        browser.keys(['Meta', 'Enter']);
        browser.pause(500);
     });
     it('verify check in dates - 1 week stay - a week after current date', () => {
        let checkInDay = daysOfMonth - current < 7 ? twoWeeks - daysOfMonth : oneWeek;
        let checkIn = searchPage.search(`._f8btejl=${checkInDay}`);
        checkIn.click();
        selectedValues.checkInDate = searchPage.search('//*[@data-testid="structured-search-input-field-split-dates-0"]/div/div[2]').getText();
        browser.pause(500);
        
        let checkOutDay = daysOfMonth - oneWeek < 7 ? twoWeeks - daysOfMonth : twoWeeks;
        let checkOut = searchPage.search(`._f8btejl=${checkOutDay}`);
        checkOut.click();
        browser.pause(500);
        selectedValues.checkOutDate = searchPage.search('//*[@data-testid="structured-search-input-field-split-dates-1"]/div/div[2]').getText();
     });
     it('verify adding guests - 2 adults 1 child', () => {
        let selectGuests = searchPage.search('._uh2dzp=Add guests');
        selectGuests.click();
        browser.pause(500);
  
        let selectAdults = searchPage.search('//*[@id="stepper-adults"]/button[2]/span');
        selectAdults.click();
        selectAdults.click();
        browser.pause(500);
  
        let selectchilren = searchPage.search('//*[@id="stepper-children"]/button[2]/span');
        selectchilren.click();
        browser.pause(500);
     });
     it('search for results', () => {
        let searchButton = searchPage.search('button._1mzhry13');
        searchButton.click();
        browser.pause(5000);
     });
     it('verify filters', () => {
        let dateFilter_location = searchPage.search('//*[@data-testid="little-search"]/button/div');
        dateFilter_location.click();
        browser.keys(['Meta', 'Enter']);
        browser.pause(500);
        assert(searchPage.search('//*[@data-testid="structured-search-input-field-query"]').getValue() === 'Rome, Italy');
        assert(searchPage.search('//*[@data-testid="structured-search-input-field-split-dates-0"]/div/div[2]').getText() === selectedValues.checkInDate);
        assert(searchPage.search('//*[@data-testid="structured-search-input-field-split-dates-1"]/div/div[2]').getText() === selectedValues.checkOutDate);
        assert(searchPage.search('//*[@data-testid="structured-search-input-field-guests-button"]/div/div[2]').getText() === '3 guests');
        browser.keys(['Meta', 'Escape']);
        browser.pause(500);
     });

     it('verify guests can accomodate', () => {
      let firstPageGuest = searchPage.multiSearch('//*[@class="_tmwq9g"]/div[3]');
      for (let i = 0; i < firstPageGuest.length; i++) {
         assert (parseInt(firstPageGuest[i].getText()[0]) >= 3);
      }
      browser.pause(500);
      });
});

describe('Verify that the results and details page match the extra filters', () => {
   it('should have the right title', () => {
      searchPage.open();
      expect(browser).toHaveTitle(
         'Vacation Rentals, Homes, Experiences & Places - Airbnb'
      );
      browser.pause(2000);
   });
    it('verify location Rome, Italy', () => {
       let input = searchPage.searchLocation();
       input.setValue('Rome, Italy');
       assert(input.getValue() === 'Rome, Italy');
       browser.keys(['Meta', 'Enter']);
       browser.pause(500);
    });
    it('verify check in dates - 1 week stay - a week after current date', () => {
       let checkInDay = daysOfMonth - current < 7 ? twoWeeks - daysOfMonth : oneWeek;
       let checkIn = searchPage.search(`._f8btejl=${checkInDay}`);
       checkIn.click();
       selectedValues.checkInDate = searchPage.search('//*[@data-testid="structured-search-input-field-split-dates-0"]/div/div[2]').getText();
       browser.pause(500);
       
       let checkOutDay = daysOfMonth - oneWeek < 7 ? twoWeeks - daysOfMonth : twoWeeks;
       let checkOut = searchPage.search(`._f8btejl=${checkOutDay}`);
       checkOut.click();
       browser.pause(500);
       selectedValues.checkOutDate = searchPage.search('//*[@data-testid="structured-search-input-field-split-dates-1"]/div/div[2]').getText();
    });
    it('verify adding guests - 2 adults 1 child', () => {
       let selectGuests = searchPage.search('._uh2dzp=Add guests');
       selectGuests.click();
       browser.pause(500);
 
       let selectAdults = searchPage.search('//*[@id="stepper-adults"]/button[2]/span');
       selectAdults.click();
       selectAdults.click();
       browser.pause(500);
 
       let selectchilren = searchPage.search('//*[@id="stepper-children"]/button[2]/span');
       selectchilren.click();
       browser.pause(500);
    });
    it('search for results', () => {
       let searchButton = searchPage.search('button._1mzhry13');
       searchButton.click();
       browser.pause(5000);
    });

    it('click on filters', () => {
      let filterOptions = searchPage.search('//*[@id="menuItemButton-dynamicMoreFilters"]');
      filterOptions.click();
      browser.pause(5000);
   });

   it('set number of bedrooms to 5', () => {
      let filter_bedroom = searchPage.search('//*[@data-testid="filterItem-rooms_and_beds-stepper-min_bedrooms-0-increase-button"]');
      //airbnb website has a bug where the romms and beds do not show up sometimes
      browser.pause(500);
      for (let i = 0; i < 5; i++) {
         filter_bedroom.click();
      }
      browser.pause(500);
   });

   it('select Pool from the Facilities section', () => {
      let property_pool = searchPage.search('//*[@id="filterItem-facilities-checkbox-amenities-7"]');
      property_pool.click();
      browser.pause(500);
   });

   it('click show stays', () => {
      let stayButton = searchPage.search('//*[@data-testid="more-filters-modal-submit-button"]');
      stayButton.click();
      browser.pause(5000);
   });

   it('verify guests can accomodate', () => {
      browser.switchWindow('Metropolitan City of Rome · Stays · Airbnb');
      let firstPageGuest_bedrooms = searchPage.multiSearch('//*[@class="_tmwq9g"]/div[3]');
      for (let i = 0; i < firstPageGuest_bedrooms.length; i++) {
         assert (parseInt(firstPageGuest_bedrooms[i].getText().split(' · ')[1].split(' '[0])) >= 5);
      }
      browser.pause(500);
   });

   it('check that in the Amenities popup Pool is displayed under Facilities category.', () => {
      let firstPageGuest_pools = searchPage.multiSearch('//*[@class="_tmwq9g"]/div[4]');
      assert (firstPageGuest_pools[0].getText().includes('Pool'));
      browser.pause(500);
   });
});

describe('Verify that a property is displayed on the map correctly', () => {
   it('should have the right title', () => {
      searchPage.open();
      expect(browser).toHaveTitle(
         'Vacation Rentals, Homes, Experiences & Places - Airbnb'
      );
      browser.pause(2000);
   });
    it('verify location Rome, Italy', () => {
       let input = searchPage.searchLocation();
       input.setValue('Rome, Italy');
       assert(input.getValue() === 'Rome, Italy');
       browser.keys(['Meta', 'Enter']);
       browser.pause(500);
    });
    it('verify check in dates - 1 week stay - a week after current date', () => {
       let checkInDay = daysOfMonth - current < 7 ? twoWeeks - daysOfMonth : oneWeek;
       let checkIn = searchPage.search(`._f8btejl=${checkInDay}`);
       checkIn.click();
       selectedValues.checkInDate = searchPage.search('//*[@data-testid="structured-search-input-field-split-dates-0"]/div/div[2]').getText();
       browser.pause(500);
       
       let checkOutDay = daysOfMonth - oneWeek < 7 ? twoWeeks - daysOfMonth : twoWeeks;
       let checkOut = searchPage.search(`._f8btejl=${checkOutDay}`);
       checkOut.click();
       browser.pause(500);
       selectedValues.checkOutDate = searchPage.search('//*[@data-testid="structured-search-input-field-split-dates-1"]/div/div[2]').getText();
    });
    it('verify adding guests - 2 adults 1 child', () => {
       let selectGuests = searchPage.search('._uh2dzp=Add guests');
       selectGuests.click();
       browser.pause(500);
 
       let selectAdults = searchPage.search('//*[@id="stepper-adults"]/button[2]/span');
       selectAdults.click();
       selectAdults.click();
       browser.pause(500);
 
       let selectchilren = searchPage.search('//*[@id="stepper-children"]/button[2]/span');
       selectchilren.click();
       browser.pause(500);
    });
    it('search for results', () => {
       let searchButton = searchPage.search('button._1mzhry13');
       searchButton.click();
       browser.pause(5000);
    });

    it('hover over the first property and click on map pointer', () => {
      browser.switchWindow('Metropolitan City of Rome · Stays · Airbnb');
      browser.maximizeWindow();
      browser.pause(5000);
     
      let element_desc = searchPage.multiSearch('//*[@itemprop="itemListElement"]/div/div/div[2]/div[2]/div/div/div/div');
      let element_name = searchPage.multiSearch('//*[@itemprop="itemListElement"]/div/div/div[2]/div[2]/div/div/div[2]');
      let mapLocations = searchPage.multiSearch('//*[@data-veloute="map/markers/BasePillMarker"]');
      let found = false;
      let element_in_map;;
      for (let i = 0; i < mapLocations.length; i++) {
         if (mapLocations[i].getAttribute('aria-label').includes(element_name[0].getText())){
            found = true;
            element_in_map = i;
         }
      }
      let map_location_div = searchPage.multiSearch('//*[@data-veloute="map/markers/BasePillMarker"]/div/div');
      let vanilla_css = map_location_div[element_in_map].getCSSProperty('background-color');
      assert(found);

      //will get the first property by default
      let element = searchPage.multiSearch('//*[@itemprop="itemListElement"]');
      element[0].scrollIntoView();
      element[0].moveTo();
      let selected_css = map_location_div[element_in_map].getCSSProperty('background-color');

      //Check that the property is displayed on the map and the color changes to indicate the selection.
      assert(vanilla_css.value !== selected_css.value);

      mapLocations[element_in_map].click();
      let map_element_0 = searchPage.search('//*[@class="_1x0fg6n"]/div[2]/ol/li');
      let map_element_1 = searchPage.search('//*[@class="_1x0fg6n"]/div[2]/ol/li[2]');
      let map_element_desc = map_element_0.getAttribute("innerText");
      map_element_desc = map_element_desc + map_element_1.getAttribute("innerText");
      let map_element_2 = searchPage.search('//*[@class="_1x0fg6n"]/div[3]');
      let map_element_name = map_element_2.getAttribute("innerText");
   
      //Verify that the details shown in the map popup are the same as the ones shown in the searchresults.
      assert(map_element_name, element_name[0].getText());
      assert(map_element_desc, element_desc[0].getAttribute("innerText").replace("in", "."));
      
      browser.pause(5000);
   });
});