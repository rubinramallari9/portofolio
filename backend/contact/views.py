from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Contacts
from .serializers import ContactSerializer


class ContactViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling Contact operations.
    Provides: list, create, retrieve, update, partial_update, destroy
    """
    queryset = Contacts.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new contact submission
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    def list(self, request, *args, **kwargs):
        """
        List all contact submissions
        """
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
