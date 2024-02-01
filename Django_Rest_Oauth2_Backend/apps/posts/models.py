from django.contrib.auth import get_user_model
from django.db import models
from apps.core.models import BaseModel


class Posts(BaseModel):
    """Defines a model class for Posts.
    This class represents a post with a title, message, and author. It inherits from the BaseModel class.

    Attributes:
        title (CharField): The title of the post, with a maximum length of 255 characters.
        message (TextField): The message of the post.
        author (ForeignKey): The author of the post, a foreign key to the User model.
    """

    title = models.CharField(max_length=255, verbose_name='Title', blank=False, null=False)
    message = models.TextField(verbose_name='Message', blank=False, null=False)
    author = models.ForeignKey(get_user_model(), verbose_name='Author', on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return self.title
