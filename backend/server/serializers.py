from rest_framework import serializers

# Create your serializerhere.
class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()