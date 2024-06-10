from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, MediaViewSet, StorageViewSet, ProjectViewSet,RegisterView

router = DefaultRouter()
router.register(r'userprofiles', UserProfileViewSet)
router.register(r'media', MediaViewSet)
router.register(r'storage', StorageViewSet)
router.register(r'projects', ProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
]