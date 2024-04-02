import time
import unittest
from faker import Faker
from selenium import webdriver
import pages as page
from locators import VARIABLES, SignInPageLocators, ContentPageLocators, FundCardLocators


class Nausicca_Home_Page(unittest.TestCase):
    """ Test cases will be written here """

    def setUp(self) -> None:
        self.driver = webdriver.Chrome()
        # # self.driver = webdriver.Firefox()
        # self.driver = webdriver.Edge()
        self.driver.get(VARIABLES.URL)

    def test_verify_if_home_page_is_opening(self):
        main_page = page.HomePage(self.driver)

        self.assertTrue(main_page.is_title_matches())
        self.assertEqual(main_page.click_signIn_button().text, "Sign Up")

    def tearDown(self) -> None:
        self.driver.quit()

class Nausicca_User_Home_Page(unittest.TestCase):
    def setUp(self):
        """ Initialization of the driver """
        self.driver = webdriver.Chrome()
        # self.driver = webdriver.Firefox()
        # self.driver = webdriver.Edge()
        self.driver.get(VARIABLES.URL)

        # Navigate to SignIn page
        self.signIn_page = page.SignInPage(self.driver)
        self.signIn_page.navigate_to_sign_in_page()

        # Content page after the user sign ups
        self.content_page = page.ContentPage(self.driver)

        # singing in
        creds = (SignInPageLocators.USER_EMAIL, SignInPageLocators.USER_PASSWORD)
        self.signIn_page.sign_in(*creds)

        # Initiating Fund card
        self.card = page.FundCardPage(self.driver)

        # Initiating Faker for generatingq fake data
        self.fake = Faker()

    def test_verify_user_name_is_same_as_logged_in_email(self):
        """ Test 1. """
        existingUsername = SignInPageLocators.USER_EMAIL.split("@")[0]
        username = self.content_page.get_email().text
        username = username.split("@")[0]

        # Assertions
        self.assertIsNotNone(self.content_page.profile_cirlce())
        self.assertEqual(username, existingUsername)

    def test_verify_email_is_same_as_logged_in_email(self):
        """ Test 2. """
        existingEmail = SignInPageLocators.USER_EMAIL
        email = self.content_page.get_email().text

        # Assertion
        self.assertEqual(existingEmail, email)

    def test_verify_if_project_description_text_box_is_present(self):
        """ Test 3. """
        # Clicking on card
        self.content_page.click_signIn_button()

        # Assertion
        self.assertTrue()


    def test_verify_if_project_description_text_box_is_present(self):
        """ Test 4. """
        # click on card to view details
        self.content_page.click_amount_button()
        desc = self.card.project_desc

        # Assertion
        self.assertEqual(desc.text, "Project Description:")

    def test_verify_Requested_Amount_text_box_is_present(self):
        """ Test 5. """
        # click on card to view details
        self.content_page.click_amount_button()
        desc = self.card.fund_amount

        # Assertion
        self.assertEqual(desc.text, "Requested Amount:")

    def test_verify_if_submit_application_button_is_present(self):
        """ Test 6. """
        # click on card to view details
        self.content_page.click_amount_button()
        submitButton = self.content_page.get_custom_txt_present(FundCardLocators.SUBMIT)

        # Assertion
        self.assertEqual(submitButton, "Submit Application")

    def test_verify_if_cancel_button_is_present(self):
        """ Test 7. """
        # click on card to view details
        self.content_page.click_amount_button()
        cancelButton = self.content_page.get_custom_txt_present(FundCardLocators.CANCEL)

        # Assertion
        self.assertEqual(cancelButton, "Cancel")

    def test_verify_if_we_get_same_card_content_if_we_try_to_submit_incomplete_information(self):
        """ Test 8. """
        # click on card to view details
        self.content_page.click_amount_button()

        # Enter amount and not description
        self.card.fund_amount = 150
        self.card.click_submit_button()

        desc = self.card.project_desc
        self.assertEqual(desc.text, "Project Description:")

    def test_verify_if_we_submit_the_content_with_complete_details(self):
        """ Test 9. """
        # click on card to view details
        self.content_page.click_amount_button()

        # Enter amount and description
        self.card.fund_amount = 150
        self.card.project_desc = "Testing Description"
        self.card.click_submit_button()

        # Switching to fetch text from Alert
        time.sleep(1)
        alert_obj = self.driver.switch_to.alert
        text = alert_obj.text
        alert_obj.accept()

        # Assertions
        self.assertEqual(text, "Your grant application has been submitted!")


    def tearDown(self) -> None:
        self.driver.quit()

if __name__ == '__main__':
    unittest.main()