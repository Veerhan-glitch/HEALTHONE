import os
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Load all data from fixtures if they exist'

    def handle(self, *args, **kwargs):
        fixture_path = 'healthone/backend/fixtures'
        fixtures = ['lab.json', 'test.json', 'labtest.json', 'appointment.json']

        for fixture in fixtures:
            full_path = f'{fixture_path}{fixture}'

            if os.path.exists(full_path):
                self.stdout.write(self.style.SUCCESS(f'Loading {fixture}...'))
                os.system(f'python manage.py loaddata {full_path}')
            else:
                self.stdout.write(self.style.WARNING(f'Skipped {fixture} (file not found)'))
