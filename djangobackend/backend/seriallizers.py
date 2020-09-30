from rest_framework import serializers
from . import models
import datetime


class CreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Create
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return models.Create.objects.create(**validated_data)


class QueuedSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Queue
        fields = '__all__'

    def queue(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return models.Queue.objects.create(**validated_data)


class HaltSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Halt
        fields = '__all__'

    def halt(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return models.Halt.objects.create(**validated_data)


class RunningSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Run
        fields = '__all__'

    def running(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return models.Run.objects.create(**validated_data)


class AbortSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Abort
        fields = '__all__'

    def abort(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return models.Abort.objects.create(**validated_data)


class DeletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Deleted
        fields = '__all__'

    def deleted(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return models.Deleted.objects.create(**validated_data)


class SuccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Success
        fields = '__all__'

    def success(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return models.Success.objects.create(**validated_data)
