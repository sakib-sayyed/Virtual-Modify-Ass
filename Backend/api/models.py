from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)

    def __str__(self):
        return self.user.username

class Storage(models.Model):
    total = models.FloatField()
    used = models.FloatField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE,unique=True)
    
    @property
    def available(self):
        return self.total - self.used

    def __str__(self):
        return f"{self.user.username} - Total: {self.total} GB, Used: {self.used} GB, Available: {self.available} GB"

class Media(models.Model):
    MEDIA_CHOICES = [
        ('Picture', 'Picture'),
        ('Video', 'Video'),
        ('Sound', 'Sound'),
    ]
    type = models.CharField(max_length=10, choices=MEDIA_CHOICES)
    size = models.FloatField()
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    storage = models.ForeignKey(Storage, on_delete=models.CASCADE, related_name='media',default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.storage.used += self.size
        else:
            original_media = Media.objects.get(pk=self.pk)
            self.storage.used += self.size - original_media.size
        
        self.storage.save()
        super().save(*args, **kwargs)
    
    def delete(self, *args, **kwargs):
        self.storage.used -= self.size
        self.storage.save()
        super().delete(*args, **kwargs)
    
    def __str__(self):
        return self.type


class Project(models.Model):
    name = models.CharField(max_length=255)
    memory_usage = models.FloatField()
    due_date = models.DateField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    members = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name