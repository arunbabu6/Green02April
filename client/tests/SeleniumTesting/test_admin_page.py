
import unittest

from faker import Faker
from selenium import webdriver
import pages as page
from locators import AdminLocators, SignInPageLocators, VARIABLES
from selenium.webdriver.chrome.options import Options

class Nausicca_Home_Page(unittest.TestCase):
    """ Test cases will be written here """

    def setUp(self) -> None:

        # Setting for running Chrome in headless
        chrome_options = Options()
        # chrome_options.add_argument("--headless=new")  # for Chrome >= 109
        self.driver = webdriver.Chrome(options=chrome_options)
        # self.driver = webdriver.Firefox()
        # self.driver = webdriver.Edge()

        self.driver.get(VARIABLES.URL)

    def test_verify_if_home_page_is_opening(self):
        main_page = page.HomePage(self.driver)

        self.assertTrue(main_page.is_title_matches())
        self.assertEqual(main_page.click_signIn_button().text, "Sign Up")

    def tearDown(self) -> None:
        self.driver.quit()

class Nausicca_Admin_Page(unittest.TestCase):
    def setUp(self) -> None:
        """ Initialization of the driver """

        # Setting for running Chrome in headless
        chrome_options = Options()
        # chrome_options.add_argument("--headless=new")  # for Chrome >= 109
        self.driver = webdriver.Chrome(options=chrome_options)
        # self.driver = webdriver.Firefox()
        # self.driver = webdriver.Edge()
        self.driver.get(VARIABLES.URL)

        # Navigate to SignIn page
        self.signIn_page = page.SignInPage(self.driver)
        self.signIn_page.navigate_to_sign_in_page()

        # Content page after the user sign ups
        self.content_page = page.ContentPage(self.driver)

        # Admin page
        self.admin_page = page.AdminPage(self.driver)

        # Initiating Faker for generating fake data
        self.fake = Faker()


    def test_verify_that_the_admin_can_successfully_sign_in_with_valid_credentials(self):
        """ Test 1. """
        # loading local environment variables

        # singing in
        creds = (AdminLocators.ADMIN_EMAIL, AdminLocators.ADMIN_PWD)
        self.signIn_page.sign_in(*creds)

        # Assertions
        self.assertIsNotNone(self.content_page.profile_cirlce())
        self.assertEqual(self.content_page.get_email().text, AdminLocators.ADMIN_EMAIL)

    def test_verify_that_the_admin_cannot_successfully_sign_in_with_invalid_credentials(self):
        """ Test 2. """
        # singing in
        creds1 = (self.fake.email(), AdminLocators.ADMIN_PWD)
        creds2 = (AdminLocators.ADMIN_EMAIL, self.fake.password())

        ## Assertions
        # Scenario 1:
        self.signIn_page.sign_in(*creds1)
        text = self.driver.find_element(*SignInPageLocators.INCORRECT_EMAIL_OR_PASSWORD).text
        self.assertEqual(text, "Wrong email or password")

        # Scenario 2:
        self.signIn_page.sign_in(*creds2)
        text = self.driver.find_element(*SignInPageLocators.INCORRECT_EMAIL_OR_PASSWORD).text
        self.assertEqual(text, "Wrong email or password")

    def test_verify_that_the_admin_is_redirected_to_the_correct_page_after_signing_in(self):
        """ Test 3. """
        creds = (AdminLocators.ADMIN_EMAIL, AdminLocators.ADMIN_PWD)
        self.signIn_page.sign_in(*creds)

        # Assertions
        self.assertIsNotNone(self.content_page.profile_cirlce())
        self.assertEqual(self.content_page.get_email().text, AdminLocators.ADMIN_EMAIL)
        self.assertTrue(self.content_page.get_custom_txt_present(AdminLocators.APPROVE_BUTTON))
        self.assertTrue(self.content_page.get_custom_txt_present(AdminLocators.DECLINE_BUTTON))

    def test_verify_if_fund_request_description_text_box_is_present(self):
        """ Test 4. """
        creds = (AdminLocators.ADMIN_EMAIL, AdminLocators.ADMIN_PWD)
        self.signIn_page.sign_in(*creds)

        description = self.content_page.get_custom_txt_present(AdminLocators.FUND_DESCRIPTION)
        # Assertions
        self.assertEqual(type(description), str)

    def test_verify_if_requested_fund_amount_is_present(self):
        """ Test 5. """
        creds = (AdminLocators.ADMIN_EMAIL, AdminLocators.ADMIN_PWD)
        self.signIn_page.sign_in(*creds)

        amount = self.content_page.get_custom_txt_present(AdminLocators.FUND_AMOUNT)
        # Assertions
        self.assertEqual(type(amount), str)

    def test_verify_if_approve_button_is_present(self):
        """ Test 6. """
        creds = (AdminLocators.ADMIN_EMAIL, AdminLocators.ADMIN_PWD)
        self.signIn_page.sign_in(*creds)

        button = self.admin_page.approve_button()

        # Assertions
        self.assertEqual(button.text, "Approve")


    def test_verify_if_decline_button_is_present(self):
        """ Test 7. """
        creds = (AdminLocators.ADMIN_EMAIL, AdminLocators.ADMIN_PWD)
        self.signIn_page.sign_in(*creds)

        button = self.admin_page.decline_button()
        # Assertions
        self.assertEqual(button.text, "Decline")



    def tearDown(self):
        self.driver.quit()

if __name__ == '__main__':
    unittest.main()