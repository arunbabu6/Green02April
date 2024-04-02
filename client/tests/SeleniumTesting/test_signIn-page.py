import time
import unittest
from faker import Faker
from selenium import webdriver
import pages as page
from locators import SignUpPageLocators, SignInPageLocators, VARIABLES
from faker import Faker
from selenium.webdriver.chrome.options import Options

class Nausicca_Home_Page(unittest.TestCase):
    """ Test cases will be written here """

    def setUp(self) -> None:

        # Setting for running Chrome in headless
        chrome_options = Options()
        chrome_options.add_argument("--headless=new")  # for Chrome >= 109
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.get(VARIABLES.URL)

    def test_verify_if_home_page_is_opening(self):
        main_page = page.HomePage(self.driver)

        self.assertTrue(main_page.is_title_matches())
        self.assertEqual(main_page.click_signIn_button().text, "Sign Up")

    def tearDown(self) -> None:
        self.driver.quit()

class Nausicca_SignIn_Page(unittest.TestCase):

    def setUp(self) -> None:
        """ Initialization of the driver """

        # Setting for running Chrome in headless
        chrome_options = Options()
        chrome_options.add_argument("--headless=new")  # for Chrome >= 109
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.get(VARIABLES.URL)

        # Navigate to SignIn page
        self.signIn_page = page.SignInPage(self.driver)
        self.signIn_page.navigate_to_sign_in_page()

        # Content page after the user sign ups
        self.content_page = page.ContentPage(self.driver)

        # Initiating Faker for generating fake data
        self.fake = Faker()


    def test_verify_that_the_user_can_successfully_sign_in_with_valid_credentials(self):
        """ Test 1. """

        # singing in
        creds = (SignInPageLocators.USER_EMAIL, SignInPageLocators.USER_PASSWORD)
        self.signIn_page.sign_in(*creds)

        # Assertions
        self.assertIsNotNone(self.content_page.profile_cirlce())
        self.assertEqual(self.content_page.get_email().text, SignInPageLocators.USER_EMAIL)


    def test_verify_that_the_user_cannot_sign_in_with_invalid_credentials(self):
        """ Test 2. """
        # singing in
        creds1 = (self.fake.email(), SignInPageLocators.USER_PASSWORD)
        creds2 = (SignInPageLocators.USER_EMAIL, self.fake.password())

        ## Assertions
        # Scenario 1:
        self.signIn_page.sign_in(*creds1)
        text = self.driver.find_element(*SignInPageLocators.INCORRECT_EMAIL_OR_PASSWORD).text
        self.assertEqual(text, "Wrong email or password")

        # Scenario 2:
        self.signIn_page.sign_in(*creds2)
        text = self.driver.find_element(*SignInPageLocators.INCORRECT_EMAIL_OR_PASSWORD).text
        self.assertEqual(text, "Wrong email or password")

    def test_verify_that_the_user_is_redirected_to_the_correct_page_after_signing_in(self):
        """ Test 3. """
        # singing in
        creds = (SignInPageLocators.USER_EMAIL, SignInPageLocators.USER_PASSWORD)
        self.signIn_page.sign_in(*creds)

        # Assertions
        self.assertIsNotNone(self.content_page.profile_cirlce())
        self.assertEqual(self.content_page.get_email().text, SignInPageLocators.USER_EMAIL)
        self.assertIsNotNone(self.driver.find_element(*SignInPageLocators.CARDS)) # checking cards

    def test_verify_the_Sign_In_page_displays_appropriate_validation_messages_for_empty_fields_or_invalid_inputs(self):
        """ Test 4. """

        # Singing in
        creds = (self.fake.email(), "")

        ## Assertions
        self.signIn_page.sign_in(*creds)
        highlight = self.driver.find_element(*SignInPageLocators.PASSWORD_CLK).get_attribute("required")
        self.assertIsNotNone(highlight)
        self.assertTrue(highlight)

    def test_verify_the_user_is_redirect_to_Email_resent_link_page_when_clicking_on_forgot_password_link_to_reset_their_password(self):
        """ Test 5. """

        # Click on forot password link
        self.signIn_page.click_forgot_password_button()
        # forgot_password_text = self.signIn_page.forgot_email_button
        continueButton = self.driver.find_element(*SignInPageLocators.SIGNIN)
        loginPage = self.driver.find_element(*SignInPageLocators.BACK_TO_LOGIN)

        # Assertions
        # self.assertEqual(forgot_password_text.text, "")
        self.assertEqual(continueButton.text, "Continue")
        self.assertEqual(loginPage.text, "Back to nausicca")

    def test_verify_that_the_user_can_successfully_send_email_reactivation_link(self):
        """ Test 6. """
        # Enter Forgot password page
        self.signIn_page.click_forgot_password_button()
        # Enter Email for Password Reset button
        self.signIn_page.password_reactivation()

        # Assertions
        self.assertEqual(self.driver.find_element(*SignInPageLocators.EMAIL_CONFIRMATION).text,"Check Your Email")


    def tearDown(self) -> None:
        self.driver.quit()

if __name__ == '__main__':
    unittest.main()