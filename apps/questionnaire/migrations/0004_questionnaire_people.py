# Generated by Django 3.0.4 on 2020-04-26 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questionnaire', '0003_auto_20200425_2010'),
    ]

    operations = [
        migrations.AddField(
            model_name='questionnaire',
            name='people',
            field=models.IntegerField(default=0, help_text='完成人数', verbose_name='完成人数'),
        ),
    ]
