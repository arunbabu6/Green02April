from unittest import skip
from rest_framework import status
from .tests_setup import TestSetUp


class LoginAPITest(TestSetUp):
    """
    Test cases for the Login API

    1. Check if the token can be generated without passing email or password or empty.
    2. Check if token generated at the time of registration is same as at the time of login.
    3. Check if user can generate login token with blank form
    """

    def test_if_token_is_generated_with_incorrect_credentials(self):
        """
        Testing if the token is being generated even if 1 credential
        provided is incorrect.
        """
        # Registering a user
        res = self.client.post(self.register_url, data=self.user_data, format='json')

        # Logging In
        login_data_set1 = {
            "username": self.user_data["username"],
            "password": "incorrect_password"
        }

        logRes1 = self.client.post(self.login_url, data=login_data_set1, format='json')

        login_data_set2 = {
            "username": "incorrect_password",
            "password": self.user_data["password"]
        }

        logRes2 = self.client.post(self.login_url, data=login_data_set2, format='json')

        error_output = 'Unable to log in with provided credentials.'
        # Assertions
        self.assertEqual(logRes1.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(logRes2.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(logRes1.data['non_field_errors'][0][::], error_output)
        self.assertEqual(logRes2.data['non_field_errors'][0][::], error_output)

    def test_if_token_is_being_generated_with_valid_data(self):
        """
        Testing if we are getting the same token at the time of
        Login which we got at the time of Registration.
        :return:
        """
        #
        # Registering a user
        res = self.client.post(self.register_url, data=self.user_data, format='json')

        # Logging In
        login_data = {
            "username": self.user_data["username"],
            "password": self.user_data["password"]
        }
        logRes = self.client.post(self.login_url, data=login_data, format='json')

        # Assertions
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(logRes.status_code, status.HTTP_200_OK)
        self.assertEqual(logRes.data["token"], res.data["token"])

    def test_if_token_is_being_generated_with_missing_details(self):
        """
        Testing if token can be generated when user submits an empty
        login form
        """
        login_data = {
            "username": "incorrect_password",
            "password": self.user_data["password"]
        }

        logRes = self.client.post(self.login_url, data=login_data, format='json')

        error_output = 'Unable to log in with provided credentials.'
        # Assertions
        self.assertEqual(logRes.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(logRes.data['non_field_errors'][0][::], error_output)
