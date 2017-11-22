import { AppPage } from './app.po';
import { element, by, browser } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('chat-app App', () => {

  // at the top of the test spec:
  var fs = require('fs');
  
    // abstract writing screen shot to a file
    function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }

  it('should display message', () => {
    browser.get('/');

    var nameInput = element(by.id('name'));
    nameInput.sendKeys('Joe');

    var messageInput = element(by.id('MessageInput'));
    messageInput.sendKeys('Test message');
    
    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    var messageContainer = element(by.id('Messages'));
    var messages = messageContainer.all(element(by.tagName('div')));

    browser.sleep(3000);
    expect(messages.get(0)).toBeDefined();

    browser.takeScreenshot().then(function (png) {
      writeScreenShot(png, 'c:\\repos\\chat-app\\exception.png');
    });

  });


  it('should not display message', () => {
    browser.get('/');

    var messageInput = element(by.id('MessageInput'));
    messageInput.sendKeys('Test message');

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    var messageContainer = element(by.id('Messages'));
    var messages = element.all(by.css('.msg')).map(function (elm) {
      return elm.getText();
    });

    browser.sleep(3000);

    messages.then(function (result) {
      expect(result.length).toEqual(0);
    });
  });
});
