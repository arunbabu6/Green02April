

from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker

class TestSetUp(APITestCase):
    """
    Setup Class for running test cases
    for Registration, Login & Logout API
    """

    def setUp(self):
        """
        Method enables setting up pre-requisites for the
        test cases.
        """
        self.register_url = reverse('register')
        self.login_url = reverse('login')

        # Using faker to generate user data
        self.fake = Faker()

        password = self.fake.password()
        self.user_data = {
            'username': self.fake.email().split('@')[0],
            'email' : self.fake.email(),
            'password' : password,
            'password2' : password
        }

        return super().setUp()

    def tearDown(self):
        """
        Method disables setting up pre-requisites for
        the test cases
        """
        return super().tearDown()

