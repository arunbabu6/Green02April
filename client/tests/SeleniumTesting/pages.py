import time

from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from elements import Email_Field_Elements, Password_Field_Elements, Forgot_Password_Field_Elements, Fund_Project_Description_Field_Elements, Fund_Amount_Field_Elements
from locators import HomePageLocators, ContentPageLocators, SignUpPageLocators, SignInPageLocators, FundCardLocators, AdminLocators

class SignUp_Email_Element(Email_Field_Elements):
    """ This class get the search text from the specified locator """
    forEdit = SignUpPageLocators.EMAIL_CLK
    forRead = SignUpPageLocators.EMAIL_TXT

class SignUpPassword_Element(Password_Field_Elements):
    """ This class get the search text from the specified locator """
    forEdit = SignUpPageLocators.PASSWORD_CLK
    forRead = SignUpPageLocators.PASSWORD_TXT

class SignIn_Email_Element(Email_Field_Elements):
    """ This class get the search text from the specified locator """
    forEdit = SignInPageLocators.EMAIL_CLK
    forRead = SignInPageLocators.EMAIL_TXT

class SignInPassword_Element(Password_Field_Elements):
    """ This class get the search text from the specified locator """
    forEdit = SignInPageLocators.PASSWORD_CLK
    forRead = SignInPageLocators.PASSWORD_TXT

class Forgot_Element(Forgot_Password_Field_Elements):
    """ This class get the search text from the specified locator """
    forEdit = SignInPageLocators.EMAIL_FORGOT_PASSWORD

class Fund_Project_Desc_Element(Fund_Project_Description_Field_Elements):
    """ This class get the search text from the specified locator """
    forEdit = FundCardLocators.PROJECT_DESCRIPTION_TEXTBOX
    forRead = FundCardLocators.PROJECT_DESCRIPTION_LABEL

class Fund_Amt_Element(Fund_Amount_Field_Elements):
    """ This class get the search text from the specified locator """
    forEdit = FundCardLocators.AMOUT_TEXTBOX
    forRead = FundCardLocators.AMOUT_LABEL

class BasePage(object):
    """ Base class to initialize the driver for every test case """
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(self.driver, 10)

class HomePage(BasePage):
    """ Action methods related to home page come here """

    def is_title_matches(self):
        return "Nausicca's" in self.driver.title

    def click_signIn_button(self):
        WebDriverWait(self.driver, 10).until(lambda driver: self.driver.find_element(*HomePageLocators.SIGNIN))
        element = self.driver.find_element(*HomePageLocators.SIGNIN)
        return element

    def get_custom_txt_present(self, xpath):
        element = self.wait.until(EC.presence_of_element_located((xpath[0], xpath[1])))
        return element.text

class SignUpPage(HomePage):

    email_element = SignUp_Email_Element()
    password_element = SignUpPassword_Element()

    def navigate_to_sign_up_page(self):
        """ Add action items for entering to SignIn Page """

        # Entering SignIn Section
        signInButton = self.wait.until(EC.presence_of_element_located(HomePageLocators.SIGNIN))
        signInButton.click()

        # Entering SignUp Section
        signUpButton = self.wait.until(EC.element_to_be_clickable(SignUpPageLocators.SIGNUP))
        signUpButton.click()

    def welcome_element(self):
        """ Display of welcome Element """
        element = self.wait.until(EC.element_to_be_clickable(SignUpPageLocators.WELCOME))
        return element

    def click_submit_button(self):
        """ Clicks on Continue button to proceed with SignUp """
        element = self.wait.until(EC.element_to_be_clickable(SignUpPageLocators.SUBMIT))
        element.click()

    def get_emailError(self):
        """ Fetchs and give the email error """
        element = self.driver.find_element(*SignUpPageLocators.EMAIL_ERR)
        return element

    def get_passwordError(self):
        """ Fetchs and give the password error """
        element = self.driver.find_element(*SignUpPageLocators.PASSWORD_COMPLEXITY)
        return element

    def get_signIn_button(self):
        """ Fetchs Sign In button element """
        element = self.driver.find_element(*SignUpPageLocators.LOGIN)
        return element

    def get_signUp_button(self):
        """ Fetchs Sign In button element """
        element = self.driver.find_element(*SignUpPageLocators.SIGNUP)
        return element

class ContentPage(HomePage):
    """ This is the page we see after signing Up """

    def profile_cirlce(self):
        """ This contains the information inside the profile circle """
        element = self.wait.until(EC.element_to_be_clickable(ContentPageLocators.CIRCLE_LINK))
        return element

    def get_email(self):
        """ Fetches the email address after logging in """
        dropdown = self.profile_cirlce()
        dropdown.click()
        element = self.wait.until(EC.element_to_be_clickable(ContentPageLocators.LOGGED_EMAIL))
        return element

    def get_logout_button(self):
        """ Fetches the logout button """
        dropdown = self.profile_cirlce()
        dropdown.click()
        element = self.wait.until(EC.element_to_be_clickable(ContentPageLocators.LOGOUT_BUTTON))
        return element

    def check_if_cards_present(self):
        element = self.wait.until(EC.element_to_be_clickable(ContentPageLocators.CARDS))
        return element.tag_name == "img"

    def check_card_title(self):
        element = self.driver.find_element(*ContentPageLocators.CARD_TITLE)
        return element

    def check_fund_title(self):
        element = self.driver.find_element(*ContentPageLocators.FUND_TITLE)
        return element

    def click_amount_button(self):
        element = self.wait.until(EC.element_to_be_clickable(ContentPageLocators.CARD_AMT))
        element.click()



class SignInPage(SignUpPage):
    """ Elements to be present in the sign-in page """
    email = SignIn_Email_Element()
    password = SignInPassword_Element()
    forgot_email_button = Forgot_Element()

    def navigate_to_sign_in_page(self):
        """ Add action items for entering to SignIn Page """

        # Entering SignIn Section
        signInButton = self.wait.until(EC.presence_of_element_located(HomePageLocators.SIGNIN))
        signInButton.click()

    def sign_in(self, email, password):
        """ Method to Sign In """
        self.email = email
        self.password = password
        self.click_submit_button()

    def click_forgot_password_button(self):
        """ Click on Forgot Password """
        element = self.driver.find_element(*SignInPageLocators.FORGOT_PASSWORD)
        element.click()

    def password_reactivation(self):
        """ Methods to send email reactivation link """
        self.forgot_email_button = SignInPageLocators.USER_EMAIL
        self.driver.find_element(*SignInPageLocators.SIGNIN).click()

        element = self.driver.find_element(*SignInPageLocators.EMAIL_CONFIRMATION)
        return element

class FundCardPage(ContentPage):

    project_desc = Fund_Project_Desc_Element()
    fund_amount = Fund_Amt_Element()

    def click_submit_button(self):
        """ Clicks on Continue button to proceed with SignUp """
        element = self.wait.until(EC.element_to_be_clickable(FundCardLocators.SUBMIT))
        element.click()

class AdminPage(ContentPage):

    def approve_button(self):
        """ Returns element Approve button element """
        return self.wait.until(EC.element_to_be_clickable(AdminLocators.APPROVE_BUTTON))


    def decline_button(self):
        """ Returns element Decline button element """
        return self.wait.until(EC.element_to_be_clickable(AdminLocators.DECLINE_BUTTON))
