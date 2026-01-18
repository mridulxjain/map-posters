import os
import time

MAX_FILE_AGE_SECONDS = 30 * 60 


def cleanup_old_posters(posters_dir: str):
    if not os.path.exists(posters_dir):
        return

    now = time.time()

    for filename in os.listdir(posters_dir):
        path = os.path.join(posters_dir, filename)

        if not os.path.isfile(path):
            continue

        age = now - os.path.getmtime(path)

        if age > MAX_FILE_AGE_SECONDS:
            try:
                os.remove(path)
            except Exception:
                pass