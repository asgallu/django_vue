from django.test import TestCase
from main.apps.booking.models import LoadingPort

'''
    I test one model.
    For the others are more or less the same method
'''


class TestModels(TestCase):

    def setUp(self):
        self.data = LoadingPort.objects.create(
            code_port="0006",
            description_port="BCN"
        )
        print(LoadingPort.objects.all())

    def test_loadingport(self):
        self.assertEqual(self.data.code_port, '0006')
        self.assertEqual(self.data.description_port, 'BCN')
