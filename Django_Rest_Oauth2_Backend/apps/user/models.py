import uuid
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from django_cleanup import cleanup


class UserManager(BaseUserManager):
    """A custom user manager for managing users in the application.

    This manager provides methods to create and manage user instances.

    Methods:
        create_user(email, password=None, **extra_fields): Create a new user instance.
        create_superuser(email, password): Create a new superuser instance.
    """

    def create_user(self, email, password=None, **extra_fields):
        """Creates a new user instance.

        Args:
            email: The email address of the user.
            password: The password of the user.
            extra_fields: Any additional fields to be added to the user model.

        Returns:
            The newly created user instance.
        """

        if not email:
            raise ValueError('User must have an email address.')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password):
        """Creates a new superuser instance.

        Args:
            email: The email address of the user.
            password: The password of the user.

        Returns:
            The newly created superuser instance.
        """

        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user


@cleanup.select
class User(AbstractBaseUser, PermissionsMixin):
    """A custom user model with additional fields and methods.

      Attributes:
          id (UUIDField): The unique identifier for the user.
          email (EmailField): The email address of the user.
          name (CharField): The name of the user.
          is_active (BooleanField): Indicates if the user is active.
          is_staff (BooleanField): Indicates if the user is a staff member.
          created_at (DateTimeField): The datetime when the user was created.
          updated_at (DateTimeField): The datetime when the user was last updated.
          is_verified (BooleanField): Indicates if the user is verified.
          objects (UserManager): The manager for the User model.
          USERNAME_FIELD (str): The field used as the username for authentication.

      Methods:
          __str__(): Returns a string representation of the user.
      """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    is_verified = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = 'email'

    def __str__(self):
        """Returns a string representation of the user.

       Returns:
           str: The name of the user.
        """

        return self.name
