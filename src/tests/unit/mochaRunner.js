//const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const assert = require('chai').assert;
const fs = require('fs');
//const mocha = require('mocha');
require('geckodriver');

var driver;

var d = new Date();
var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
var month = d.getMonth() < 10 ? "0" + (d.getMonth()+1) : d.getMonth()+1;
var year = d.getFullYear();
var stamp = day + "." + month + "." + year;

describe('Google Search', function(){

    before(function(){
        this.timeout(10000);
        driver = global.driver ? global.driver : new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().addArguments('--headless')).build();
    });

    beforeEach(function(){
        driver.getTitle('https://www.google.com');
        driver.sleep(1000);
    });

    it('Webpage should have expected title', function(){
        const title = driver.getTitle();
        title.then(function(title){
            assert.equal(title, 'Google');
        });
    });

    it('Search wikipedia with google search', function(){
        var gsearch = driver.findElement(By.name('q'));
		var searchButton = driver.findElement(By.name('btnK'));

		gsearch.sendKeys('wikipedia');
		driver.executeScript("arguments[0].scrollIntoView()", searchButton);
		driver.sleep(1000);
		if(searchButton.isDisplayed()){
		    searchButton.click();
		}
        driver.wait(until.titleIs('wikipedia - Google-Suche'), 1000);
        const title = driver.getTitle();
        title.then(function(title){
            assert.equal(title, 'wikipedia - Google-Suche');
        });
    });

    afterEach(function(){
        driver.takeScreenshot().then(function(image, err){
            fs.writeFile('./screenshots/screen-' + stamp + '.png', image, 'base24', function(err){
                console.log(err);
            });
        });
        driver.sleep(2000);
    });

    after(function(){
        driver.quit();
    });

});