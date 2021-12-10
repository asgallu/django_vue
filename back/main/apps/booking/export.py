from import_export import resources
from .models import Vehicle


class VehicleResources(resources.ModelResource):
    class Meta:
        model = Vehicle
        fields = ['vin',
                  'make',
                  'model',
                  ]
        export_order = ['vin',
                        'make',
                        'model',
                        ]
