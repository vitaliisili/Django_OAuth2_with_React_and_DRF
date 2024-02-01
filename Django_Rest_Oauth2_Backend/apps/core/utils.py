from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.exceptions import ValidationError as RestValidationError


class Validate:
    @staticmethod
    def password_validation(raw_password):
        """
        Validates the given password according to the password validation rules.
        Args:
            raw_password (str): The password to be validated.
        Returns:
            None
        Raises:
            RestValidationError: If the password does not meet the validation criteria.
        Notes:
            - This method uses the `validate_password` function from an external module to perform password validation.
            - If the password does not meet the validation criteria, a `ValidationError` is raised and caught.
            - A `RestValidationError` is then raised with the original error message to provide a
                more specific error for the validation failure.
        """
        try:
            validate_password(raw_password)
        except ValidationError as error:
            raise RestValidationError(error)
