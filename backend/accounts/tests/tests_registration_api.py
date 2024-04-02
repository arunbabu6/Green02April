from unittest import skip

from rest_framework import status

from .tests_setup import TestSetUp

class RegistrationApiTest(TestSetUp):
    """
    Test cases for the registration api
    """
    def test_user_can_register_with_data(self):
        """
        :return: Checking different assertions when
                 submitting successful registration form.
        """
        response = self.client.post(self.register_url, data=self.user_data, format='json')

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['response'], "Account has been created")
        self.assertEqual(response.data['username'], self.user_data['username'])
        self.assertEqual(response.data['email'], self.user_data['email'])
        self.assertIsNotNone(response.data['token'])


    def test_user_cannot_register_without_data(self):
        """
        :return: Expecting to receive Status code : 400 when the user
                 submits blank registration form.
        """
        response = self.client.post(self.register_url)

        # Assertions
        self.assertEqual(response.status_code, 400)
        exp_error = "This field is required."
        self.assertEqual(response.data['username'][0][::], exp_error)
        self.assertEqual(response.data['password'][0][::], exp_error)
        self.assertEqual(response.data['password2'][0][::], exp_error)

    # @skip("Will test this later")
    def test_user_cannot_register_with_mismatch_password(self):
        """
        :return: Expecting to receive Status code : 400 when the user
                 submit different password1 and password2.
        """
        data = self.user_data
        data['password2'] = 'testing2'
        response = self.client.post(self.register_url, data, format='json')

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['Error'][::], "Password does not match")


    # @skip("Will test this later")
    def test_user_cannot_register_with_missing_data(self):
        """
        :return We are testing to receive Status code : 400 when the user sends
                missing information at the time of registration.
        """
        data1 = self.user_data
        data2 = self.user_data
        data3 = self.user_data

        data1['username'] = ''
        data2['password'] = ''
        data3['password2'] = ''

        response1 = self.client.post(self.register_url, data1, format='json')
        response2 = self.client.post(self.register_url, data2, format='json')
        response3 = self.client.post(self.register_url, data3, format='json')

        # Assertions
        self.assertEqual(response1.status_code, status.HTTP_400_BAD_REQUEST)
        exp_error = "This field may not be blank."
        self.assertEqual(response1.data['username'][0][::], exp_error)
        self.assertEqual(response2.data['password'][0][::], exp_error)
        self.assertEqual(response3.data['password2'][0][::], exp_error)
