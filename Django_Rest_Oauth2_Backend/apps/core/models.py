from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

user_model = settings.AUTH_USER_MODEL


class IsDeletedManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class BaseModel(models.Model):
    """BaseModel class.
    This class is an abstract base model for all models in the project.
    It defines common fields such as created_at, updated_at, deleted_at, and is_deleted.
    It also defines two managers, objects and objects_all, which can be used to retrieve
    objects based on whether they are deleted or not.

    Attributes:
        created_at (DateTimeField): The datetime when the object was created.
        updated_at (DateTimeField): The datetime when the object was last updated.
        deleted_at (DateTimeField): The datetime when the object was deleted.
        is_deleted (BooleanField): A boolean value indicating whether the object is deleted or not.
        objects (IsDeletedManager): A custom manager for retrieving objects that are not deleted.
        objects_all (Manager): The default manager for retrieving all objects.
    """
    created_at = models.DateTimeField(verbose_name=_("Created at"), auto_now_add=True, editable=False, db_index=True)
    updated_at = models.DateTimeField(verbose_name=_("Updated at"), auto_now=True, null=True, blank=True)
    deleted_at = models.DateTimeField(verbose_name=_("Deleted at"), null=True, blank=True)
    is_deleted = models.BooleanField(verbose_name=_("Is deleted"), default=False)

    objects = IsDeletedManager()
    objects_all = models.Manager()

    class Meta:
        abstract = True
