from rest_framework import serializers
from .models import Contacts


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = ['id', 'name', 'email', 'message']
        read_only_fields = ['id']

    def validate_email(self, value):
        """
        Custom validation for email field
        """
        if Contacts.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email has already been used to submit a contact form.")
        return value
