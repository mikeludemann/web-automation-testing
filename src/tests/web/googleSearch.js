const {Builder, By, until} = require('selenium-webdriver');
const log4js = require('log4js');

const getLogger = log4js.getLogger();

(async function search() {
	const driver = await new Builder().forBrowser('firefox').build();

	function printTitle(){
		driver.getTitle().then(text => console.log(text));
	}

	try {

		await driver.get('https://www.google.com');

		var gsearch = driver.findElement(By.name('q'));
		var searchButton = driver.findElement(By.name('btnK'));

		await gsearch.sendKeys('wikipedia');
		await driver.executeScript("arguments[0].scrollIntoView()", searchButton);
		await driver.sleep(1000);
		if(searchButton.isDisplayed()){
			await searchButton.click();
		}
		await driver.wait(until.titleIs('wikipedia - Google-Suche'), 1000);
		await printTitle();
		await driver.sleep(2000);

		var getSearchElement = driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div[2]/div/div/div[1]/a/h3'));

		await getSearchElement.click();
		await driver.wait(until.titleIs('Wikipedia – Die freie Enzyklopädie'));
		await driver.sleep(2000);
		
		await printTitle();

	} catch(err){

		await console.log(err.message);

	} finally {

		await driver.quit();

	}

})();
