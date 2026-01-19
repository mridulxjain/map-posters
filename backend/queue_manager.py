import threading
import uuid

queue = []
current_job = None
lock = threading.Lock()


def add_job():
    job_id = str(uuid.uuid4())
    with lock:
        queue.append(job_id)
        return job_id, len(queue)


def get_position(job_id):
    with lock:
        if job_id == current_job:
            return 0
        if job_id in queue:
            return queue.index(job_id) + 1
        return -1


def pop_next_job():
    global current_job
    with lock:
        if current_job is None and queue:
            current_job = queue.pop(0)
            return current_job
        return None


def finish_job():
    global current_job
    with lock:
        current_job = None