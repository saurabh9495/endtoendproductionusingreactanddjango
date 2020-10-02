from django.db import models
from django.contrib import admin

# helper decorator to add these models to the admin view.
ADMIN_REGISTRATION = []


def admin_register(cls):
    ADMIN_REGISTRATION.append(cls)
    return cls


@admin_register
class Create(models.Model):
    name = models.CharField(max_length=256, blank=True)
    time = models.IntegerField(blank=True, default=0)
    description = models.CharField(max_length=256, blank=True)
    enabled = models.BooleanField(default=True)
    others = models.CharField(max_length=256, blank=True)

    def __str__(self):
        return "{0}({1})".format(self.__class__.__name__, self.name)


@admin_register
class Queue(models.Model):
    name = models.ForeignKey(
        Create, on_delete=models.CASCADE, related_name="queue")
    time = models.IntegerField(blank=True, default=0)
    description = models.CharField(max_length=256, blank=True)
    enabled = models.BooleanField(default=True)
    others = models.CharField(max_length=256, blank=True)

    def __str__(self):
        return "{0}({1})".format(self.__class__.__name__, self.name)


@admin_register
class Halt(models.Model):
    name = models.ForeignKey(
        Queue, on_delete=models.CASCADE, related_name="halt")
    time = models.IntegerField(blank=True, default=0)
    description = models.CharField(max_length=256, blank=True)
    enabled = models.BooleanField(default=True)
    others = models.CharField(max_length=256, blank=True)

    def __str__(self):
        return "{0}({1})".format(self.__class__.__name__, self.name)


@admin_register
class Run(models.Model):
    name = models.ForeignKey(
        Queue, on_delete=models.CASCADE, related_name="run")
    time = models.IntegerField(blank=True, default=0)
    description = models.CharField(max_length=256, blank=True)
    enabled = models.BooleanField(default=True)
    others = models.CharField(max_length=256, blank=True)

    def __str__(self):
        return "{0}({1})".format(self.__class__.__name__, self.name)


@admin_register
class Abort(models.Model):
    name = models.ForeignKey(
        Queue, on_delete=models.CASCADE, related_name="abort")
    time = models.IntegerField(blank=True, default=0)
    description = models.CharField(max_length=256, blank=True)
    enabled = models.BooleanField(default=True)
    others = models.CharField(max_length=256, blank=True)

    def __str__(self):
        return "{0}({1})".format(self.__class__.__name__, self.name)


@admin_register
class Deleted(models.Model):
    name = models.ForeignKey(
        Queue, on_delete=models.CASCADE, related_name="delete")
    time = models.IntegerField(blank=True, default=0)
    description = models.CharField(max_length=256, blank=True)
    enabled = models.BooleanField(default=True)
    others = models.CharField(max_length=256, blank=True)

    def __str__(self):
        return "{0}({1})".format(self.__class__.__name__, self.name)


@admin_register
class Success(models.Model):
    name = models.ForeignKey(
        Run, on_delete=models.CASCADE, related_name="success")
    time = models.IntegerField(blank=True, default=0)
    description = models.CharField(max_length=256, blank=True)
    enabled = models.BooleanField(default=True)
    others = models.CharField(max_length=256, blank=True)

    def __str__(self):
        return "{0}({1})".format(self.__class__.__name__, self.name)
