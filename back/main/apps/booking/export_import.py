from import_export import resources
from .models import LoadingPort, DischargePort


class LoadingPortResources(resources.ModelResource):
    class Meta:
        model = LoadingPort

        fields = [
            'id',
            'code_port',
            'descriptionL_port',
        ]

        export_order = [
            'id',
            'code_port',
            'descriptionL_port',
        ]


class DischargePortResources(resources.ModelResource):
    class Meta:
        model = DischargePort

        fields = ['code_port',
                  'descriptionD_port',
                  ]

        export_order = ['code_port',
                        'descriptionD_port',
                        ]
