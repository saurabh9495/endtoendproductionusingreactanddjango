from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Create, Queue, Halt, Abort, Deleted, Success, Run
from .seriallizers import CreateSerializer, QueuedSerializer, HaltSerializer, RunningSerializer, AbortSerializer, DeletedSerializer, SuccessSerializer
from time import sleep
from threading import Thread
from django.db import transaction

# Number of workers Using the concept of threads


class SingletonThread(Thread):
    INSTANCE = None

    @classmethod
    def get_instance(cls):
        if not cls.INSTANCE:
            cls.INSTANCE = cls()
        return cls.INSTANCE

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.daemon = True


# Maintaining a list of all queued items
queued_list = []
# Maintaining a list of all running items
running_list = []
# Maintaining a list of all successful items
successful_list = []


class MoveCreatedJobstoQueue(SingletonThread):
    def run(self):
        print("ScheduleUpkeep worker started! Mover Thread")
        while 1:
            sleep(60)
            self.check_schedule()

    def check_schedule(self):
        for c in Create.objects.filter(enabled=True):
            print(c, "Mover Thread Queue Addition")
            if c in queued_list:
                continue
            with transaction.atomic():
                s = Queue()
                s.name = c
                s.time = c.time
                s.description = c.description
                s.enabled = c.enabled
                s.others = c.others
                s.save()
                queued_list.append(c)

        for q in Queue.objects.filter(enabled=True):
            print(q, "Worker Thread Run Addition")
            if q in running_list:
                continue
            with transaction.atomic():
                s = Run()
                s.name = q
                s.time = q.time
                s.description = q.description
                s.enabled = q.enabled
                s.others = q.others
                s.save()
                running_list.append(q)

        for r in Run.objects.filter(enabled=False):
            print(r, "Worker Thread Successful Addition")
            if r in successful_list:
                continue
            with transaction.atomic():
                s = Success()
                s.name = r
                s.time = r.time
                s.description = r.description
                s.enabled = r.enabled
                s.others = r.others
                s.save()
                successful_list.append(r)


class ScheduleUpkeepWorker1(SingletonThread):

    def run(self):
        print("ScheduleUpkeep worker started! for worker 1")
        while 1:
            self.check_schedule()

    def check_schedule(self):
        for r in Run.objects.filter(enabled=True):
            running_edit = Run.objects.get(id=r.id)  # object to update
            # we can do any task here to take as a task for example we can use sleep instead of task.
            running_edit.enabled = False
            running_edit.save()  # save object
            sleep(60 * r.time)
            running_edit.time = 0  # update name
            running_edit.save()  # save object

            print("I will do all the work for worker 1")


class ScheduleUpkeepWorker2(SingletonThread):

    def run(self):
        print("ScheduleUpkeep worker started! for worker 2")
        while 1:
            sleep(1000)
            self.check_schedule()

    def check_schedule(self):
        for r in Run.objects.filter(enabled=True):
            running_edit = Run.objects.get(id=r.id)  # object to update
            # we can do any task here to take as a task for example we can use sleep instead of task.
            running_edit.enabled = False
            running_edit.save()  # save object
            sleep(60 * r.time)
            running_edit.time = 0  # update name
            running_edit.save()  # save object
        print("I will do all the work for worked 2")


class ScheduleUpkeepWorker3(SingletonThread):

    def run(self):
        print("ScheduleUpkeep worker started! for worker 3")
        while 1:
            sleep(1000)
            self.check_schedule()

    def check_schedule(self):
        for r in Run.objects.filter(enabled=True):
            running_edit = Run.objects.get(id=r.id)  # object to update
            # we can do any task here to take as a task for example we can use sleep instead of task.
            running_edit.enabled = False
            running_edit.save()  # save object
            sleep(60 * r.time)
            running_edit.time = 0  # update name
            running_edit.save()  # save object
        print("I will do all the work for worker 3")


class Summary_created(APIView):
    # Get information about all the created jobs
    def get(self, request, format=None):
        a = Create.objects.all()
        serializer = CreateSerializer(a, many=True)
        return Response(serializer.data)


class Summary_queued(APIView):
    # Get information about all the queued jobs
    def get(self, request, format=None):
        a = Queue.objects.all()
        serializer = QueuedSerializer(a, many=True)
        return Response(serializer.data)


class Summary_halted(APIView):
    # Get information about all the halted jobs
    def get(self, request, format=None):
        a = Halt.objects.all()
        serializer = HaltSerializer(a, many=True)
        return Response(serializer.data)


class Summary_running(APIView):
    # Get information about all the running jobs
    def get(self, request, format=None):
        a = Run.objects.all()
        serializer = RunningSerializer(a, many=True)
        return Response(serializer.data)


class Summary_abort(APIView):
    # Get information about all the aborted jobs
    def get(self, request, format=None):
        a = Abort.objects.all()
        serializer = AbortSerializer(a, many=True)
        return Response(serializer.data)


class Summary_deleted(APIView):
    # Get information about all the deleted jobs
    def get(self, request, format=None):
        a = Deleted.objects.all()
        serializer = DeletedSerializer(a, many=True)
        return Response(serializer.data)


class Summary_successful(APIView):
    # Get information about all the success jobs
    def get(self, request, format=None):
        a = Success.objects.all()
        serializer = SuccessSerializer(a, many=True)
        return Response(serializer.data)


workers = []
workers = [
    MoveCreatedJobstoQueue.get_instance(),
    ScheduleUpkeepWorker1.get_instance(),
    ScheduleUpkeepWorker2.get_instance(),
    ScheduleUpkeepWorker3.get_instance()]
