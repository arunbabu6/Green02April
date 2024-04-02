

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .serializers import UserRegisterSerializer

# Create your views here.
@api_view(["POST", ])
def logout_user(request):
    """
    # Method to execute POST functionality

    :param request: User opts to logout of the application
    :return: {"message": "You are logged out"}, 200 on success
    """
    if request.method == "POST":
        request.user.auth_token.delete()
        return Response({"message": "You are logged out"}, status=status.HTTP_200_OK)


@api_view(["POST", ])
def user_register_view(request):
    """
    # User Registration Function
    :param request: User opts to register on the application
    :return: Token on success || Error or failure
    """
    if request.method == "POST":
        serializer = UserRegisterSerializer(data = request.data)

        data = {}
        # Validates if sent information matches the constraints
        if serializer.is_valid():
            account = serializer.save()

            data['response'] = "Account has been created"
            data['username'] = account.username
            data['email'] = account.email

            token = Token.objects.get(user = account).key
            data['token'] = token
            return Response(data, status=status.HTTP_201_CREATED)

        data = serializer.errors
        return Response(data, status = status.HTTP_400_BAD_REQUEST)

