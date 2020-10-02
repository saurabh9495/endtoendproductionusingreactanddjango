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


class MoveCreatedJobstoQueue(SingletonThread):
    def run(self):
        print("ScheduleUpkeep worker started! Mover Thread")
        while 1:
            sleep(10)
            self.check_schedule()

    def check_schedule(self):
        for c in Create.objects.filter(enabled=True):
            # print(c, "Mover Thread Queue Addition")
            with transaction.atomic():
                s = Queue()
                s.name = c
                s.time = c.time
                s.description = c.description
                s.enabled = c.enabled
                s.others = c.others
                s.save()

                create_edit = Create.objects.get(id=c.id)  # object to update
                create_edit.enabled = False  # update name
                create_edit.save()  # save object

        for r in Run.objects.filter(time=0):
            # print(r, "Worker Thread Successful Addition")
            success_exist = False

            for rt in Success.objects.filter():
                if rt.name_id == r.id:
                    success_exist = True
                    break

            if success_exist:
                continue

            with transaction.atomic():
                s = Success()
                s.name = r
                s.time = r.time
                s.description = r.description
                s.enabled = r.enabled
                s.others = r.others
                s.save()


class ScheduleUpkeepWorker1(SingletonThread):

    def run(self):
        print("ScheduleUpkeep worker started! for worker 1")
        while 1:
            sleep(1)
            self.check_schedule()

    def check_schedule(self):

        for q in Queue.objects.filter(enabled=True):
            # print(q, "Worker Thread Run Addition")
            run_exist_w1 = False

            for rt in Run.objects.filter():
                if rt.name_id == q.id:
                    run_exist_w1 = True
                    break

            if run_exist_w1:
                continue

            with transaction.atomic():
                s = Run()
                s.name = q
                s.time = q.time
                s.description = q.description
                s.enabled = q.enabled
                s.others = q.others
                s.save()

                queue_edit = Queue.objects.get(id=q.id)  # object to update
                queue_edit.enabled = False  # update name
                queue_edit.save()  # save object

            try:
                running_edit = Run.objects.get(
                    name_id=q.id)  # object to update
                print("I'm sleeping worker 1")
                sleep(60 * q.time)
                running_edit.time = 0  # update name
                running_edit.enabled = False
                running_edit.save()  # save object
            except Exception as e:
                print(e)
                continue

            print("I will do all the work for worker 1")


class ScheduleUpkeepWorker2(SingletonThread):

    def run(self):
        print("ScheduleUpkeep worker started! for worker 2")
        while 1:
            sleep(2)
            self.check_schedule()

    def check_schedule(self):

        for q in Queue.objects.filter(enabled=True):
            # print(q, "Worker Thread Run Addition")
            run_exist_w2 = False

            for rt in Run.objects.filter():
                if rt.name_id == q.id:
                    run_exist_w2 = True
                    break

            if run_exist_w2:
                continue

            with transaction.atomic():
                s = Run()
                s.name = q
                s.time = q.time
                s.description = q.description
                s.enabled = q.enabled
                s.others = q.others
                s.save()

                queue_edit = Queue.objects.get(id=q.id)  # object to update
                queue_edit.enabled = False  # update name
                queue_edit.save()  # save object

            try:
                running_edit = Run.objects.get(
                    name_id=q.id)  # object to update
                print("I'm sleeping worker 2")
                sleep(60 * q.time)
                running_edit.time = 0  # update name
                running_edit.enabled = False
                running_edit.save()  # save object
            except Exception as e:
                print(e)
                continue


class ScheduleUpkeepWorker3(SingletonThread):

    def run(self):
        print("ScheduleUpkeep worker started! for worker 3")
        while 1:
            sleep(3)
            self.check_schedule()

    def check_schedule(self):
        for q in Queue.objects.filter(enabled=True):
            # print(q, "Worker Thread Run Addition")
            run_exist_w3 = False

            for rt in Run.objects.filter():
                if rt.name_id == q.id:
                    run_exist_w3 = True
                    break

            if run_exist_w3:
                continue

            with transaction.atomic():
                s = Run()
                s.name = q
                s.time = q.time
                s.description = q.description
                s.enabled = q.enabled
                s.others = q.others
                s.save()

                queue_edit = Queue.objects.get(id=q.id)  # object to update
                queue_edit.enabled = False  # update name
                queue_edit.save()  # save object

            try:
                running_edit = Run.objects.get(
                    name_id=q.id)  # object to update
                print("I'm sleeping worker 3")
                sleep(60 * q.time)
                running_edit.time = 0  # update name
                running_edit.enabled = False
                running_edit.save()  # save object
            except Exception as e:
                print(e)
                continue


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
