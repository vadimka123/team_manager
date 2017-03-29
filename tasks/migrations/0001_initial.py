# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-28 19:27
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('dev_eta', models.DateField(null=True)),
                ('status', models.CharField(choices=[('TODO', 'Todo'), ('IN_PROGRESS', 'In progress'), ('DONE', 'Done')], default='TODO', max_length=256)),
                ('label', models.CharField(max_length=256)),
                ('description', models.CharField(blank=True, max_length=256, null=True)),
                ('user_created', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='task_created', to=settings.AUTH_USER_MODEL)),
                ('user_dev', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='task_dev', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]