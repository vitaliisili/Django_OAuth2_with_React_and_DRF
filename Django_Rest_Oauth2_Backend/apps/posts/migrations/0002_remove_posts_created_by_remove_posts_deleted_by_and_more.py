# Generated by Django 5.0.1 on 2024-01-21 08:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='posts',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='posts',
            name='deleted_by',
        ),
        migrations.RemoveField(
            model_name='posts',
            name='uid',
        ),
        migrations.RemoveField(
            model_name='posts',
            name='updated_by',
        ),
    ]
