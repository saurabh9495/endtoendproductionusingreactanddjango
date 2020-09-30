# Generated by Django 3.0.3 on 2020-09-30 05:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Abort',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=256)),
                ('time', models.IntegerField(blank=True)),
                ('description', models.CharField(blank=True, max_length=256)),
                ('enabled', models.BooleanField(default=True)),
                ('others', models.CharField(blank=True, max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Create',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=256)),
                ('time', models.IntegerField(blank=True)),
                ('description', models.CharField(blank=True, max_length=256)),
                ('enabled', models.BooleanField(default=True)),
                ('others', models.CharField(blank=True, max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Deleted',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=256)),
                ('time', models.IntegerField(blank=True)),
                ('description', models.CharField(blank=True, max_length=256)),
                ('enabled', models.BooleanField(default=True)),
                ('others', models.CharField(blank=True, max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Halt',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=256)),
                ('time', models.IntegerField(blank=True)),
                ('description', models.CharField(blank=True, max_length=256)),
                ('enabled', models.BooleanField(default=True)),
                ('others', models.CharField(blank=True, max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Run',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=256)),
                ('time', models.IntegerField(blank=True)),
                ('description', models.CharField(blank=True, max_length=256)),
                ('enabled', models.BooleanField(default=True)),
                ('others', models.CharField(blank=True, max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Success',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=256)),
                ('time', models.IntegerField(blank=True)),
                ('description', models.CharField(blank=True, max_length=256)),
                ('enabled', models.BooleanField(default=True)),
                ('others', models.CharField(blank=True, max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Queue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.IntegerField(blank=True)),
                ('description', models.CharField(blank=True, max_length=256)),
                ('enabled', models.BooleanField(default=True)),
                ('others', models.CharField(blank=True, max_length=256)),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='queue', to='backend.Create')),
            ],
        ),
    ]