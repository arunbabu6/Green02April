

from selenium.webdriver.support.ui import WebDriverWait

class Email_Field_Elements(object):
    """ This class is to initiate set and get attributes for all page elements """

    def __set__(self, instance, value):
        """ This sets the value of the HTML element """
        driver = instance.driver
        WebDriverWait(driver, 10).until(lambda driver: driver.find_element(*self.forEdit))
        element = driver.find_element(*self.forEdit)
        element.clear()
        element.send_keys(value)

    def __get__(self, instance, owner):
        """ Gets the text value of the HTML element """
        driver = instance.driver
        # Waiting for the element to be visible
        WebDriverWait(driver, 10).until(lambda driver: driver.find_element(*self.forRead))
        # Extracting element value
        element = driver.find_element(*self.forRead)
        return element

class Password_Field_Elements(object):
    """ This class is to initiate set and get attributes for all page elements """

    def __set__(self, instance, value):
        """ This sets the value of the HTML element """
        driver = instance.driver
        WebDriverWait(driver, 10).until(lambda driver: driver.find_element(*self.forEdit))
        element = driver.find_element(*self.forEdit)
        element.clear()
        element.send_keys(value)

    def __get__(self, instance, owner):
        """ Gets the text value of the HTML element """
        driver = instance.driver
        # Waiting for the element to be visible
        WebDriverWait(driver, 10).until(lambda driver: driver.find_element(*self.forRead))
        # Extracting element value
        element = driver.find_element(*self.forRead)
        return element

class Forgot_Password_Field_Elements(object):
    """ This class is to initiate set and get attributes for forgot password element """

    def __set__(self, instance, value):
        """ This sets the value of the HTML element """
        driver = instance.driver
        WebDriverWait(driver, 10).until(lambda driver: driver.find_element(*self.forEdit))
        element = driver.find_element(*self.forEdit)
        element.clear()
        element.send_keys(value)

class Fund_Project_Description_Field_Elements(object):
    """ This class is to initiate set and get attributes for all page elements """

    def __set__(self, instance, value):
        """ This sets the value of the HTML element """
        driver = instance.driver
        WebDriverWait(driver, 10).until(lambda driver: driver.find_element(*self.forEdit))
        element = driver.find_element(*self.forEdit)
        element.clear()
        element.send_keys(value)

    def __get__(self, instance, owner):
        """ Gets the text value of the HTML element """
        driver = instance.driver
        # Waiting for the element to be visible
        WebDriverWait(driver, 10).until(lambda driver: driver.find_element(*self.forRead))
        # Extracting element value
        element = driver.find_element(*self.forRead)
        return element

class Fund_Amount_Field_Elements(object):
    """ This class is to initiate set and get attributes for all page elements """

    def __set__(self, instance, value):
        """ This sets the value of the HTML element """
        driver = instance.driver
        WebDriverWait(driver, 10).until(lambda driver: driver.find_element(*self.forEdit))
        element = driver.find_element(*self.forEdit)
        element.clear()
        element.send_keys(value)

    def __get__(self, instance, owner):
        """ Gets the text value of the HTML element """
        driver = instance.driver
        # Waiting for the element to be visible
        WebDriverWait(driver, 10).until(lambda driver: driver.find_element(*self.forRead))
        # Extracting element value
        element = driver.find_element(*self.forRead)
        return element