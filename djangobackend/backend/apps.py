from django.apps import AppConfig


class BackendConfig(AppConfig):
    name = 'backend'
    initialized = False

    def ready(self):
        if BackendConfig.initialized:
            return
        BackendConfig.initialized = True
        print("Initializing Scheduler")

        from .views import workers
        for w in workers:
            if not w.is_alive():
                w.start()
